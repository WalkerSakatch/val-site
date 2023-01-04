import './App.css';
import { Route, Routes } from 'react-router-dom';
import CacheManager from './cache/CacheManager';
import WeaponsSection from './components/WeaponsSection';
import WeaponDetails from './components/WeaponDetails';

function App() {
  return (
    <div className="App">
      <CacheManager />
      <Routes>
        <Route path='/valorant' element={<WeaponsSection />} />
        <Route path='/valorant/weapons/:weaponId' element={<WeaponDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
