import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import Register from './components/Register/Register'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Home from './pages/Home'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Contact from './pages/Contact'
import About from './pages/About'
import Events from './pages/Events'
import CreateEvent from './pages/CreateEvent'
import Dashboard from './components/Dashboard/Dashboard'
import Profile from './components/Profile/Profile'
import Dash from './components/Dash/Dash'
import DashVol from './components/DashVol/DashVol'
import DashCom from './components/DashCom/DashCom'
import VolProfile from './components/VolProfile/VolProfile'
import ComProfile from './components/ComProfile/ComProfile'
import FullCard from './components/FullCard/FullCard'
import AppliedEvent from './components/AppliedEvent/AppliedEvent'
import FinishedEvent from './components/FinishedEvent/FinishedEvent'
import CompanyCurrentEvents from './components/CompanyCurrentEvents/CompanyCurrentEvent'
import CompanyFinishedEvents from './components/CompanyFinishedEvents/CompanyFinishedEvents'
import AppliedVolenteers from './components/AppliedVolenteers/AppliedVolenteers'
import ComEvent from './components/ComEvent/ComEvent'
import ManageEvent from './components/ManageEvent/ManageEvent'


function App() {

  return (
    <>
      <BrowserRouter>
          <ScrollToTop/>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/contact-us' element={<Contact/>}/>
            <Route path='/about-us' element={<About/>}/>
            <Route path='/events' element={<Events/>}/>
            <Route path='/fullEvent/:eventId' element={<FullCard/>}/>   
            <Route path='/create-event' element={<CreateEvent/>}/>
            <Route path='/update-event/:eventId' element={<ComEvent/>}/>
            <Route path='/appliedVolenteers/:eventId' element={<AppliedVolenteers/>}/>
            <Route path='/dashboard' element={<Dashboard/>}>
              <Route index element={<Navigate to='profile' />} />
              <Route path='profile' element={<Profile/>}/> 
              <Route path='dash' element={<Dash/>}/> 
              <Route path='volenteers' element={<DashVol/>}/> 
              <Route path='companys' element={<DashCom/>}/> 
              <Route path='manageEvent' element={<ManageEvent/>}/> 
              <Route path='appliedEvent' element={<AppliedEvent/>}/> 
              <Route path='finishedEvent' element={<FinishedEvent/>}/> 
              <Route path='currentEvents' element={<CompanyCurrentEvents/>}/> 
              <Route path='CfinishedEvents' element={<CompanyFinishedEvents/>}/> 
              <Route path='volProfile/:userId' element={<VolProfile/>}/> 
              <Route path='comProfile/:companyId' element={<ComProfile/>}/> 
            </Route>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
