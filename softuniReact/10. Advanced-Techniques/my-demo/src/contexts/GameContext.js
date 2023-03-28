import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import * as gameService from '../services/gameServices'


export const GameContext = createContext();

export const GameProvider = ({children}) => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

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


    const gameAdd = (gameData) => {
        setGames(state => [ 
            ...state,
            gameData
        ]);
        navigate('/catalog')
    };



    return(
        <GameContext.Provider value={{games, addComment, gameAdd}}>
            {children}
        </GameContext.Provider>
    )

}

// Custom Hook Alternative
export const useGameContext = () => {
    const context = useContext(GameContext);
    return context;
}
