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
    // .field('user_id', userID)
    // .field('to_user_id', toUserID)
    // .field('content', message)
    .set('X-CSRF-Token', CSRFToken())
    .end(function(err, res) {
      if (res.ok) {
        // ここのデータはmessages_controllerのrender
        const jsonData = JSON.parse(res.text)
        Dispatcher.handleViewAction({ // jsonDataの変更を反映させる
          type: 'sendMessage',
          userID: jsonData.user_id,
          message: jsonData.content,
          toUserID: jsonData.to_user_id,
          createdAt: jsonData.created_at,
          // json: JSON.parse(res.text),
        })
      } else {
        console.error('error', err)
      }
    })
  },
  sendImage(userID, image, toUserID) {
    request
    .post(APIEndpoints.MESSAGES)
    // .send({image: iamge, user_id: userID, to_user_id: toUserID})
    // console.log(image)
    .set('X-CSRF-Token', CSRFToken())
    .field('user_id', userID)
    .field('to_user_id', toUserID)
    .attach('image', image)
    .end(function(err, res) {
      if (res.ok) {
        const jsonData = JSON.parse(res.text)
        Dispatcher.handleViewAction({
          type: 'sendImage',
          image: jsonData.image,
          userID: jsonData.user_id,
          toUserID: jsonData.to_user_id,
          createdAt: jsonData.created_at,
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
          type: 'setAllContents',
          json: json,
        })
      } else {
        console.error('error', err)
      }
    })
  },
}
