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
  sendMessage(userID, message) {
    request
    .post(APIEndpoints.MESSAGES)
    .send({content: message, user_id: userID})
    .set('X-CSRF-Token', CSRFToken())
    .end(function(err, res) {
      if (res.ok) {
        console.log('success')
      } else {
        console.error('error', err)
      }
      console.log('complete')
    })
    Dispatcher.handleViewAction({
      type: 'sendMessage',
      userID: userID,
      message: message,
      timestamp: +new Date(),
    })
  },
  sendAllContents() {
    request
    .get('http://localhost:3000/api/messages')
    .end(function(err, res) {
      if (res.ok) {
        const json = JSON.parse(res.text)
        Dispatcher.handleViewAction({
          type: 'setAllContents',
          json: json,
        })
        console.log('success')
      } else {
        console.error('error', err)
      }
      console.log('complete')
    })
  },
}
