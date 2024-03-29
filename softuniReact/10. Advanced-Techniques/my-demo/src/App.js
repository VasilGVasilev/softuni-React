import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home';
import Login from './components/Login/Login';
// import Register from './components/Register/Register';
import CreateGame from './components/CreateGame/CreateGame';
import EditGame from './components/EditGame/EditGame';
import Catalog from './components/Catalog/Catalog';
import GameDetails from './components/GameDetails/GameDetails';
import Logout from './components/Logout/Logout'

import { AuthProvider } from './contexts/AuthContext'
import { GameProvider } from './contexts/GameContext'
import PrivateRoute from "./components/common/PrivateRoute";
import PrivateGuard from "./components/common/PrivateGuard";



import { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom'

// lazy load of Register
const Register = lazy(() => import('./components/Register/Register'))


function App() {

    return (
        <AuthProvider>
            <div id="box">
                <Header />

                {/* Main Content */}
                <GameProvider >
                    <main id="main-content">
                        <Routes>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/login' element={<Login />}></Route>
                            <Route path='/register' element={
                                <Suspense fallback={<span>Loading...</span>}>
                                    <Register />
                                </Suspense>
                            }/>
                            <Route path='/create' element={(
                                <PrivateRoute>
                                    <CreateGame />
                                </PrivateRoute>
                            )}></Route>
                            {/* using Outlet makes it possible to have nested Routes with path="" transferred down into the nested Routes */}
                            <Route element={<PrivateGuard />}> 
                                <Route path="/games/:gameId/edit" element={<EditGame />} />
                                <Route path="/logout" element={<Logout />} />
                            </Route>
                            <Route path='/catalog' element={<Catalog />}></Route>
                            <Route path='/catalog/:gameId' element={<GameDetails />}></Route>



                        </Routes>
                    </main>
                </GameProvider>

                
                {/*Details Page*/}
    
                
                {/* Catalogue */}
                
            </div>
        </AuthProvider>
    );
}

export default App;
