import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../app'
import MessagesAction from '../actions/messages'

export default class CardRouter extends BaseRouter {
  register() {
    this.route('/messages', this.decorateApp, this.sendAllContents) // ここのパス設定ちゃんとあわせてね
    // this.route('/', () => {console.log("hello")})
  }

  sendAllContents() {
    MessagesAction.sendAllContents()
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    // MessageAction.loadMessages()
    next()
  }
}
