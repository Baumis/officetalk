import { useEffect, useState } from 'react';
import { rootstore } from './index'
import Login from './Views/Login/Login'
import Office from './Views/Office/Office'
import './App.css';

function App() {
  const userStore = rootstore.userStore
  const [page, setPage] = useState('login')

  useEffect(() => {
    checkLogin()
  })

  const checkLogin = async () => {
    const user = await userStore.checkSignIn()
    user && setPage('office')
  }

  const renderPage = () => {
    switch (page) {
      case 'login':
        return <Login navigateTo={setPage} />
      case 'office':
        return <Office navigateTo={setPage} />
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
