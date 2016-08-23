import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },
  sendMessage(message, toUserID) {
    request
    .post(APIEndpoints.MESSAGES)
    .send({content: message, to_user_id: toUserID})
    .set('X-CSRF-Token', CSRFToken())
    .end(function(err, res) {
      if (res.ok) {
        // ここのデータはmessages_controllerのrender
        const jsonData = JSON.parse(res.text)
        // jsonDataの変更を反映させる
        Dispatcher.handleViewAction({
          type: ActionTypes.SEND_MESSAGE,
          message: jsonData, // TODO: json: jsonData
        })
      } else {
        console.error('error', err)
      }
    })
  },

  // TODO: delete userId
  sendImage(userID, image, toUserID) {
    request
    .post(APIEndpoints.MESSAGES)
    .set('X-CSRF-Token', CSRFToken())
    .field('user_id', userID)
    .field('to_user_id', toUserID)
    .attach('image', image)
    .end(function(err, res) {
      if (res.ok) {
        const jsonData = JSON.parse(res.text)
        Dispatcher.handleViewAction({
          type: ActionTypes.SEND_IMAGE,
          image: jsonData, // TODO: json: jsonData
        })
      } else {
        console.error('error', err)
      }
    })
  },
  getAllContents() {
    request
    .get(APIEndpoints.MESSAGES)
    .end(function(err, res) {
      if (res.ok) {
        const json = JSON.parse(res.text)
        Dispatcher.handleViewAction({
          type: ActionTypes.SET_ALL_CONTENTS,
          json: json, // MEMO: (json: json) eq json
        })
      } else {
        console.error('error', err)
      }
    })
  },
}
