import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResetPassword from './components/ResetPassword.jsx';

const App = () =>{
  return(
  <Router>
      <Routes>
        <Route path="/resetpassword/:token" element={<ResetPassword/>}/>
        

      </Routes>

  </Router>
  ) 
}

export default App;
