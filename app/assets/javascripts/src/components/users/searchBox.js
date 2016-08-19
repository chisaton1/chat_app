import React from 'react'
import UsersStore from '../../stores/user'
import {CSRFToken} from '../../constants/app'
import MessagesAction from '../../actions/messages'

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.updateValue = this.updateValue.bind(this)
  }
  get initialState() {
    return {
      value: '',
      findUsersList: [],
    }
  }
  componentWillMount() {
    UsersStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    UsersStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  getStateFromStore() {
    return {
      findUsersList: UsersStore.getUsersList(),
    }
  }
  updateValue(e) {
    this.setState({
      value: e.target.value,
      findUsersList: UsersStore.findNameFromUsersList(e.target.value),
    })
  }
  onClick(e) {
    MessagesAction.changeOpenChat(e)
  }
  render() {
    var userImage
    const list = UsersStore.findNameFromUsersList(this.state.value).map((user, index) => {
      if (user.image == null) {
        userImage = `/user_images/no-image.gif`
      } else {
        userImage = `/user_images/${user.image}`
      }
      return (
        <li key={ user.id }>
          <div className='user-name'>
            <a className='user-list__item__picture'>
              <img src={ userImage } />
            </a>
            <a className='search-list'>
              { user.name }
            </a>
            <form action={`/friend/${user.id}`} method='post' className='chat-btn'>
              <button>この人とチャットをする</button>
              <input type='hidden' name='authenticity_token' value={CSRFToken()}/>
              <input type='hidden' name='get_frined_id' onClick={this.onClick.bind(this, user.id)}/>
            </form>
          </div>
        </li>
      )
    })
    return (
      <div className='wrapper'>
        <h1>ユーザー検索</h1>
        <div className='reply-box search-box'>
          <input
            value={ this.state.value }
            onChange={ this.updateValue }
            className='reply-box__input'
            placeholder='Search users'
          />
        </div>
        <ul>
          { list }
        </ul>
      </div>
    )
  }
}
