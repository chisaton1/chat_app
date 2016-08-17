import request from 'superagent'
import Dispatcher from '../dispatcher'
import {APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: 'updateOpenChatID',
      userID: newUserID,
    })
  },
  sendMessage(userID, message, toUserID) {
    request
    .post(APIEndpoints.MESSAGES)
    .send({content: message, user_id: userID, to_user_id: toUserID})
    .set('X-CSRF-Token', CSRFToken())
    .end(function(err, res) {
      if (res.ok) {
      } else {
        console.error('error', err)
      }
    })
    Dispatcher.handleViewAction({ // jsonDataの変更を反映させる
      type: 'sendMessage',
      userID: userID,
      message: message,
      toUserID: toUserID,
    })
  },
  getAllContents() {
    request
    .get(APIEndpoints.MESSAGES)
    .end(function(err, res) {
      if (res.ok) {
        const json = JSON.parse(res.text)
        Dispatcher.handleViewAction({
          type: 'setAllContents',
          json: json,
        })
      } else {
        console.error('error', err)
      }
    })
  },
}
