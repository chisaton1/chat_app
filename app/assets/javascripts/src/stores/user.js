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

  findUserByName(name) {
    return this.getUsersList().filter((user) => {
      if (user.name.match(name)) {
        return user
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
export default usersStore
