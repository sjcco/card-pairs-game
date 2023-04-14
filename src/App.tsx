import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RotatingCard from './Card'
import Score from './Score'

const shuffle = (array: any[]) => {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

const fotoApi = 'https://picsum.photos/v2/list?limit=100';
const PAIR_FOUND = 'pair-found';
const TOTAL_CARDS = 10;

interface CardProps {
  id: number;
  clicked: string;
  pairFound: string;
  background: string;
}

function App() {
  const [gameState, setGameState] = useState<CardProps[]>([])
  const [turnedCard, setTurnedCard] = useState<{background: string, id: number}>();
  const [gameRunning, setGameRunning] = useState<boolean>(false);

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
    fetch(fotoApi).then(res => res.json())
      .then(data => {
        let backgrounds = data.map((foto: any) => foto.download_url)
        backgrounds = shuffle(backgrounds).slice(0, TOTAL_CARDS)
        
        let cardSetup: CardProps[] = [];
        backgrounds.forEach((background: string) => {
          cardSetup.push({
            id: !cardSetup.length ? 0 : cardSetup[cardSetup.length -1].id + 1,
            clicked: '',
            pairFound: '',
            background: background
          })
          cardSetup.push({
            id: cardSetup[cardSetup.length -1].id + 1,
            clicked: '',
            pairFound: '',
            background: background
          })
        });
        setGameState(shuffle(cardSetup));
      })
  }, []);

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

  return (
    <>
      <Score gameRunning={gameRunning} pairsFound={gameState.filter(card => card.pairFound === PAIR_FOUND).length/2}/>
      <div className='cards-container'>
        {gameState.map(card => 
          <RotatingCard key={card.id} {...card} handleClick={handleClick} />
        )}
      </div>
    </>
  )
}

export default App
