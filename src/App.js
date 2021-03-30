import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { rootstore } from './index'
import Login from './Views/Login/Login'
import Office from './Views/Office/Office'
import ControlPanel from './Views/ControlPanel/ControlPanel'
import SignIn from './Services/SignIn'
import './App.css'

const App = observer(() => {
  const { userStore, organizationStore } = rootstore
  const socketStore = rootstore.socketStore
  const [page, setPage] = useState('login')

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await SignIn.signInWithToken()
        if (response.user.type === 'employee') {
          userStore.setUser(response.user)
          setPage('office')
          socketStore.connectToOffice(response.token, response.user.organization)
        } else {
          organizationStore.setOrganization(response.user)
          setPage('controlPanel')
        }
      } catch (e) { }
    }

    checkLogin()
  }, [userStore, socketStore])

  const renderPage = () => {
    switch (page) {
      case 'login':
        return <Login navigateTo={setPage} />
      case 'office':
        return <Office navigateTo={setPage} />
      case 'controlPanel':
        return <ControlPanel navigateTo={setPage} />
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
