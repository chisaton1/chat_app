import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

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
      if (u.name.indexOf(typeString) >= 0 && typeString) {
        return u
      }
    })
  }
  getChatFriendsList() {
    if (!this.get('chatFriendsList')) this.setChatFriendsList([])
    return this.get('chatFriendsList')
  }
  setChatFriendsList(array) {
    this.set('chatFriendsList', array)
  }
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
}

const usersStore = new UsersStore()
usersStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  switch (action.type) {
    case ActionTypes.SET_CURRENT_USER_INFO:
      usersStore.setCurrentUser(action.json)
      usersStore.emitChange()
      break

    case ActionTypes.SET_ALL_USERS:
      usersStore.setUsersList(action.json)
      usersStore.emitChange()
      break

    case ActionTypes.SET_CHAT_FRIENDS:
      usersStore.setChatFriendsList(action.json)
      usersStore.emitChange()
      break

    default:
  }
  return true
})

//   const actions = {
//     setCurrentUserInfo(payload) {
//       usersStore.setCurrentUser(payload.action.json)
//       usersStore.emitChange()
//     },
//     setAllUsers(payload) {
//       usersStore.setUsersList(payload.action.json)
//       usersStore.emitChange()
//     },
//     setChatFriends(payload) {
//       usersStore.setChatFriendsList(payload.action.json)
//       usersStore.emitChange()
//     },
//     // updateUserCreatedAt(payload) {
//     //   const currentUserData = usersStore.getCurrentUser()
//     //   currentUserData.updated_at = payload.action.updated_at
//     //   usersStore.emitChange()
//     // },
//   }
//   actions[payload.action.type] && actions[payload.action.type](payload)
// })
export default usersStore
