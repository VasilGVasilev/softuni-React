import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home  from './components/Home'
import About from './components/About'
import Pricing from './components/Pricing'
import Contacts from './components/Contacts'


function App() {
  return (
    <div className="App">
      <h1>Hello React Router</h1>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/pricing" element={<Pricing />}/>
        <Route path="/contacts" element={<Contacts />}/>
        <Route path="/pricing/premium" element={<h2>Premium Pricing</h2>} />



      </Routes>
    </div>
  );
}

export default App;
