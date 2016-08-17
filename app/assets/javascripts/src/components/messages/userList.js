import React from 'react'
import classNames from 'classnames'
import MessagesStore from '../../stores/messages'
import UsersStore from '../../stores/user'
import MessagesAction from '../../actions/messages'
import {CSRFToken} from '../../constants/app'

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    const messageList = []
    const friendsList = UsersStore.getChatFriendsList()
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
    const messages = this.state.chatFriendsList.map((friend, index) => {
      let lastMessage = MessagesStore.getLastContent(friend.id)
      var messageOrImage
      if (!lastMessage) {
        lastMessage = [] // 空（何もメッセージが無い）とき
      } else {
        if (lastMessage.content == null) {
          messageOrImage = '画像が投稿されました'
        } else {
          messageOrImage = lastMessage.content
        }
      }
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
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--new': isNewMessage,
        'user-list__item--active': this.state.openChatID === friend.id,
      })
      var userImage
      if (friend.image == null) {
        userImage = `/user_images/no-image.gif`
      } else {
        userImage = `/user_images/${friend.image}`
      }
      return (
        <li
          onClick={this.changeOpenChat.bind(this, friend.id)}
          className={ itemClasses }
          key={ friend.id }
        >
          <div className='user-list__item__picture'>
            <img src={ userImage } />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { friend.name }
              <abbr className='user-list__item__timestamp'>
                { lastMessageDate }
              </abbr>
            </h4>
            <span className='user-list__item__message'>
              { statusIcon }
              { messageOrImage }
            </span>
          </div>
          <form action={`/unfriend/${friend.id}`} className='chat-btn' method='post'>
            <button id='delete-btn'>リストから削除</button>
            <input type='hidden' name='authenticity_token' value={CSRFToken()}/>
            <input type='hidden' name='_method' value='delete'/>
          </form>
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
  }
}

export default UserList
