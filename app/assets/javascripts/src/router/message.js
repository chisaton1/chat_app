import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../app'
import MessagesAction from '../actions/messages'
import UsersAction from '../actions/users'

export default class CardRouter extends BaseRouter {
  register() {
    this.route('/messages', this.decorateApp, this.setAllData) // ここのパス設定ちゃんとあわせてね
    // this.route('/', () => {console.log("hello")})
    // this.route('/messages/:id', this.decorateApp)
  }
  setAllData() {
    MessagesAction.getAllContents()
    UsersAction.getCurrentUserInfo()
  }
  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    // MessageAction.loadMessages()
    next()
  }
}
