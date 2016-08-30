import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints} from '../constants/app'

export default {
  getCurrentUserInfo() {
    request
    .get(APIEndpoints.CURRENT_USER)
    .end(function(err, res) {
      if (res.ok) {
        const json = JSON.parse(res.text)
        Dispatcher.handleServerAction({
          type: ActionTypes.SET_CURRENT_USER_INFO,
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
        Dispatcher.handleServerAction({
          type: ActionTypes.SET_ALL_USERS,
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
        Dispatcher.handleServerAction({
          type: ActionTypes.SET_CHAT_FRIENDS,
          json: json,
        })
      } else {
        console.error('error', err)
      }
    })
  },
}
