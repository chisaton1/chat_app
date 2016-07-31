import Dispatcher from '../dispatcher'
import _ from 'lodash'
import BaseStore from '../base/store'
import UserStore from '../stores/user'

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
let jsonData
const request = require('superagent')
request
  .get('http://localhost:3000/data')
  .end(function(err, res) {
    if (res.ok) {
      jsonData = JSON.parse(res.text)
      // console.log(jsonData)
      // let contents = _.map(JSON.parse(jsonData), 'content')
      // console.log('contents : ' + contents)
      // console.log(_.where(jsonData, {id: 1}))
      console.log('success')
    } else {
      console.error('error', err)
    }
    console.log('complete')
  })

class ChatStore extends BaseStore {
  getAllJson() {
    return jsonData
  }
  getAllContents() { // いるかな？（２つの）IDで検索形式のほうがいいかも？
    if (jsonData == null) {
      jsonData = []
    }
    return _.map(jsonData, 'content')
  }
  getContentsByUserIDs(currentUserID, recipientID) {
    return _.filter(jsonData, function(j) {
      return j.user_id === currentUserID || j.user_id === recipientID
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
  getChatByUserID(id) {
    return messages[id]
  }
  getAllChats() {
    return messages
  }
}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    updateOpenChatID(payload) {
      openChatID = payload.action.userID
      messages[openChatID].lastAccess.currentUser = +new Date()
      MessagesStore.emitChange()
    },
    sendMessage(payload) {
      const userID = payload.action.userID
      messages[userID].messages.push({
        contents: payload.action.message,
        timestamp: payload.action.timestamp,
        from: UserStore.user.id,
      })
      messages[userID].lastAccess.currentUser = +new Date()
      MessagesStore.emitChange()
    },
  }
  actions[payload.action.type] && actions[payload.action.type](payload)
})

export default MessagesStore

// getAllData() {
//   $.ajax({
//     type: 'GET',
//     url: 'http://localhost:3000/data',
//     dataType: 'json',
//     success: function(data) {
//       // for (var i = 0; i < data.length; i++) {
//       //   console.log(data[i].content)
//       // }
//       return data
//     },
//     error: function(jqXHR, textStatus, errorThrown) {
//       // 通信エラー時のダイアログ表示
//       console.log(jqXHR + '-' + textStatus + '-' + errorThrown)
//       return null
//     },
//   })
// }
