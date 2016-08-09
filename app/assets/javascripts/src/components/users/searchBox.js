import React from 'react'
import UsersStore from '../../stores/user'
// import MessagesStore from '../../stores/messages'

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
  updateValue(e) {
    this.setState({
      value: e.target.value,
      findUsersList: UsersStore.findNameFromUsersList(e.target.value),
      // usersList: UsersStore.getUsersList(),
    })
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
    const list = this.state.findUsersList.map((user, index) => {
      // const messageClasses = classNames({
      //   'message-box__item': true,
      //   'message-box__item--from-current': c.user_id === this.state.currentUserID,
      //   'clear': true,
      // })
      return (
        <li>
          <div className='user-name'>
            { user.name }
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
            // onKeyDown={ this.handleKeyDown }
            onChange={ this.updateValue }
            className='reply-box__input'
            placeholder='Search users'
          />
        </div>
        <ul className=''>
          { list }
        </ul>
      </div>
    )
  }
}
