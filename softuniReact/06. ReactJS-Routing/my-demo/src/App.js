import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Hello React Router</h1>
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>}/>
        <Route path="/about" element={<h2>About Page</h2>}/>
        <Route path="/pricing" element={<h2>Pricing Page</h2>}/>
        <Route path="/contacts" element={<h2>Contacts Page</h2>}/>


      </Routes>
    </div>
  );
}

export default App;
