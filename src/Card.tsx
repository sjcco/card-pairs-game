import React, { FC, useState } from "react";
import './Card.css';

interface CardProps {
  id: number;
  clicked: string;
  pairFound: string;
  background: string;
  handleClick: (id: number, background: string) => void;
}

const RotatingCard: FC<CardProps> = (props) => {
  const {id, pairFound, background, clicked, handleClick} = props;

  const handleClickEvent = () => {
    if(!pairFound){
      handleClick(id, background)
    }
  }

  return (
    <div className={`card ${clicked}`} data-id={id} onClick={handleClickEvent}>
      <div className={`card-side front ${pairFound}`} data-id={id}>
        <img src={background} alt="" />
      </div>
      <div className="card-side back" data-id={id}>
        
      </div>
    </div>
  );
}
 
export default RotatingCard;