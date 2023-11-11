import React, { useState } from "react";
import axios from 'axios'
import Card from "./Card";




const Deck = () => {
    const [deckId, setDeckId] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [currentCardIdx, setCurrentCardIdx] = useState(0);
    const currentCard = deckOfCards[currentCardIdx];
    

    const newDeck = () => {
        try {
            const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const { deck_id, remaining } = response.data;
            setDeckId(deck_id);
            setRemaining(remaining);
        } catch (error) {
            console.error('Error creating new deck', error);
        }
    };
 
    const nextCard = async() => {
        setCurrentCardIdx((prevIdx) => (prevIdx + 1) % deckOfCards.length);
    };

    return (
        <div>
            <h2> Card Deck</h2>
            <Card card={currentCard} />
            <button onClick={nextCard}>Next Card</button>
        </div>
    );
};

export default Deck;