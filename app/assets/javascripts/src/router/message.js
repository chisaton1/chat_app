import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import MessagesAction from '../actions/messages'
import UsersAction from '../actions/users'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/messages', this.decorateApp, this.setAllData)
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
