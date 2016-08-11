import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import _ from 'lodash'

// const UserStore = {
//   user: {
//     id: 1,
//     name: 'John Doek',
//     profilePicture: 'https://avatars1.githubusercontent.com/u/8901351?v=3&s=200',
//   },
// }

// export default UserStore
// let currentUserInfo = []
// let usersList = []
class UsersStore extends BaseStore {
  getCurrentUser() {
    if (!this.get('currentUser')) this.setCurrentUser([])
    return this.get('currentUser')
  }
  setCurrentUser(array) {
    this.set('currentUser', array)
  }
  getUsersList() {
    if (!this.get('usersList')) this.setUsersList([])
    return this.get('usersList')
  }
  setUsersList(array) {
    this.set('usersList', array)
  }
  findNameFromUsersList(typeString) {
    return this.getUsersList().filter((u, index) => {
      if (u.name.indexOf(typeString) >= 0) {
        return u
      }
    })
  }
  // findNameByUserID(userID) {
  //   return _.find(this.getUsersList(), function(list) {
  //     if (list.id === userID) {
  //       // console.log(list.name)
  //       return list.name
  //     }
  //   })
  // }
  // findNameByUserID(userID) {
  //   return this.getUsersList().filter((u, index) => {
  //     if (u.id === userID) {
  //       console.log(u.name)
  //       return u.name
  //     }
  //   })
  // }
  getChatFriendsList() {
    if (!this.get('chatFriendsList')) this.setChatFriendsList([])
    return this.get('chatFriendsList')
  }
  setChatFriendsList(array) {
    this.set('chatFriendsList', array)
  }
  // getCurrentUserID() {
  //   return currentUserInfo.id
  // }
  // getAllUsers() {
  //   return usersList
  // }
  // getAllUsers() {
  //   let users = this.getUsersList()
  //   const list = users.map((user, index) => {
  //     return {
  //       id: user.id,
  //       name: user.name,
  //     }
  //   })
  //   return list
  // }
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
}

const usersStore = new UsersStore()
usersStore.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    setCurrentUserInfo(payload) {
      usersStore.setCurrentUser(payload.action.json)
      usersStore.emitChange()
    },
    setAllUsers(payload) {
      usersStore.setUsersList(payload.action.json)
      usersStore.emitChange()
    },
    setChatFriends(payload) {
      usersStore.setChatFriendsList(payload.action.json)
      usersStore.emitChange()
    },
  }
  // const actions = {
  //   updateOpenChatID(payload) {
  //     openChatID = payload.action.userID
  //     messages[openChatID].lastAccess.currentUser = +new Date()
  //     MessagesStore.emitChange()
  //   },
  //   sendMessage(payload) {
  //     // const userID = payload.action.userID
  //     // messages[userID].messages.push({
  //     //   contents: payload.action.message,
  //     //   timestamp: payload.action.timestamp,
  //     //   from: UserStore.user.id,
  //     // })
  //     // messages[userID].lastAccess.currentUser = +new Date()
  //     MessagesAction.getAllContents() // 最新のDBのデータをjsonDataへ格納する
  //     MessagesStore.emitChange()
  //   },
  //   setAllContents(payload) {
  //     jsonData = payload.action.json
  //     MessagesStore.emitChange()
  //   },
  //   setCurrentUserInfo(payload) {
  //     currentUserInfo = payload.action.json
  //     MessagesStore.emitChange()
  //   },
  // }
  actions[payload.action.type] && actions[payload.action.type](payload)
})
window.usersStore = usersStore // TODO remove
export default usersStore
