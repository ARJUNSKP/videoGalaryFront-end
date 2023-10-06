import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landingpage from './pages/Landingpage';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import History from './pages/History';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='' element={<Landingpage></Landingpage>}/>
        <Route path='/home' element={<Home></Home>}/>
        <Route path="/history" element={<History/>}/>
      </Routes>
    </div>
  );
}

export default App;
