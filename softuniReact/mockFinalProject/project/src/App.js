import './style.scss'

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CreateMatch from './components/CreateMatch/CreateMatch';


import { Routes, Route, useNavigate } from 'react-router-dom'

function App() {
  return (
    <div className="box">
     <Header></Header>
     <main className='main-content'>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/create' element={<CreateMatch />}></Route>


      </Routes>

     </main>
    </div>
  );
}

export default App;
