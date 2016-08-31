import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
import UsersStore from '../../stores/user'

class MessagesBox extends React.Component {

  static get propTypes() {
    return {
      messages: React.PropTypes.array,
      currentUser: React.PropTypes.object,
    }
  }

  render() {
    const {messages, currentUser} = this.props // これでいちいちthis.propsする必要なし
    return (
      <div className='message-box'>
        <ul className='message-box__list'>
          {
            messages.map((message) => {
              const messageClasses = classNames({
                'message-box__item': true,
                'message-box__item--from-current': message.user_id === currentUser.id,
                'clear': true,
              })
              const contentOrMessage = message.content || <img src={ `/user_images/${message.image}` } />
              return (
              <li key={message.id} className={ messageClasses }>
                <div className='message-box__item__contents'>
                  { contentOrMessage }
                </div>
              </li>
              )
            })
          }
        </ul>
        <ReplyBox {...this.props} />,
      </div>
    )
  }
}

export default MessagesBox
