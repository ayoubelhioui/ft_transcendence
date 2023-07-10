import loss1 from '../../assets/end/loss1.gif'
import loss2 from '../../assets/end/loss2.gif'

import win1 from '../../assets/end/win1.gif'
import win2 from '../../assets/end/win2.gif'
import win3 from '../../assets/end/win3.gif'


const EndGame = ({ isWinner } : { isWinner : boolean }) => {
    let loss = [
        loss1,
        loss2,
    ]
    let win = [
        win1,
        win2,
        win3,
    ]
    let lossImg = loss[Math.floor(Math.random() * loss.length)]
    let winImg = loss[Math.floor(Math.random() * win.length)]
    console.log(lossImg)
    if (isWinner) {
        return <div className='game-ending-win' style={{ backgroundImage : `url(${winImg})` }}></div>
    } else {
        return <div className='game-ending-lose' style={{ backgroundImage : `url(${lossImg})` }} ></div>
    }
    
}

export default EndGame
