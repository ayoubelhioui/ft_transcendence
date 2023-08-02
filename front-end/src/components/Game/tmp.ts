async function loadData(params : GameParams) {
    try {
        const access_Token = Cookies.get('access_token');
        console.log(`using user token => `, access_Token)
        return (access_Token!)

    } catch (error) {
        console.log(`Can't get users => ${error}`)
    }
    return ""
}



function getUrlParams() {
    const searchParams = new URLSearchParams(window.location.search);

    // Get individual parameters by their names
    const testType = searchParams.get('watch');
    console.log(testType)


    //console.log("urls params : ?userId=1&isBotMode=false&isClassic=true&isWatchMode=false&gameToken=1&userToInvite=2")
    console.log("urls params : ?userId=1&isWatchMode=false&gameToken=1&userToInvite=2")

    return {
        isWatchMode : searchParams.get('isWatchMode') === 'true',
        gameToken : searchParams.get('gameToken') as string,
        userId : searchParams.get('userId') as string,
        userToInvite : searchParams.get('userToInvite') as string,
        // isBotMode : searchParams.get('isBotMode') === 'true',
        // isClassic : searchParams.get('isClassic') === 'true',
        isBotMode : true,
        isClassic : true,
    }
}


const r = (state: number): JSX.Element => {
    if (state === GameState.gameStarted) {
      return <div></div>
    } else if (state === GameState.gameEndedWin) {
      return <EndGame isWinner = {true}/>;
    } else if (state === GameState.gameEndedLoss) {
        return <EndGame isWinner = {false}/>;
    }
    return <LoadingPage />;
};