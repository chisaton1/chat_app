import request from 'superagent'
import Dispatcher from '../dispatcher'
// import {APIEndpoints} from '../constants/app'
import {ActionTypes, APIEndpoints} from '../constants/app'

export default {
  getCurrentUserInfo() {
    request
    .get(APIEndpoints.CURRENT_USER)
    .end(function(err, res) {
      if (res.ok) {
        const json = JSON.parse(res.text)
        Dispatcher.handleViewAction({
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
        Dispatcher.handleViewAction({
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
        Dispatcher.handleViewAction({
          type: ActionTypes.SET_CHAT_FRIENDS,
          json: json,
        })
      } else {
        console.error('error', err)
      }
    })
  },
  // updateUserCreatedAt() {
  //   request
  //   .post(APIEndpoints.CURRENT_USER)
  //   .set('X-CSRF-Token', CSRFToken())
  //   .end(function(err, res) {
  //     if (res.ok) {
  //       const jsonData = JSON.parse(res.text)
  //       Dispatcher.handleViewAction({
  //         type: 'updateUserCreatedAt',
  //         updated_at: jsonData.updated_at,
  //       })
  //     } else {
  //       console.error('error', err)
  //     }
  //   })
  // },
}
