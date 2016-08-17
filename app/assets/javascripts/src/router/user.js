import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import SearchBox from '../components/users/searchBox'
import UsersAction from '../actions/users'

export default class UserRouter extends BaseRouter {
  register() {
    this.route('/users', this.decorateSearchBox, this.setAllUsers)
  }
  setAllUsers() {
    UsersAction.getAllUsersInfo()
    UsersAction.getCurrentUserInfo()
  }
  decorateSearchBox(ctx, next) {
    (new ReactDecorator()).decorate('react-user-search', SearchBox)
    next()
  }
}
