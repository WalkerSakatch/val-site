import './App.css';
import { Route, Routes } from 'react-router-dom';
import CacheManager from './cache/CacheManager';
import WeaponsSection from './components/WeaponsSection';
import WeaponDetails from './components/WeaponDetails';
import SkinDetails from './components/SkinDetails';

function App() {
  return (
    <div className="App">
      <CacheManager />
      <Routes>
        <Route path='/valorant' element={<WeaponsSection />} />
        <Route path='/valorant/weapons/:weaponId' element={<WeaponDetails />}/>
        <Route path='/valorant/weapons/:weaponId/skin/:skinId' element={<SkinDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
