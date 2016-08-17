import request from 'superagent'
import Dispatcher from '../dispatcher'
import {APIEndpoints} from '../constants/app'

export default {
  getCurrentUserInfo() {
    request
    .get(APIEndpoints.CURRENT_USER)
    .end(function(err, res) {
      if (res.ok) {
        const json = JSON.parse(res.text)
        Dispatcher.handleViewAction({
          type: 'setCurrentUserInfo',
          json: json,
        })
      } else {
        console.error('error', err)
      }
    })
  },
  getAllUsersInfo() {
    request
    .get(APIEndpoints.USERS)
    .end(function(err, res) {
      if (res.ok) {
        const json = JSON.parse(res.text)
        Dispatcher.handleViewAction({
          type: 'setAllUsers',
          json: json,
        })
      } else {
        console.error('error', err)
      }
    })
  },
  getChatFriends() {
    request
    .get(APIEndpoints.FRIENDS)
    .end(function(err, res) {
      if (res.ok) {
        const json = JSON.parse(res.text)
        Dispatcher.handleViewAction({
          type: 'setChatFriends',
          json: json,
        })
      } else {
        console.error('error', err)
      }
    })
  },
}
