import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import CacheManager from './cache/CacheManager';
import WeaponsPage from './pages/WeaponsPage';
import WeaponDetails from './components/WeaponDetails';
import SkinDetails from './components/SkinDetails';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import MapsPage from './pages/MapsPage';
import MapDetails from './components/MapDetails';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AgentsPage from './pages/AgentsPage';
import AgentDetails from './components/AgentDetails';

function App() {
  return (
    <div className="App">
      <CacheManager />
      <Navbar />
      <main>
        <Routes>
          {/* HOME */}
          <Route path='/valorant' element={<HomePage />} />

          {/* LOGIN */}
          <Route path='/valorant/login' element={<LoginPage />}/>
          <Route path='/valorant/profile' element={<ProfilePage />}/>

          {/* WEAPONS */}
          <Route path='/valorant/weapons' element={<WeaponsPage />} />
          <Route path='/valorant/weapons/:weaponName' element={<WeaponDetails />}/>
          <Route path='/valorant/weapons/:weaponName/skin/:skinName' element={<SkinDetails />}/>

          {/* MAPS */}
          <Route path='/valorant/maps' element={<MapsPage />} />
          <Route path='/valorant/maps/:mapName' element={<MapDetails />}/>

          <Route path='/valorant/agents/' element={<AgentsPage />} />
          <Route path='/valorant/agents/:agentName' element={<AgentDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
