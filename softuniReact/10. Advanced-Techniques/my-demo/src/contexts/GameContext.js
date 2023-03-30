import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from 'react-router-dom'
import * as gameService from '../services/gameServices'


export const GameContext = createContext();

// useReducer main advantage -> state modifications are all in one place, easier to read code, also singe responsibility principle
// all others send actions to reducer, but not  
const gameReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_GAMES':
            return action.payload.map( x => ({  ...x, comments: [] }))
            // return action.payload.slice() // Safety check - if we expect an array, easiest way to have a new reference -> someValue.slice() || [...someValue]
        case 'ADD_GAME':
            return [...state, action.payload];
        case 'FETCH_GAME_DETAILS': //since we want the same return, namely, set updated state with comment in first case and edited in second case, we can stack them and put only one return for both
        case 'EDIT_GAME':
            return state.map(x => x._id === action.gameId ? action.payload : x)
        case 'ADD_COMMENT':
            return state.map(x => x._id === action.gameId ? {...x, comments: [...x.comments, action.payload]} : x) //add to old comments, new one [...x.comments, action.payload]
        case 'REMOVE_GAME':
            return state.filter(x => x._id !== action.gameId);
        default:
            return state; //if no valid action is inputed into dispatch
    }
}

export const GameProvider = ({children}) => {

    const [games, dispatch] = useReducer(gameReducer, []);
    const navigate = useNavigate();

    useEffect(()=>{
        gameService.getAll()
                .then(result => {
                    console.log(result);
                    const action = {
                        type: 'ADD_GAMES',
                        payload: result
                    }
                    dispatch(action)
                })
    },[])


    const selectGame = (gameId) => {
        return games.find(x => x._id === gameId) || {}; //so that deleting game from state does not crash due to undefined if updating state is outside fetch of updateing DB

    };

    const fetchGameDetails = (gameId, gameDetails) => {
        dispatch({
            type: 'FETCH_GAME_DETAILS',
            payload: gameDetails,
            gameId,
        })
    }

    const addComment = (gameId, comment) => {
        dispatch({
            type: 'ADD_COMMENT',
            payload: comment,
            gameId
        });

    };

    const gameAdd = (gameData) => {
        dispatch({
            type: 'ADD_GAME',
            payload: gameData,
        })

        navigate('/catalog');
    };

    const gameEdit = (gameId, gameData) => {
        dispatch({
            type: 'EDIT_GAME',
            payload: gameData,
            gameId,
        });
    };

    const gameRemove = (gameId) => {
        dispatch({
            type: 'REMOVE_GAME',
            gameId
        })
    }

    return(
        <GameContext.Provider value={{
            games,
            gameAdd,
            gameEdit,
            addComment,
            fetchGameDetails,
            selectGame,
            gameRemove
        }}>
            {children}
        </GameContext.Provider>
    )

}

// Custom Hook Alternative
export const useGameContext = () => {
    const context = useContext(GameContext);
    return context;
}
