import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './app.css'
import Map from './components/Map';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/map' element={<Map />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
