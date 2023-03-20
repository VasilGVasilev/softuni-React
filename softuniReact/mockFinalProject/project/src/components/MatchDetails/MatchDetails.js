import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as gameService from '../../services/gameServices'

const GameDetails = ({
    // games,
    // addComment,

}) => {
    const [game, setGame] = useState({});
    const { matchId } = useParams();

    useEffect(()=>{
        gameService.getOne(matchId)
            .then(result => {
                setGame(result);
            })
    },[])

    // comment logic hardcoding users that comment
    const [ comment, setComment] = useState({
        username: '',
        comment: '',
    });

    // const [error, setError] = useState({
    //     username: '',
    //     comment: '',
    // });


    // const addCommentHandler = (e) => {
    //     e.preventDefault();
    //     addComment(gameId, `${comment.username}: ${comment.comment}`)
    //     console.log(comment)
    // }

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value // name="username" :  value={comment.username}
        }))
    }

    // const validateUsername = (e) => {
    //     const username = e.target.value;
    //     let errorMessage = '';
    //     if (username.length < 4){
    //         errorMessage = 'Username must be minimum 4 characters long!'
    //     } else if (username.length > 10) {
    //         errorMessage = 'Username must be shorter than 10 characters!'
    //     }
    //     setError(state => ({
    //         ...state,
    //         [e.target.name]: errorMessage
    //     }))

    // }

    return(
        <section className='detailsPage'>
            <div className='container'>

                <h1 className='title'>Match Details</h1>
                <div className='infoSection'>
                    <div className='gameHeader'>
                        <h1 className='teamOne'>{game.teamOne}</h1>
                        <h1>VS</h1>
                        <h1 className='teamTwo'>{game.teamTwo}</h1>
                    </div>
                    <div className='date'>
                        {game.date}
                    </div>

                    <div className='detailsComments'>
                        <h2>Comments:</h2>
                        <ul>
                            {game.comments?.map(x =>
                                <li className='comment'>
                                    <p>{x}</p>
                                </li>
                            )}
                        </ul>
                        {!game.comments &&
                            <div className='detailsCommentsOne'>

                                <p className='noComment'>No comments.</p>

                            </div>
                        }
                    </div>


                    <div className='buttons'>
                        <a href='#' className='button'>
                            Edit
                        </a>
                        <a href='#' className='button'>
                            Delete
                        </a>
                    </div>
                </div>
            </div>

            {/* <article className='create-comment'>
                <label>Add new comment:</label>
                <form className='form' onSubmit={addCommentHandler}>
                    <input
                        type='text'
                        name='username'
                        placeholder='John Doe'
                        onChange={onChange}
                        onBlur={validateUsername}
                        value={comment.username}
                    />
                    {error.username && 
                        <div style={{color: 'red'}}>{error.username}</div>
                    }
                    <textarea
                        name='comment'
                        placeholder='Comment......'
                        onChange={onChange}
                        value={comment.comment}
                        
                    />
                    <input
                        className='btn submit'
                        type='submit'
                        defaultValue='Add Comment'
                    />
                </form>
            </article> */}
        </section>
    )
}
export default GameDetails;