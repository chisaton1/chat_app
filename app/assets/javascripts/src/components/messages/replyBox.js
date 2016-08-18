import React from 'react'
import MessagesAction from '../../actions/messages'
import MessagesStore from '../../stores/messages'
import UsersStore from '../../stores/user'
// import {CSRFToken} from '../../constants/app'

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
    this.updateImage = this.updateImage.bind(this)
  }
  get initialState() {
    return {
      value: '',
      image: [],
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
  updateImage(e) {
    // ファイルが選択されなかった時(Cancelを押された時)
    if (!e.target.files.length) return
    this.setState({
      image: e.target.files[0],
    })
    MessagesAction.sendImage(UsersStore.getCurrentUser().id,
                             e.target.files[0],
                             MessagesStore.getOpenChatUserID()
                            )
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
          <input
            type='file'
            ref='image'
            onChange={ this.updateImage }
          />
      </div>
    )
  }
}

export default ReplyBox
