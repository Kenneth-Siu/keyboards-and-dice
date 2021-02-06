import Card from "./Card.js";
import rawCardList from "../../data/rawCardList.js";

const cardList = rawCardList.map(rawCard => new Card(rawCard)).sort((a, b) => a.id - b.id);

export default cardList;
