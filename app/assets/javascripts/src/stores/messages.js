import Dispatcher from '../dispatcher'
import _ from 'lodash'
import BaseStore from '../base/store'
import UsersStore from '../stores/user'
import {ActionTypes} from '../constants/app'

// const friendsList = UsersStore.getChatFriendsList()
let openChatID = -1 // 仮のID
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
      const jsonData1 = MessagesStore.getCurrentUserJsonData()
      jsonData1.push({
        user_id: action.userID,
        content: action.message,
        to_user_id: action.toUserID,
        created_at: action.createdAt,
      })
      MessagesStore.emitChange()
      break

    case ActionTypes.SEND_IMAGE:
      const jsonData2 = MessagesStore.getCurrentUserJsonData()
      jsonData2.push({
        user_id: action.userID,
        image: action.image,
        to_user_id: action.toUserID,
        created_at: action.createdAt,
      })
      MessagesStore.emitChange()
      break

    case ActionTypes.SET_ALL_CONTENTS:
      MessagesStore.setCurrentUserJsonData(action.json)
      MessagesStore.emitChange()
      break

    default:
  }
  return true
})

//   const actions = {
//     updateOpenChatID(payload) {
//       openChatID = payload.action.userID
//       MessagesStore.emitChange()
//     },
//     sendMessage(payload) {
//       // debugger
//       // MessagesStore.setCurrentUserJsonData(payload.action)
//       const jsonData = MessagesStore.getCurrentUserJsonData()
//       // jsonDataはオブジェクト（参照型）なので再びsetする必要なし
//       jsonData.push({
//         user_id: payload.action.userID,
//         content: payload.action.message,
//         to_user_id: payload.action.toUserID,
//         created_at: payload.action.createdAt,
//       })
//       // MessagesAction.getAllContents() // 最新のDBのデータをcurrentUserJsonDataへ格納する
//       MessagesStore.emitChange()
//     },
//     sendImage(payload) {
//       const jsonData = MessagesStore.getCurrentUserJsonData()
//       jsonData.push({
//         user_id: payload.action.userID,
//         image: payload.action.image,
//         to_user_id: payload.action.toUserID,
//         created_at: payload.action.createdAt,
//       })
//       MessagesStore.emitChange()
//     },
//     setAllContents(payload) {
//       MessagesStore.setCurrentUserJsonData(payload.action.json)
//       MessagesStore.emitChange()
//     },
//   }
//   actions[payload.action.type] && actions[payload.action.type](payload)
// })
export default MessagesStore
