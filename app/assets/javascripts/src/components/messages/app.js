import React from 'react'
import UserList from './userList'
import MessagesBox from './messagesBox'
import UsersStore from '../../stores/user'
import MessagesStore from '../../stores/messages'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onStoreChange = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    const currentUser = UsersStore.getCurrentUser()
    // まだcurrentUserが設定されてなければ空のオブジェクトを返す
    if (!currentUser) return {}
    const friendsList = UsersStore.getChatFriendsList()
    let chatList = friendsList ? friendsList : []
    chatList = chatList.slice().sort((a, b) => {
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
    // MessagesStore.setOpenChatID( ? chatList[0].id : -1)
    const messages = MessagesStore.getContentsByUserIDs(
      currentUser.id, MessagesStore.getOpenChatID()
    )

    return {
      messages: messages,
      currentUser: currentUser,
      value: '',
      image: {},
      openChatID: MessagesStore.getOpenChatID(),
      chatFriendsList: chatList,
    }
  }

  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange)
    UsersStore.onChange(this.onStoreChange)
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  changeValue(newValue) {
    this.setState({ value: newValue })
  }

  changeImage(newImage) {
    this.setState({ image: newImage })
  }

  render() {
    return (
      <div className='app'>
        <UserList {...this.state} />
        <MessagesBox {...this.state}
         onChangeValue={this.changeValue.bind(this)}
         onChangeImage={this.changeImage.bind(this)}
        />
      </div>
    )
  }
}

export default App
