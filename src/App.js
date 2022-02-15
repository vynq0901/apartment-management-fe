import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  return (
    <div>
      <Switch>
        
        <Route path="/login" component={Login} /> 
        <Route  path="/admin" component={Home} />
      </Switch>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </div>
  );
}

export default App;