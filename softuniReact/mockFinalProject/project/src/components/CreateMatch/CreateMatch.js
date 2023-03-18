import { Link } from "react-router-dom";

const CreateMatch = () => {
    return(
        <section className='loggedFormContainer'>
        <div className='formWrapper'>
            <span className='logo'>Create Game</span>
            <form>
                <label htmlFor="firstTeam">Team 1:</label>
                <input type="text" name="firstTeam" id='firstTeam' placeholder='Enter Team 1'/>
                <label htmlFor="secondTeam">Team 2:</label>
                <input type="text" name="secondTeam" id='secondTeam' placeholder='Enter Team 2'/>
                <button>Create</button>
            </form>

        </div>
    </section>
    )
}

export default CreateMatch;


