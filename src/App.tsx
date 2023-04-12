import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RotatingCard from './Card'

interface CardProps {
  id: number;
  clicked: string;
  pairFound: string;
  background: string;
}

const initialState = [
  {
    id: 0,
    clicked: '',
    pairFound: '',
    background: 'hola'
  },
  {
    id: 1,
    clicked: '',
    pairFound: '',
    background: 'bye'
  },
  {
    id: 2,
    clicked: '',
    pairFound: '',
    background: 'bye'
  },
  {
    id: 3,
    clicked: '',
    pairFound: '',
    background: 'bye'
  },
  {
    id: 4,
    clicked: '',
    pairFound: '',
    background: 'bye'
  }
]

function App() {
  const [gameState, setGameState] = useState<CardProps[]>(initialState)
  const [turnedCard, setTurnedCard] = useState<{background: string, id: number}>();

  const handleClick = (id:number, background: string) => {
    setGameState(prev => prev.map(card => {
      if(card.id === id) {
        return {
          ...card,
          clicked: card.clicked === '' ? 'clicked' : '',
        }
      } else {
        return card
      }
    }))
    setTurnedCard(prev => prev === undefined ? {background, id} : undefined )
  }

  useEffect(() => {
    console.log('turnedCard :>> ', turnedCard);
    let turnedCards = gameState.filter(card => card.clicked)
    if(turnedCards.length > 1){
      console.log('omg');
    }
  }, [turnedCard]);

  return (
      <div className='cards-container'>
        {gameState.map(card => 
          <RotatingCard key={card.id} {...card} handleClick={handleClick} />
        )}
      </div>
  )
}

export default App
