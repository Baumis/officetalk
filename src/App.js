import { useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react'
import { rootstore } from './index'
import { io } from 'socket.io-client'
import Login from './Views/Login/Login'
import Office from './Views/Office/Office'
import './App.css'

const App = observer(() => {
  const userStore = rootstore.userStore
  const socketStore = rootstore.socketStore
  const [page, setPage] = useState('login')

  useEffect(() => {
    const checkLogin = async () => {
      const response = await userStore.checkSignIn()
      response.user && setPage('office')
      socketStore.connectToOffice(response.token, response.user.organization)
    }

    checkLogin()
  }, [userStore])

  const renderPage = () => {
    switch (page) {
      case 'login':
        return <Login navigateTo={setPage} />
      case 'office':
        return <Office navigateTo={setPage} />
      case 'controlPanel':
        return <Login navigateTo={setPage} />
      default:
        return <Login navigateTo={setPage} />
    }
  }

  return (
    <div className="App">
      {renderPage()}
    </div>
  )
})

export default App;
