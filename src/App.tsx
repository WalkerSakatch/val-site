import './App.css';
import CacheManager from './cache/CacheManager';
import WeaponsSection from './components/WeaponsSection';

function App() {
  return (
    <div className="App">
      <CacheManager />
      <WeaponsSection />
    </div>
  );
}

export default App;
