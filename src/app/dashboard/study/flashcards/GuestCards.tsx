"use client";

export const maxGuestCards = 10; //max amount of flashcards a guest user can have
const guestKey = "guestFlashcards"; //key for an individual gues

export type GuestCard = { //card structure
    id: string;
    front: string;
    back: string;
    section?: string; 
};

export function getGuestCards (): GuestCard[] {  //gets the local storage flashcards
    const raw = localStorage.getItem(guestKey);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    }
    catch {
        return [];
    }
}

export function saveGuestCards(cards: GuestCard[]){ //function that saves a flashcard to an individual guestkey
    localStorage.setItem(guestKey, JSON.stringify(cards));
}

export function createGuestCard(front: string, back: string, section?: string): //function that creates a flashcard
    | { ok: true; cards: GuestCard[]}
    | { ok: false; reason: "limit_reached"} {
    const cards = getGuestCards();
    if(cards.length >= maxGuestCards){
        return { ok: false, reason: "limit_reached"}; //wont create a new flashcard because the set limit is reached
    }
    const newCard: GuestCard = {
        id: Math.random().toString(), //random id
        front,
        back,
        section,
    };

    const updatedCards = [...cards, newCard];
    saveGuestCards(updatedCards);
    return {ok: true, cards: updatedCards};
    }

    export function deleteGuestCard(id: string): GuestCard[]{ //removes a flashcard and saves new updated list into local storage
        const cards = getGuestCards();
        const newList = cards.filter((c) => c.id !== id)
        saveGuestCards(newList);
        return newList;
        
    }

    export function editGuestCard(id: string, front: string, back: string, section?: string): //edit flashcard
    | { ok: true; cards: GuestCard[] }
    | { ok: false; reason: "card_not_found"} { //no id gives error 
        const cards = getGuestCards();
        const exists = cards.some((c) => c.id === id);
        if (!exists){
            return {ok: false, reason: "card_not_found"}
        }
        const editedGuestCard = cards.map((c) => c.id === id ? { //sections that can be edited
            ...c, 
            front, 
            back, 
            section: section ?? c.section,
        } 
        :c
    );
        saveGuestCards(editedGuestCard); //saves updated card to local storage
        return { ok: true, cards: editedGuestCard};
    }

