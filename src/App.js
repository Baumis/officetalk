import { useState } from 'react';
import Login from './Views/Login/Login'
import './App.css';

function App() {
  const [page, setPage] = useState('Login')

  const renderPage = () => {
    switch (page) {
      case page === 'login':
        return <Login navigateTo={setPage}/>
      case page === 'office':
        return <Login navigateTo={setPage}/>
      case page === 'createOffice':
        return <Login navigateTo={setPage}/>
      case page === 'controlPanel':
        return <Login navigateTo={setPage}/>
      default:
        return <Login navigateTo={setPage}/>
    }
  }

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
