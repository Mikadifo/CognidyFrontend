"use client";

export const maxGuestCards = 10;
const guestKey = "guestFlashcards";

export type GuestCard = {
    id: string;
    front: string;
    back: string;
};

export function getGuestCards (): GuestCard[] {
    const raw = localStorage.getItem(guestKey);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    }
    catch {
        return [];
    }
}

export function saveGuestCards(cards: GuestCard[]){
    localStorage.setItem(guestKey, JSON.stringify(cards));
}

export function createGuestCard(front: string, back: string):
    | { ok: true; cards: GuestCard[]}
    | { ok: false; reason: "limit_reached"} {
    const cards = getGuestCards();
    if(cards.length >= maxGuestCards){
        return { ok: false, reason: "limit_reached"};
    }
    const newCard: GuestCard = {
        id: Math.random().toString(),
        front,
        back,
    };

    const updatedCards = [...cards, newCard];
    saveGuestCards(updatedCards);
    return {ok: true, cards: updatedCards};
    }

    export function deleteGuestCard(id: string): GuestCard[]{
        const cards = getGuestCards();
        const newList = cards.filter((c) => c.id !== id)
        saveGuestCards(newList);
        return newList;
        
    }

    export function editGuestCard(id: string, front: string, back: string):
    | { ok: true; cards: GuestCard[] }
    | { ok: false; reason: "card_not_found"} {
        const cards = getGuestCards();
        const exists = cards.some((c) => c.id === id);
        if (!exists){
            return {ok: false, reason: "card_not_found"}
        }
        const editedGuestCard = cards.map((c) => c.id === id ? {...c, front, back} :c)
        saveGuestCards(editedGuestCard);
        return { ok: true, cards: editedGuestCard};
    }

