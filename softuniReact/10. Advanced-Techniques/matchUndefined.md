This refers to the version of my React Project for Defense prior to 30.03:
 the problem is why we have match as undefined if we update state out of .then() for DB update, CASE I
 and match is not a problem if we update state inside of .then() for DB update. CASE II

CASE I:

    const deleteMatch = () => {
        console.log('start Del Handler');
        matchService.del(matchId)
            .then(() => {
                console.log('after .then()');
                console.log('In Del Handler ', match);
            })
        navigate('/catalog')
        matchDel(matchId)
    }


CASE II:
    const deleteMatch = () => {
        console.log('start Del Handler');
        matchService.del(matchId)
            .then(() => {
                console.log('after .then()');
                navigate('/catalog')
                matchDel(matchId)
                console.log('In Del Handler ', match);
            })
    }

In case I, we see that state is updated via matchDel right after we start execution of deleteMatch handler, this is because, matchService.del makes a fetch request with the instance of match before the update of state and so the execution of what is in .then() will ensue after some moment in time. In this moment, global state is updated and this triggers re-rendering of all components and this time, match = matches.find() will be undefined since there is not such match in state anymore. After all of this is clear via errors, the event loop finally executes the two console logs inside .then() and it is worth noting that match inside one of them is the match that was sent with the request, not an updated version due to global state update, namely, undefined.

In case II, the matchDel following the logic of being executed after all script is executed due to await fetch response, updates global state after the execution of match = matches.find(), which as a match, still persists before the update.