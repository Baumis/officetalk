import { useEffect, useState, useRef } from 'react';
import { rootstore } from './index'
import { io } from 'socket.io-client'
import Login from './Views/Login/Login'
import Office from './Views/Office/Office'
import './App.css';

function App() {
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
  }, [])

  const connectSocket = (token, organization) => {
    socket.current = io.connect(`/${organization}`, {
      auth: {
        token
      }
    })

    socket.current.on('message', (message) => {
      officeStore.receiveMessage(message)
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
      case 'createOffice':
        return <Login navigateTo={setPage} />
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
  );
}

export default App;
