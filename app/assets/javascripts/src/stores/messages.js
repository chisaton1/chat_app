import Dispatcher from '../dispatcher'
import _ from 'lodash'
import BaseStore from '../base/store'
import MessagesAction from '../actions/messages'
import UsersStore from '../stores/user'

let openChatID = -1 // 初期画面は誰も選択されない (friendsList.length === 0) ? -1 : friendsList[0].id
class ChatStore extends BaseStore {
  getCurrentUserJsonData() {
    if (!this.get('currentUserJsonData')) this.setCurrentUserJsonData([])
    return this.get('currentUserJsonData')
  }
  setCurrentUserJsonData(array) {
    this.set('currentUserJsonData', array)
  }
  // 渡されたIDと自分のIDに該当するメッセージの一番最後に投稿されたものをjsonで返す
  getLastContent(userID) {
    const currentUserID = UsersStore.getCurrentUser().id
    return _.findLast(this.getCurrentUserJsonData(), function(json) {
      return (json.to_user_id === userID && json.user_id === currentUserID) ||
             (json.to_user_id === currentUserID && json.user_id === userID)
    })
  }
  getContentsByUserIDs(currentUserID, recipientID) {
    return _.filter(this.getCurrentUserJsonData(), function(j) {
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
    return openChatID
  }
}
const MessagesStore = new ChatStore()
MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    updateOpenChatID(payload) {
      openChatID = payload.action.userID
      MessagesStore.emitChange()
    },
    sendMessage(payload) {
      MessagesAction.getAllContents() // 最新のDBのデータをcurrentUserJsonDataへ格納する
      MessagesStore.emitChange()
    },
    setAllContents(payload) {
      MessagesStore.setCurrentUserJsonData(payload.action.json)
      MessagesStore.emitChange()
    },
  }
  actions[payload.action.type] && actions[payload.action.type](payload)
})
export default MessagesStore
