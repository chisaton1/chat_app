import React from 'react'
import UsersStore from '../../stores/user'
import {CSRFToken} from '../../constants/app'
// import UserList from '../../components/messages/userList'
// import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    // this.handleKeyDown = this.handleKeyDown.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }
  get initialState() {
    return {
      value: '',
      // usersList: UsersStore.getUsersList(),
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
  // handleKeyDown(e) {
  //   if (e.keyCode != null) { // 何かをタイプした時（deleteキー含む）
  //     // 検索する
  //     // this.setState({
  //     //   findUsersList: UsersStore.findNameFromUsersList(e.target.value),
  //     // })
  //     // MessagesAction.sendMessage(MessagesStore.getCurrentUserID(), this.state.value, 2)
  //     // this.setState({
  //     //   value: '',
  //     // })
  //   }
  // }
  getStateFromStore() {
    return {
      findUsersList: UsersStore.getUsersList(),
    }
  }
  updateValue(e) {
    this.setState({
      value: e.target.value,
      findUsersList: UsersStore.findNameFromUsersList(e.target.value),
      // usersList: UsersStore.getUsersList(),
    })
  }
  onClick(e) {
    // const userList = UserList()
    MessagesAction.changeOpenChat(e)
    // userList.changeOpenChat(e)
  }
  // getStateFromStore() {
  //   return {
  //     usersList: UsersStore.getUsersList(),
  //   }
  // }
  // componentWillMount() {
  //   MessagesStore.onChange(this.onStoreChange.bind(this))
  // }
  // componentWillUnmount() {
  //   MessagesStore.offChange(this.onStoreChange.bind(this))
  // }
  // onStoreChange() {
  //   this.setState(this.getStateFromStore())
  // }
  render() {
    // const usersList = this.state.usersList
    var userImage
    const list = this.state.findUsersList.map((user, index) => {
      if (user.image == null) {
        userImage = `/user_images/no-image.gif`
      } else {
        userImage = `/user_images/${user.image}`
      }
      // const messageClasses = classNames({
      //   'message-box__item': true,
      //   'message-box__item--from-current': c.user_id === this.state.currentUserID,
      //   'clear': true,
      // })
      // const userList = UserList()
      return (
        <li key={user.id}>
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
    // <form action={`/friendships/${user.id}`} method='post'>
    //   <input
    //     type='hidden'
    //     name='authenticity_token'
    //     value={CSRFToken()}
    //   />
    //   <input
    //     type='hidden'
    //     name='_method'
    //     value='delete'
    //   />
    //   <input
    //     type='submit'
    //     value='&#xf057;'
    //     className='remove-chat-btn'
    //     onClick={this.deleteChatConfirm.bind(this)}
    //   />
    // </form>
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
