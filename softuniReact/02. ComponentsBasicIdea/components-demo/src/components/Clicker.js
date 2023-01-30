import {useState} from 'react';

export const Clicker = () => {
    const [clicks, setClicks] = useState(0);

    const clickHandler = (e) => {
        setClicks(oldClicks => oldClicks + 1);
    }

    const dangerClicks = clicks > 20;

    if (clicks > 30) {
        return <h1>Finished Clicks</h1>
    }

    return (
        <div>
            <div>
                {/* expressions inside {} right, statements inside {} wrong */}
                {/* if first true, show second */}
                {dangerClicks && <h1>Danger Clicks</h1>}
                {/* if expression true, return first, else return second */}
                {clicks > 10
                    ? <h2>Medium Clicks</h2>
                    : <h4>Normal Clicks</h4>
                }
            </div>
            <button onClick={clickHandler}>{clicks}</button>
        </div>
    );
}
// how is it that setClicks can be called inside clickHandler
// setClicks is within the same scope, infact, we have a closure
// handleClick calls on an argument defined above itself, but within the limited scope of Clicker()
// {dangerClicks && <h1>Danger Clicks</h1>} is dangerClicks is true && makes the <h1></h1> be true too, thus, shows it