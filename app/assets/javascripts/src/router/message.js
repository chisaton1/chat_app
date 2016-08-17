import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../app'
import MessagesAction from '../actions/messages'
import UsersAction from '../actions/users'

export default class CardRouter extends BaseRouter {
  register() {
    this.route('/messages', this.decorateApp, this.setAllData) // ここのパス設定ちゃんとあわせてね
  }
  setAllData() {
    MessagesAction.getAllContents()
    UsersAction.getCurrentUserInfo()
    UsersAction.getChatFriends()
  }
  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }
}
