import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home';
import Login from './components/Login/Login';
// import Register from './components/Register/Register';
import CreateGame from './components/CreateGame/CreateGame';
import Catalog from './components/Catalog/Catalog';
import GameDetails from './components/GameDetails/GameDetails';
import Logout from './components/Logout/Logout'

import * as gameService from './services/gameServices'
import { AuthContext } from './contexts/AuthContext'

import uniqid from 'uniqid'
import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useLocalStorage } from './hooks/useLocalStorage';

// lazy load of Register
const Register = lazy(() => import('./components/Register/Register'))


function App() {
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useLocalStorage('auth', {}); //key hardcoded
    const navigate = useNavigate();

    useEffect(()=>{
        gameService.getAll()
                .then(result => {
                    setGames(result)
                })
    },[])

    // why have this abstraction userLogin wrapping setAuth
    // we want encapsualtion -> App has responsibility about auth state managment
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

    const addGameHandler = (gameData) => {
        setGames(state => [ 
            ...state,
            {
                ...gameData,
                _id: uniqid()
            }
        ]);
        navigate('/catalog')
    };

    return (
        <AuthContext.Provider value={{user: auth, userLogin, userLogout}}>
            <div id="box">
                <Header />

                {/* Main Content */}
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
                        <Route path='/create' element={<CreateGame addGameHandler={addGameHandler}/>}></Route>
                        <Route path='/catalog' element={<Catalog games={games}/>}></Route>
                        <Route path='/catalog/:gameId' element={<GameDetails games={games} addComment={addComment}/>}></Route>



                    </Routes>
                </main>



                {/* Edit Page ( Only for the creator )*/}
                {/* <section id="edit-page" className="auth">
                    <form id="edit">
                        <div className="container">
                            <h1>Edit Game</h1>
                            <label htmlFor="leg-title">Legendary title:</label>
                            <input type="text" id="title" name="title" defaultValue="" />
                            <label htmlFor="category">Category:</label>
                            <input type="text" id="category" name="category" defaultValue="" />
                            <label htmlFor="levels">MaxLevel:</label>
                            <input
                                type="number"
                                id="maxLevel"
                                name="maxLevel"
                                min={1}
                                defaultValue=""
                            />
                            <label htmlFor="game-img">Image:</label>
                            <input type="text" id="imageUrl" name="imageUrl" defaultValue="" />
                            <label htmlFor="summary">Summary:</label>
                            <textarea name="summary" id="summary" defaultValue={""} />
                            <input className="btn submit" type="submit" defaultValue="Edit Game" />
                        </div>
                    </form>
                </section> */}
                
                {/*Details Page*/}
    
                
                {/* Catalogue */}
                
            </div>
        </AuthContext.Provider>
    );
}

export default App;
