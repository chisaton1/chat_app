import React from 'react'
import MessagesAction from '../../actions/messages'
import MessagesStore from '../../stores/messages'
import _ from 'lodash'

class ReplyBox extends React.Component {

  handleKeyDown(e) {
    const recipientID = this.props.openChatID
    const noUserFlag = _.isEmpty(this.props.chatFriendsList)
    if (e.keyCode === 13 && !noUserFlag) {
      MessagesAction.sendMessage(this.props.value, recipientID)
      this.props.onChangeValue('')
    }
  }

  updateValue(e) {
    this.props.onChangeValue(e.target.value)
  }

  updateImage(e) {
    // ファイルが選択されなかった時(Cancelを押された時)
    if (!e.target.files.length) return
    const recipientID = this.props.openChatID
    const noUserFlag = _.isEmpty(this.props.chatFriendsList)
    if (!noUserFlag) {
      this.props.onChangeImage(e.target.files[0])
      MessagesAction.sendImage(e.target.files[0], recipientID)
    }
  }

  render() {
    return (
      <div className='reply-box'>
        <input
          value={ this.props.value }
          onKeyDown={ this.handleKeyDown.bind(this) }
           onChange={ this.updateValue.bind(this) }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
                  Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
          <input
            type='file'
            onChange={ this.updateImage.bind(this) }
          />
      </div>
    )
  }
}

export default ReplyBox
