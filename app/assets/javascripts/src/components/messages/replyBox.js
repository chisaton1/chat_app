import React from 'react'
// import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import MessagesStore from '../../stores/messages'
import UsersStore from '../../stores/user'
import {CSRFToken} from '../../constants/app'

class ReplyBox extends React.Component {

  static get defaultProps() {
    return {
    }
  }

  static get propTypes() {
    return {
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }

  get initialState() {
    return {
      value: '',
    }
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      MessagesAction.sendMessage(UsersStore.getCurrentUser().id,
                                 this.state.value,
                                 MessagesStore.getOpenChatUserID()
                                )
      this.setState({
        value: '',
      })
    }
  }
  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }
  render() {
    return (
      <div className='reply-box'>
        <input
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown }
          onChange={ this.updateValue }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
        <form action={`users/upload`} method='post' encType='multipart/form-data'>
          <input type='hidden' name='authenticity_token' value={CSRFToken()}/>
          <input type='file' name='image'/>
          <input type='hidden' name='to_user_id' value={MessagesStore.getOpenChatUserID()}/>
          <input type='submit' value='送信' className='submit_image'/>
        </form>
      </div>
    )
  }
}

export default ReplyBox
