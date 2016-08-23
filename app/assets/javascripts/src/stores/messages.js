import Dispatcher from '../dispatcher'
import _ from 'lodash'
import BaseStore from '../base/store'
import UsersStore from '../stores/user'
import {ActionTypes} from '../constants/app'

let openChatID = -1 // 仮のID
class ChatStore extends BaseStore {
  getMessages() {
    if (!this.get('currentUserJsonData')) this.setMessages([])
    return this.get('currentUserJsonData')
  }
  setMessages(array) {
    this.set('currentUserJsonData', array)
  }
  // 渡されたIDと自分のIDに該当するメッセージの一番最後に投稿されたものをjsonで返す
  getLastContent(userID) {
    const currentUserID = UsersStore.getCurrentUser().id
    return _.findLast(this.getMessages(), function(json) {
      return (json.to_user_id === userID && json.user_id === currentUserID) ||
             (json.to_user_id === currentUserID && json.user_id === userID)
    })
  }
  getContentsByUserIDs(currentUserID, recipientID) {
    return _.filter(this.getMessages(), function(j) {
      return (j.user_id === currentUserID && j.to_user_id === recipientID) ||
             (j.to_user_id === currentUserID && j.user_id === recipientID)
    })
  }
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getOpenChatUserID() {
    if (openChatID === -1) { // 初期値（-1）だったら
      const friendsList = UsersStore.getChatFriendsList()
      openChatID = (friendsList.length === 0) ? -1 : friendsList[0].id
    }
    return openChatID
  }
}
const MessagesStore = new ChatStore()
MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  switch (action.type) {
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      openChatID = action.userID
      MessagesStore.emitChange()
      break

    case ActionTypes.SEND_MESSAGE:
      {
        const messages = MessagesStore.getMessages()
        messages.push(action.message)
      }
      MessagesStore.emitChange()
      break

    case ActionTypes.SEND_IMAGE:
      {
        const messages = MessagesStore.getMessages()
        messages.push(action.messages)
      }
      MessagesStore.emitChange()
      break

    case ActionTypes.SET_ALL_CONTENTS:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

    default:
  }
  return true
})
export default MessagesStore
