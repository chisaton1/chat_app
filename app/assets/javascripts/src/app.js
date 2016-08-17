import React from 'react'
import UserList from './components/messages/userList'
import MessagesBox from './components/messages/messagesBox'

class App extends React.Component {
  render() {
    return (
        <div className='app'>
          <UserList />
          <MessagesBox />
        </div>
      )
  }
}

export default App
