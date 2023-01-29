import { useState } from 'react';

export const Timer = (props) => {
    let [time, setTime] = useState(props.start);

    console.log('render');

    setTimeout(() => {
        if (time < 100) {
            setTime(time + 1);
        }
    }, 1000);

    return (
        <div>
            <h2>Timer: {time} sec.</h2>
        </div>
    );
};

// initial render, setTimeout changes setTimeout, this updates the state, so re-render is triggered
// after 1 second, setTimeout triggers state update again and re-render once more happens