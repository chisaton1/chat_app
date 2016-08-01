import request from 'superagent'
import Dispatcher from '../dispatcher'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: 'updateOpenChatID',
      userID: newUserID,
    })
  },
  sendMessage(userID, message) {
    Dispatcher.handleViewAction({
      type: 'sendMessage',
      userID: userID,
      message: message,
      timestamp: +new Date(),
    })
  },
  sendAllContents() {
    request
    .get('http://localhost:3000/data')
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
