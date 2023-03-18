import { useState } from 'react'
import { GithubPicker } from 'react-color'


const CreateMatch = () => {
    const [colorTeamOne, setColorTeamOne] = useState('#B80000')
    const [colorTeamTwo, setColorTeamTwo] = useState('#5300EB')

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const date = formData.get('date');
        const firstTeam = formData.get('firstTeam');
        const secondTeam = formData.get('secondTeam');
        
        let info = {date, firstTeam, secondTeam, colorTeamOne, colorTeamTwo}
        console.log(info);
        

    }

    return(
        <section className='loggedFormContainer'>
        <div className='formWrapper'>
            <span className='logo'>Create Game</span>
            <form onSubmit={onSubmit}>
                <label htmlFor="date">Date:</label>
                <input type="date" name="date" id='date'/>
                <label htmlFor="firstTeam">Team 1:</label>
                <input type="text" name="firstTeam" id='firstTeam' placeholder='Enter Team 1'/>
                <label htmlFor="secondTeamColor">Color: <span style={{color: colorTeamOne}}>{colorTeamOne}</span></label>
                <GithubPicker
                    color={colorTeamOne}
                    onChangeComplete={(color) => {setColorTeamOne(color.hex)}}
                />
                <label htmlFor="secondTeam">Team 2:</label>
                <input type="text" name="secondTeam" id='secondTeam' placeholder='Enter Team 2'/>
                <label htmlFor="secondTeamColor">Color: <span style={{color: colorTeamTwo}}>{colorTeamTwo}</span></label>
                <GithubPicker
                    onChangeComplete={(color) => {setColorTeamTwo(color.hex)}}
                />
                <button>Create</button>
            </form>

        </div>
    </section>
    )
}

export default CreateMatch;


