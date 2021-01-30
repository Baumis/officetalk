import { useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react'
import { rootstore } from './index'
import { io } from 'socket.io-client'
import Login from './Views/Login/Login'
import Office from './Views/Office/Office'
import './App.css'

const App = observer(() => {
  const userStore = rootstore.userStore
  const officeStore = rootstore.officeStore
  const [page, setPage] = useState('login')

  const socket = useRef()

  useEffect(() => {
    const checkLogin = async () => {
      const response = await userStore.checkSignIn()
      response.user && setPage('office')
      connectSocket(response.token, response.user.organization)
    }

    checkLogin()
  }, [userStore])

  const connectSocket = (token, organization) => {
    socket.current = io.connect(`/${organization}`, {
      auth: {
        token
      }
    })

    socket.current.on('message', (message) => {
      officeStore.receiveMessage(message)
    })

    socket.current.on('employees', (users) => {
      console.log(users)
    })

  }

  const disconnectSocket = () => {
    socket.current.disconnect()
  }

  const renderPage = () => {
    switch (page) {
      case 'login':
        return <Login navigateTo={setPage} connectSocket={connectSocket} />
      case 'office':
        return <Office navigateTo={setPage} disconnectSocket={disconnectSocket} />
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
