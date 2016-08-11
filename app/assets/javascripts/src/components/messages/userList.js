import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
// import Utils from '../../utils'
import MessagesStore from '../../stores/messages'
import UsersStore from '../../stores/user'
import MessagesAction from '../../actions/messages'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    const allMessages = MessagesStore.getAllChats()
    const messageList = []
    const friendsList = UsersStore.getChatFriendsList()
    _.each(allMessages, (message) => {
      const messagesLength = message.messages.length
      messageList.push({
        lastMessage: message.messages[messagesLength - 1],
        lastAccess: message.lastAccess,
        user: message.user,
      })
    })
    return {
      openChatID: (friendsList.length === 0) ? -1 : MessagesStore.getOpenChatUserID(), // TODO fix ID
      messageList: messageList,
      chatFriendsList: UsersStore.getChatFriendsList(),
    }
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
    UsersStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
    UsersStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
  }
  render() {
    this.state.messageList.sort((a, b) => {
      if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
        return -1
      }
      if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
        return 1
      }
      return 0
    })
    // console.log(this.state.chatFrinedsList)
    // const chatUsers = this.state.chatFrinedsList.map((user, index) => {
    //   // console.log(UsersStore.findNameByUserID(user.to_user_id).name)
    //   return (
    //     // <li>
    //       <div>
    //           { user.name }
    //       </div>
    //     // </li>
    //   )
    // })
    // console.log(this.state.chatFriendsList)
    const messages = this.state.chatFriendsList.map((friend, index) => {
      let lastMessage = MessagesStore.getLastContent(friend.id)
      if (!lastMessage) lastMessage = [] // 空（何もメッセージが無い）とき
      // console.log(lastMessage)
      const lastMessageDate = lastMessage.created_at
      var statusIcon
      if (lastMessage.user_id !== friend.id) {
        statusIcon = (
          <i className='fa fa-reply user-list__item__icon' />
        )
      }
      // クリックしてチャットページを開いたらcurrent_userのupdated_atを更新する必要あり
      if (UsersStore.getCurrentUser().updated_at < lastMessageDate) {
        statusIcon = (
          <i className='fa fa-circle user-list__item__icon' />
        )
      }
      if (lastMessage.length === 0) statusIcon = <i className=''/> // とりあえずメッセージが無い時の対応（仮）
      // 既読か未読かどうかの判定
      var isNewMessage = false
      if (UsersStore.getCurrentUser().updated_at < lastMessageDate) {
        isNewMessage = lastMessage.user_id !== UsersStore.getCurrentUser().id
      }
      // console.log(this.state.openChatID)
      // console.log(lastMessage.to_user_id)
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--new': isNewMessage,
        'user-list__item--active': this.state.openChatID === friend.id,
      })

      return (
        <li
          onClick={this.changeOpenChat.bind(this, friend.id)}
          className={ itemClasses }
          key={ friend.id }
        >
          <div className='user-list__item__picture'>
            <img src={ friend.image } />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { friend.name }
              <abbr className='user-list__item__timestamp'>
                { lastMessageDate }
              </abbr>
            </h4>
            <span className='user-list__item__message'>
              { statusIcon } { lastMessage.content }
            </span>
          </div>
        </li>
      )
    }, this)
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          { messages }
        </ul>
      </div>
    )

    // const messages = this.state.messageList.map((message, index) => {
    //   const date = Utils.getNiceDate(message.lastMessage.timestamp)
    //   // timestampによるアイコンの指定
    //   var statusIcon
    //   if (message.lastMessage.from !== message.user.id) {
    //     statusIcon = (
    //       <i className='fa fa-reply user-list__item__icon' />
    //     )
    //   }
    //   if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
    //     statusIcon = (
    //       <i className='fa fa-circle user-list__item__icon' />
    //     )
    //   }
    //   // 既読か未読かどうかの判定
    //   var isNewMessage = false
    //   if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
    //     isNewMessage = message.lastMessage.from !== UsersStore.getCurrentUser().id // TODO fix
    //   }
    //
    //   const itemClasses = classNames({
    //     'user-list__item': true,
    //     'clear': true,
    //     'user-list__item--new': isNewMessage,
    //     'user-list__item--active': this.state.openChatID === message.user.id,
    //   })
    //
    //   return (
    //     <li
    //       onClick={this.changeOpenChat.bind(this, message.user.id)}
    //       className={ itemClasses }
    //       key={ message.user.id }
    //     >
    //       <div className='user-list__item__picture'>
    //         <img src={ message.user.profilePicture } />
    //       </div>
    //       <div className='user-list__item__details'>
    //         <h4 className='user-list__item__name'>
    //           { chatUsers }
    //           <abbr className='user-list__item__timestamp'>
    //             { date }
    //           </abbr>
    //         </h4>
    //         <span className='user-list__item__message'>
    //           { statusIcon } { message.lastMessage.contents }
    //         </span>
    //       </div>
    //     </li>
    //   )
    // }, this)
    // return (
    //   <div className='user-list'>
    //     <ul className='user-list__list'>
    //       { messages }
    //     </ul>
    //   </div>
    // )
  }
}

export default UserList
