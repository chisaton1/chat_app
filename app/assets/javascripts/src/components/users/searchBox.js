import React from 'react'
import UsersStore from '../../stores/user'
import {CSRFToken} from '../../constants/app'

export default class SearchBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      typedValue: '',
      usersList: [],
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
      usersList: UsersStore.getUsersList(),
    }
  }

  updateTypedValue(e) {
    this.setState({
      typedValue: e.target.value,
      usersList: UsersStore.findUserByName(e.target.value),
    })
  }

  render() {
    const list = this.state.usersList.map((user) => {
      let userImage
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
              <input
                type='hidden'
                name='authenticity_token'
                value={CSRFToken()}
              />
              <input
                type='hidden'
                name='get_frined_id'
              />
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
            value={ this.state.typedValue }
            onChange={ this.updateTypedValue.bind(this) }
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
