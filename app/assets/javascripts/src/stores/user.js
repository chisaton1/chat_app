import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'

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
    // updateUserCreatedAt(payload) {
    //   const currentUserData = usersStore.getCurrentUser()
    //   currentUserData.updated_at = payload.action.updated_at
    //   usersStore.emitChange()
    // },
  }
  actions[payload.action.type] && actions[payload.action.type](payload)
})
export default usersStore
