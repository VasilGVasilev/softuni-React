import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CreateGame from './components/CreateGame/CreateGame';
import Catalog from './components/Catalog/Catalog';
import GameDetails from './components/GameDetails/GameDetails';



import { useState, useEffect } from "react";
import * as gameService from './services/gameServices'
import { Routes, Route } from 'react-router-dom'

function App() {
    const [games, setGames] = useState([])

    useEffect(()=>{
        gameService.getAll()
                .then(result => {
                    setGames(result)
                })
    },[])

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
            gameData
        ])
    }

    return (
        <div id="box">
            <Header />

            {/* Main Content */}
            <main id="main-content">
                <Routes>
                    <Route path='/' element={<Home games={games}/>}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>
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

    );
}

export default App;
