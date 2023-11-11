import React, { useState } from "react";
import axios from 'axios'
import Card from "./Card";

const Deck = () => {
    const [deckId, setDeckId] = useState(null);
    const [remaining, setRemaining] = useState(0);
    const [currentCard, setCurrentCard] = useState(null);

    const newDeck = async () => {
        try {
            const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const { deck_id, remaining } = response.data;
            setDeckId(deck_id);
            setRemaining(remaining);
            setCurrentCard(null); // Fix here
        } catch (error) {
            console.error('Error creating new deck', error);
        }
    };

    const shuffleDeck = async () => {
        try {
            if (!deckId) {
                alert('Error: Deck not initialized. Click "New Deck" first')
                return;
            }
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
            setRemaining(response.data.remaining);
            setCurrentCard(null);
         }   catch (error) {
            console.error('Error shuffling deck', error );
        }
    };

    const nextCard = async () => {
        try {
            if (!deckId) {
                alert('Error: Deck not initialized. Click "New Deck" first.');
                return;
            }

            if (remaining === 0) {
                alert('Error: no cards remaining');
                return;
            }

            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const { cards, remaining: updatedRemaining } = response.data;
            setCurrentCard(cards[0]);
            setRemaining(updatedRemaining);
        } catch (error) {
            console.error('Error drawing card', error);
        }
    };

    return (
        <div>
            <h2>Card Deck</h2>
            {currentCard && <Card card={currentCard} />}
            <button onClick={newDeck}>New Deck</button>
            <button onClick={nextCard}>Draw Card</button>
            <button onClick={shuffleDeck}> Shuffle Deck</button>
        </div>
    );
};

export default Deck;
