// import keyMirror from 'keymirror'

export const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
export const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  CURRENTUSER: APIRoot + '/current_user',
}

// export const ActionTypes = keyMirror({
//   SEND_ALL_CONTENTS: null,
// })

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}
