import Dispatcher from '../dispatcher'
import _ from 'lodash'
import BaseStore from '../base/store'
import UsersStore from '../stores/user'
import {ActionTypes} from '../constants/app'

class MessagesStore extends BaseStore {

  getMessages() {
    if (!this.get('messages')) this.setMessages([])
    return this.get('messages')
  }

  setMessages(array) {
    this.set('messages', array)
  }

  getOpenChatID() {
    if (!this.get('openChatID')) this.setOpenChatID(-1)
    return this.get('openChatID')
  }

  setOpenChatID(id) {
    this.set('openChatID', id)
  }

  getLastContent(userID) {
    const currentUserID = UsersStore.getCurrentUser().id
    const contents = this.getContentsByUserIDs(currentUserID, userID)
    return contents[contents.length-1]
  }

  getContentsByUserIDs(currentUserID, recipientID) {
    return _.filter(this.getMessages(), function(j) {
      return (j.user_id === currentUserID && j.to_user_id === recipientID) ||
             (j.to_user_id === currentUserID && j.user_id === recipientID)
    })
  }
}

const messagesStore = new MessagesStore()
messagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  switch (action.type) {
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      messagesStore.setOpenChatID(action.userID)
      messagesStore.emitChange()
      break

    case ActionTypes.SEND_MESSAGE:
      {
        const messages = messagesStore.getMessages()
        messages.push(action.json)
      }
      messagesStore.emitChange()
      break

    case ActionTypes.SEND_IMAGE:
      {
        const messages = messagesStore.getMessages()
        messages.push(action.json)
      }
      messagesStore.emitChange()
      break

    case ActionTypes.SET_ALL_CONTENTS:
      messagesStore.setMessages(action.json)
      messagesStore.emitChange()
      break

    default:
  }
  return true
})

export default messagesStore
