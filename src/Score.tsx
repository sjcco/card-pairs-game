import React, { FC, useEffect } from "react";
import useTimer from "./hooks/useTimer";
import './Score.css';

interface ScoreProps {
  pairsFound: number;
  gameRunning: boolean;
}

const Score: FC<ScoreProps> = ({gameRunning, pairsFound}) => {
  const timer = useTimer(gameRunning)
  return <section className="top-bar">
    <nav>
      <div className="score">
        score: <span>{pairsFound}</span>
      </div>
      <div className="timer">
        <span>{timer.hours}</span>:
        <span>{timer.minutes}</span>:
        <span>{timer.seconds}</span>
      </div>
    </nav>
  </section>
  ;
}
 
export default Score;