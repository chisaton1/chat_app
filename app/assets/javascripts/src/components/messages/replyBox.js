import React from 'react'
import MessagesAction from '../../actions/messages'
import MessagesStore from '../../stores/messages'
import _ from 'lodash'

class ReplyBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  static get propTypes() {
    return {
      openChatID: React.PropTypes.number,
      chatFriendsList: React.PropTypes.array,
    }
  }

  get initialState() {
    return {
      value: '',
      image: {},
    }
  }

  handleKeyDown(e) {
    const recipientID = this.props.openChatID
    const noUserFlag = _.isEmpty(this.props.chatFriendsList)
    if (e.keyCode === 13 && !noUserFlag) {
      MessagesAction.sendMessage(this.state.value, recipientID)
      this.setState({
       value: '',
      })
      // this.props.onChangeValue('')
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
    // this.props.onChangeValue(e.target.value)
  }

  updateImage(e) {
    // ファイルが選択されなかった時(Cancelを押された時)
    if (!e.target.files.length) return
    const recipientID = this.props.openChatID
    const noUserFlag = _.isEmpty(this.props.chatFriendsList)
    if (!noUserFlag) {
      this.setState({
        image: e.target.files[0],
      })
      // this.props.onChangeImage(e.target.files[0])
      MessagesAction.sendImage(e.target.files[0], recipientID)
    }
  }

  render() {
    return (
      <div className='reply-box'>
        <input
          value={ this.state.value }
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
