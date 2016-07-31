import React from 'react'
// import _ from 'lodash'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
// import UserStore from '../../stores/user'
// import Utils from '../../utils'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    // return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())
    // const chatObj = MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID()),
    // return {
    //   messages: chatObj.messages,
    //   user: chatObj.user,
    // }
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  render() {
    // const messagesLength = this.state.messages.length
    // const currentUserID = UserStore.user.id
    const contents = MessagesStore.getContentsByUserIDs(1, 2)
    console.log(contents.length)
    const m = contents.map((c, index) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': c.user_id === 1, // ここで自分か相手のメッセージかを分けている
        'clear': true,
      })
      return (
        <li className={ messageClasses }>
          <div className='message-box__item__contents'>
            { c.content }
            </div>
          </li>
      )
    })

    // const messages = this.state.messages.map((message, index) => {
    //   const messageClasses = classNames({
    //     'message-box__item': true,
    //     'message-box__item--from-current': message.from === currentUserID, // ここで自分か相手のメッセージかを分けている
    //     'clear': true,
    //   })
    //   return (
    //     <li key={ message.timestamp + '-' + message.from } className={ messageClasses }>
    //     {
    //       /*
    //       <li
    //         key={ message.timestamp + '-' + message.from }
    //         className={ `message-box__item ${message.from === currentUserID ? "message-box__item--from-current" : ""} clear` }
    //       >
    //       */
    //     }
    //       <div className='message-box__item__contents'>
    //         { message.contents }
    //       </div>
    //     </li>
    //   )
    // })
    //
    // const lastMessage = this.state.messages[messagesLength - 1]
    //
    // if (lastMessage.from === currentUserID) {
    //   if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
    //     const date = Utils.getShortDate(lastMessage.timestamp)
    //     messages.push(
    //         <li key='read' className='message-box__item message-box__item--read'>
    //           <div className='message-box__item__contents'>
    //             Read { date }
    //           </div>
    //         </li>
    //       )
    //   }
    // }
    return (
      <div className='message-box'>
        <ul className='message-box__list'>
          { m }
        </ul>
        <ReplyBox />,
      </div>
    )
  }
}

export default MessagesBox
