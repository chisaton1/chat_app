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
        // ここ(res)のデータはmessages_controllerのrender
        const json = JSON.parse(res.text)
        // jsonDataの変更を反映させる
        Dispatcher.handleServerAction({
          type: ActionTypes.SEND_MESSAGE,
          json, // これで json: jsonと同じ意味らしい
        })
      } else {
        console.error('error', err)
      }
    })
  },

  sendImage(image, toUserID) {
    request
    .post(APIEndpoints.MESSAGES)
    .set('X-CSRF-Token', CSRFToken())
    .field('to_user_id', toUserID)
    .attach('image', image)
    .end(function(err, res) {
      if (res.ok) {
        const json = JSON.parse(res.text)
        Dispatcher.handleServerAction({
          type: ActionTypes.SEND_IMAGE,
          json,
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
        Dispatcher.handleServerAction({
          type: ActionTypes.SET_ALL_CONTENTS,
          json,
        })
      } else {
        console.error('error', err)
      }
    })
  },
}
