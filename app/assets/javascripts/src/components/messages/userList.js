import React from 'react'
import classNames from 'classnames'
import MessagesStore from '../../stores/messages'
import UsersStore from '../../stores/user'
import MessagesAction from '../../actions/messages'
import {CSRFToken} from '../../constants/app'
import _ from 'lodash'

class UserList extends React.Component {

  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
  }

  render() {
    const userListComponents = this.props.chatFriendsList.map((friend) => {
      let lastMessage = MessagesStore.getLastContent(friend.id)
      let messageOrImage
      if (!lastMessage) {
        lastMessage = {} // 空（何もメッセージが無い）とき
      } else {
        messageOrImage = lastMessage.content || '画像が投稿されました'
      }
      let lastMessageDate
      let statusIcon
      if (_.isEmpty(lastMessage)) {
        lastMessageDate = ''
        statusIcon = <i/>
      } else {
        lastMessageDate = new Date(lastMessage.created_at).toLocaleString()
        if (lastMessage.user_id === friend.id) {
          statusIcon = (
            <i className='fa fa-circle user-list__item__icon' />
          )
        } else {
          statusIcon = (
            <i className='fa fa-reply user-list__item__icon' />
          )
        }
      }
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--new': true,
        'user-list__item--active': this.props.openChatID === friend.id,
      })
      let userImage
      if (friend.image) {
        userImage = `/user_images/${friend.image}`
      } else {
        userImage = `/user_images/no-image.gif`
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
            { userListComponents }
        </ul>
      </div>
    )
  }
}

export default UserList
