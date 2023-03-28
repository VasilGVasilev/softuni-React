import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from 'react-router-dom'
import * as gameService from '../services/gameServices'


export const GameContext = createContext();

export const GameProvider = ({children}) => {

    const gameReducer = (state, action) => {
        switch (action.type) {
            case 'ADD_GAMES':
                return action.payload.slice() // Safety check - if we expect an array, easiest way to have a new reference -> someValue.slice() || [...someValue]
        
            default:
                return state; //if no valid action is inputed into dispatch
        }
    }

    const [games, dispatch] = useReducer(gameReducer, []);
    const navigate = useNavigate();

    useEffect(()=>{
        gameService.getAll()
                .then(result => {
                    const action = {
                        type: 'ADD_GAMES',
                        payload: result
                    }
                    dispatch(action)
                })
    },[])

    const addComment = (gameId, comment) => {
        // setGames(state => {
        //     // commentedGame
        //     const game = state.find(x => x._id == gameId);
            
        //     // comments -> based either on previous comments property if any such, or empty array
        //     const comments = game.comments || [];
        //     comments.push(comment)

        //     return [
        //         ...state.filter(x => x._id !== gameId),
        //         // commentedGame spreaded and comments added to game object
        //         {...game, comments}
        //     ]
        // })


    }


    const gameAdd = (gameData) => {
        // setGames(state => [ 
        //     ...state,
        //     gameData
        // ]);
        navigate('/catalog')
    };

    const gameEdit = (gameId, gameData) => {
        // setGames(state => state.map(x => x._id === gameId ? gameData : x));
    }


    return(
        <GameContext.Provider value={{games, addComment, gameAdd, gameEdit}}>
            {children}
        </GameContext.Provider>
    )

}

// Custom Hook Alternative
export const useGameContext = () => {
    const context = useContext(GameContext);
    return context;
}
