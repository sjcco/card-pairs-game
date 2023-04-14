import { useEffect, useState } from 'react'
import './App.css'
import RotatingCard from './Card'
import Score from './Score'
import useSetup from './hooks/useSetup'
import ControlScreen from './ControlScreen'
import { scores, states } from './interfaces'
import useStorage from './hooks/useStorage'
import useTimer from './hooks/useTimer'

const PAIR_FOUND = 'pair-found';
const CLICKED = 'clicked';

function App() {
  const [refreshGame, setRefreshGame] = useState<boolean>(false);
  const {gameState, setGameState, gameReady} = useSetup(refreshGame);
  const [turnedCard, setTurnedCard] = useState<{background: string, id: number}>();
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [controlIsOpen, setControlIsOpen] = useState<boolean>(true);
  const [controlState, setControlState] = useState<states>('start');
  const [storage, setStorage] = useStorage('topScores');
  const timer = useTimer(gameRunning, refreshGame);

  const handleClick = (id:number, background: string) => {
    setGameState(prev => prev.map(card => {
      if(card.id === id) {
        return {
          ...card,
          clicked: card.clicked === '' ? CLICKED : '',
        }
      } else {
        return card
      }
    }))
    setTurnedCard(prev => prev === undefined ? {background, id} : undefined )
  }

  const closeControl = (state: states) => {
    if(state === 'end'){
      setRefreshGame(prev => !prev)
    }
    if(gameReady){
      setGameRunning(true)
      setControlIsOpen(false)
      setControlState('running')
    }
  }

  const openControl = (state: states) => {
    console.log('state :>> ', state);
    setGameRunning(false)
    setControlState(state)
    if(state === 'end'){
      saveScore()
    }
    setControlIsOpen(true)
  }

  const saveScore = () => {
    if(storage.length === 0){
      setStorage([{string: `${timer.hours}:${timer.minutes}:${timer.seconds}`, seconds: timer.totalSeconds}])
    } else {
      if(storage[storage.length -1].seconds > timer.totalSeconds || storage.length <= 2){
        let temp: scores = storage
        temp.push({string: `${timer.hours}:${timer.minutes}:${timer.seconds}`, seconds: timer.totalSeconds})
        console.log('temp :>> ', temp);
        temp = temp.sort((a, b) => a.seconds - b.seconds)
        if(temp.length > 3){
          temp.pop()
        }
        setStorage(temp)
      }
    }
  }

  useEffect(() => {
    let turnedCards = gameState.filter(card => card.clicked && !card.pairFound)
    if(turnedCards.length > 1){
      if(turnedCards[0].background === turnedCards[1].background){
        setGameState(prev => prev.map(card => {
          if(card.background === turnedCards[0].background){
            return {...card, pairFound: PAIR_FOUND}
          }else {
            return card
          }
        }))
      } else {
        setTimeout(() => {
          setGameState(prev => prev.map(card => ({...card, clicked: card.pairFound ? card.clicked : ''})))
          setTurnedCard(undefined)
        }, 800);
      }
    }
  }, [turnedCard]);

  useEffect(() => {
    if(gameState.length !== 0 && gameState.every(card => card.pairFound === PAIR_FOUND)){
      openControl('end')
    }
  }, [gameState]);

  return (
    <>
      <Score
        gameRunning={gameRunning}
        pairsFound={gameState.filter(card => card.pairFound === PAIR_FOUND).length/2}
        openControl={openControl}
        timer={timer}
      />
      <div className='cards-container'>
        {gameState.map(card => 
          <RotatingCard key={card.id} {...card} handleClick={handleClick} />
        )}
      </div>
      <ControlScreen isOpen={controlIsOpen} state={controlState} onClose={closeControl} topScores={storage} />
    </>
  )
}

export default App
