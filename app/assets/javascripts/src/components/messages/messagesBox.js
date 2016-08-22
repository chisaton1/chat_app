import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
import UsersStore from '../../stores/user'

class MessagesBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {
      messages: MessagesStore.getCurrentUserJsonData(),
      currentUser: UsersStore.getCurrentUser(),
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
  render() {
    const messages = MessagesStore.getContentsByUserIDs(
      this.state.currentUser.id, MessagesStore.getOpenChatUserID()
    )
    // superAgent使ってopenChatID渡してそれに該当するデータを取ってきてもらったほうが早いかもなぁ...
    const msg = messages.map((c, index) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': c.user_id === this.state.currentUser.id,
        'clear': true,
      })
      let contentOrMessage
      if (c.content != null) {
        contentOrMessage = c.content
      } else {
        contentOrMessage = <img src={ `/user_images/${c.image}` } />
      }
      return (
        <li key={c.id} className={ messageClasses }>
          <div className='message-box__item__contents'>
            { contentOrMessage }
          </div>
        </li>
      )
    })
    return (
      <div className='message-box'>
        <ul className='message-box__list'>
          { msg }
        </ul>
        <ReplyBox />,
      </div>
    )
  }
}
export default MessagesBox
