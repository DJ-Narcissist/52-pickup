import React from "react";
import './Card.css'

const Card = ({ card }) => {
    return (
        <div className="Card"> 
            <img src={card.image} alt={card.name} />
        </div>
    )
}

export default Card;