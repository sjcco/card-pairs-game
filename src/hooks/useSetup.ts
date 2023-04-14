import React, { useEffect, useState } from "react";
import { CardProps } from "../interfaces";

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

const TOTAL_CARDS = 10;

const useSetup = (refreshGame: boolean) => {
  const [gameState, setGameState] = useState<CardProps[]>([]);
  const [gameReady, setGameReady] = useState<boolean>(false);

  useEffect(() => {
    setGameReady(false)
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
        setGameReady(true)
      })
  }, [refreshGame]);

  return {gameState, setGameState, gameReady};
}
 
export default useSetup;
  
