
import './App.css';
import HomePage from './pages/Home.jsx';
import Login from "./pages/Login.jsx";
import Register from './pages/Register.jsx'
import FindBands from './pages/Find-bands.jsx';
import { Routes, Route, Link } from "react-router-dom";
import CreateBands from './pages/Create-bands.jsx';
import DeepBand from './pages/Deep-band.jsx';
import Profile from './pages/Profile.jsx';
import ViewOtherProfiles from './pages/ViewOtherProfiles.jsx';
import BandSelector from './pages/Band-selector.jsx';
import BandSelectorOwner from './pages/Band-selector-owner.jsx';
import MemberofBand from './pages/Member-of-band.jsx';
import BandEditor from './pages/Band-editor.jsx';
import ViewBandApplications from './pages/View-BandApplications.jsx';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Find-bands" element={<FindBands />} />
        <Route path="/Create-bands" element={<CreateBands />} />
        <Route path='/Find-bands/view' element={<DeepBand/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Find-bands/view/view-other-profiles' element={<ViewOtherProfiles/>}/>
        <Route path='/Profile/BandsImIn' element={<BandSelector/>}/>
        <Route path='/Profile/ownedBands' element={<BandSelectorOwner/>}/>
        <Route path='/Profile/BandsImIn/MemberOfBand' element={<MemberofBand/>}/>
        <Route path='/Profile/ownedBands/bandEditor' element={<BandEditor/>}/>
        <Route path='/Profile/ownedBands/bandEditor/viewApplications' element={<ViewBandApplications/>}/>
      </Routes>
    </div>
  );
}

export default App;
