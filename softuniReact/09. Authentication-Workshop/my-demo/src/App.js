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

import * as gameService from './services/gameServices'
import { AuthContext } from './contexts/AuthContext'
import { GameContext } from './contexts/GameContext'



import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useLocalStorage } from './hooks/useLocalStorage';

// lazy load of Register
const Register = lazy(() => import('./components/Register/Register'))


function App() {
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useLocalStorage('auth', {}); // 'auth' is a hardcoded key
    const navigate = useNavigate();

    useEffect(()=>{
        gameService.getAll()
                .then(result => {
                    setGames(result)
                })
    },[])

    // why have this abstraction userLogin wrapping setAuth
    // we want encapsualtion -> App has responsibility about auth state management
    // we pass in setAuth to authContext, but we want to pass in limited verions
    // thus, encapuslating in a separate function and we pass in this separate function
    const userLogin = (authData) => {
        setAuth(authData)
    }

    const userLogout = () => {
        setAuth({})
    }

    const addComment = (gameId, comment) => {
        setGames(state => {
            // commentedGame
            const game = state.find(x => x._id == gameId);
            
            // comments -> based either on previous comments property if any such, or empty array
            const comments = game.comments || [];
            comments.push(comment)

            return [
                ...state.filter(x => x._id !== gameId),
                // commentedGame spreaded and comments added to game object
                {...game, comments}
            ]
        })


    }

    const gameAdd = (gameData) => {
        setGames(state => [ 
            ...state,
            gameData
        ]);
        navigate('/catalog')
    };

    return (
        <AuthContext.Provider value={{user: auth, userLogin, userLogout}}>
            <div id="box">
                <Header />

                {/* Main Content */}
                <GameContext.Provider value={{games, gameAdd}}>
                    <main id="main-content">
                        <Routes>
                            <Route path='/' element={<Home games={games}/>}></Route>
                            <Route path='/login' element={<Login />}></Route>
                            <Route path='/register' element={
                                <Suspense fallback={<span>Loading...</span>}>
                                    <Register />
                                </Suspense>
                            }/>
                            <Route path='/logout' element={<Logout />}></Route>
                            <Route path='/create' element={<CreateGame />}></Route>
                            <Route path='/catalog' element={<Catalog games={games}/>}></Route>
                            <Route path='/catalog/:gameId' element={<GameDetails games={games} addComment={addComment}/>}></Route>
                            <Route path="/games/:gameId/edit" element={<EditGame />} />



                        </Routes>
                    </main>
                </GameContext.Provider>

                
                {/*Details Page*/}
    
                
                {/* Catalogue */}
                
            </div>
        </AuthContext.Provider>
    );
}

export default App;
