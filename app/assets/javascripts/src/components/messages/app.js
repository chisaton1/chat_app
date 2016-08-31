import React from 'react'
import UserList from './userList'
import MessagesBox from './messagesBox'
import UsersStore from '../../stores/user'
import MessagesStore from '../../stores/messages'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onStoreChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    const currentUser = UsersStore.getCurrentUser()
    // まだcurrentUserが設定されてなければ空のオブジェクトを返す
    if (!currentUser) return {}
    let chatList = UsersStore.getChatFriendsList() || []
    chatList.sort((a, b) => {
      const lastContentA = MessagesStore.getLastContent(a.id)
      const lastContentB = MessagesStore.getLastContent(b.id)
      if (!lastContentA && !lastContentB) return 0
      if (!lastContentA) return 1
      if (!lastContentB) return -1
      if (lastContentA.created_at > lastContentB.created_at) return -1
      if (lastContentA.created_at < lastContentB.created_at) return 1
      return 0
    })
    if (MessagesStore.getOpenChatID() === -1) {
      MessagesStore.setOpenChatID(chatList[0] ? chatList[0].id : -1)
    }
    const messages = MessagesStore.getContentsByUserIDs(
      currentUser.id, MessagesStore.getOpenChatID()
    )

    return {
      messages,
      currentUser,
      openChatID: MessagesStore.getOpenChatID(),
      chatFriendsList: chatList,
    }
  }

  componentWillMount() {
    MessagesStore.onChange(this.onStoreChangeHandler)
    UsersStore.onChange(this.onStoreChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    return (
      <div className='app'>
        <UserList {...this.state} />
        <MessagesBox {...this.state} />
      </div>
    )
  }
}

export default App
