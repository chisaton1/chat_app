export const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
export const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  CURRENT_USER: APIRoot + '/current_user',
  USERS: APIRoot + '/users',
  FRIENDS: APIRoot + '/friends',
}

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}
