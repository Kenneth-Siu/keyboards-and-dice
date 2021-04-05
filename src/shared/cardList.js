import Card from "./Card.js";
import rawCardList from "../../data/rawCardList.js";

const cardList = rawCardList.map((rawCard) => new Card(rawCard)).sort((a, b) => a.cardId - b.cardId);
export default cardList;

export function getCard(cardId) {
    return cardList.find((card) => card.cardId === cardId);
}
