export function getDefaultRowColumnForCard(card) {
    const row = card.type.includes("Creature") ? 0 : 1;
    const column = card.manaValue === 0 ? 7 : Math.min(6, card.manaValue - 1);
    return `deckRow${row}Column${column}`;
}

export function getDraftCookieName(draftId) {
    return `draft-${draftId}-cards`;
}
