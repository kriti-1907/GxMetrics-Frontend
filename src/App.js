import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './GxMetrics/Dashboard';
import Logingx from './GxMetrics/Logingx';
import Registrationgx from './GxMetrics/Registrationgx';
import EmployeeCard from './GxMetrics/EmployeeCard';
import Account from './GxMetrics/Account';
import ChangePassword from './GxMetrics/ChangePassowrd';
import UpdateProfilegx from './GxMetrics/UpdateProfilegx';
import ProfilePAge from './GxMetrics/ProfilePAge';
import PersonalInfo from './GxMetrics/PersonalInfo';
import Profile from './GxMetrics/Profile';
import EditDetails from './GxMetrics/EditDetails';
import UpdatePassword from './GxMetrics/UpdatePassword';
function App() {
  return (
    <div className="App">
    <Router><Routes>
    <Route path='/' element={<Logingx/>}/>
    <Route path='/registergx' element={<Registrationgx/>}></Route>
    <Route path='/logingx' element={<Logingx/>}></Route>
    <Route path='/dashboard' element={<Profile/>}></Route>
    <Route path='/accountgx' element={<Account/>}></Route>
    <Route path='/change-password' element={<UpdatePassword/>}/>
    <Route path='/updategx' element={<EditDetails/>}/>
    <Route path='personal-info' element={<PersonalInfo/>}/>
</Routes>
</Router>
    </div>
  );
}

export default App;
