import './App.css';
import { Route, Routes } from 'react-router-dom';
import CacheManager from './cache/CacheManager';
import WeaponsPage from './pages/WeaponsPage';
import WeaponDetails from './components/WeaponDetails';
import SkinDetails from './components/SkinDetails';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import MapsPage from './pages/MapsPage';

function App() {
  return (
    <div className="App">
      <CacheManager />
      <Navbar />
      <Routes>
        {/* HOME */}
        <Route path='/valorant' element={<HomePage />} />

        {/* WEAPONS */}
        <Route path='/valorant/weapons' element={<WeaponsPage />} />
        <Route path='/valorant/weapons/:weaponId' element={<WeaponDetails />}/>
        <Route path='/valorant/weapons/:weaponId/skin/:skinId' element={<SkinDetails />}/>

        {/* MAPS */}
        <Route path='/valorant/maps' element={<MapsPage />} />
      </Routes>
    </div>
  );
}

export default App;
