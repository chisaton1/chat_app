import keyMirror from 'keymirror'

export const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
export const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  CURRENT_USER: APIRoot + '/current_user',
  USERS: APIRoot + '/users',
  FRIENDS: APIRoot + '/friends',
}

export const ActionTypes = keyMirror({
  // from MessagesStore
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
  SEND_IMAGE: null,
  SET_ALL_CONTENTS: null,
  // from UsersStore
  SET_CURRENT_USER_INFO: null,
  SET_ALL_USERS: null,
  SET_CHAT_FRIENDS: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}
