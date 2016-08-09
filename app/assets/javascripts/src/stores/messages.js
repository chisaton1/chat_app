import Dispatcher from '../dispatcher'
import _ from 'lodash'
import BaseStore from '../base/store'
import MessagesAction from '../actions/messages'
// import UsersStore from '../stores/user'

const messages = {
  2: {
    user: {
      profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
      id: 2,
      name: 'Ryan Clark',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424469794050,
      currentUser: 1424469794080,
    },
    messages: [
      {
        contents: 'Hey!',
        from: 2,
        timestamp: 1424469793023,
      },
      {
        contents: 'Hey, what\'s up?',
        from: 1,
        timestamp: 1424469794000,
      },
    ],
  },
  3: {
    user: {
      read: true,
      profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
      name: 'Jilles Soeters',
      id: 3,
      status: 'online',
    },
    lastAccess: {
      recipient: 1424352522000,
      currentUser: 1424352522080,
    },
    messages: [
      {
        contents: 'Want a game of ping pong?',
        from: 3,
        timestamp: 1424352522000,
      },
    ],
  },
  4: {
    user: {
      name: 'Todd Motto',
      id: 4,
      profilePicture: 'https://avatars1.githubusercontent.com/u/1655968?v=3&s=460',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424423579000,
      currentUser: 1424423574000,
    },
    messages: [
      {
        contents: 'Please follow me on twitter I\'ll pay you',
        timestamp: 1424423579000,
        from: 4,
      },
    ],
  },
}
window._ = _ // TODO remove
let openChatID = parseInt(Object.keys(messages)[0], 10)
// let currentUserJsonData = []
// let currentUserInfo = []

class ChatStore extends BaseStore {
  getCurrentUserJsonData() {
    if (!this.get('currentUserJsonData')) this.setCurrentUserJsonData([])
    return this.get('currentUserJsonData')
  }

  setCurrentUserJsonData(array) {
    this.set('currentUserJsonData', array)
  }
  // getAllJson() {
  //   return jsonData
  // }
  // getAllContents() { // いるかな？（２つの）IDで検索形式のほうがいいかも？
  //   return _.map(jsonData, 'content')
  // }
  getContentsByUserIDs(currentUserID, recipientID) {
    return _.filter(this.getCurrentUserJsonData(), function(j1) {
      return j1.user_id === currentUserID || j1.user_id === recipientID
    })
  }
  // getLastContent() {
  //   return _.find(jsonData, function(j2) {
  //     return j2.id === jsonData.length
  //   })
  // }
  // getCurrentUserID() {
  //   return currentUserInfo.id
  // }
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getOpenChatUserID() {
    return openChatID
  }
  getChatByUserID(id) {
    return messages[id]
  }
  getAllChats() {
    return messages
  }
}
const MessagesStore = new ChatStore()

// const request = require('superagent')
MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    updateOpenChatID(payload) {
      openChatID = payload.action.userID
      messages[openChatID].lastAccess.currentUser = +new Date()
      MessagesStore.emitChange()
    },
    sendMessage(payload) {
      // const userID = payload.action.userID
      // messages[userID].messages.push({
      //   contents: payload.action.message,
      //   timestamp: payload.action.timestamp,
      //   from: UserStore.user.id,
      // })
      // messages[userID].lastAccess.currentUser = +new Date()
      MessagesAction.getAllContents() // 最新のDBのデータをcurrentUserJsonDataへ格納する
      MessagesStore.emitChange()
      // UsersStore.emitChange()
    },
    setAllContents(payload) {
      MessagesStore.setCurrentUserJsonData(payload.action.json)
      // jsonData = payload.action.json
      MessagesStore.emitChange()
    },
    // setCurrentUserInfo(payload) {
    //   currentUserInfo = payload.action.json
    //   MessagesStore.emitChange()
    // },
  }
  actions[payload.action.type] && actions[payload.action.type](payload)
})
window.MessagesStore = MessagesStore // TODO remove
export default MessagesStore
