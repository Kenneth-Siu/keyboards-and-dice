import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DRAFT_STATUSES } from "../../../config";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import { getCard } from "../../../shared/cardList";
import "./SingleDraft.scss";

export default function SingleDraft() {
    const { draftId } = useParams();

    const [draft, setDraft] = useState(null);
    const [booster, setBooster] = useState(null);
    const [cards, setCards] = useState([]);
    const [busy, setBusy] = useState(true);
    useEffect(getDraft, []);

    return (
        <>
            <title>Draft · Terra 2170</title>
            <main className="single-draft-page">
                <h1>Draft{booster ? ` — Pack ${booster.packNumber} Pick ${booster.pickNumber}` : ""}</h1>
                {busy ? <LoadingSpinner /> : booster ? boosterView() : readyToStartView()}
            </main>
        </>
    );

    function boosterView() {
        return (
            <>
                <div className="booster">
                    {cards.map((card) => (
                        <img className="card" src={card.imageName} key={card.id} loading="lazy" />
                    ))}
                </div>
            </>
        );
    }

    function readyToStartView() {
        return (
            <>
                <p>{draft.id}</p>
                <p>{draft.statusName}</p>
                <button onClick={startDraft}>Start the draft!</button>
            </>
        );
    }

    function getDraft() {
        setBusy(true);
        fetch(`/api/drafts/${draftId}`)
            .then((response) => {
                if (!response.ok) {
                    throw "Response not ok";
                }
                return response.json();
            })
            .then((responseDraft) => {
                setDraft(responseDraft);
                if (responseDraft.status === DRAFT_STATUSES.READY_TO_START) {
                    setBusy(false);
                    return;
                }
                return fetch(`/api/drafts/${draftId}/booster`);
            })
            .then((response) => {
                if (!response.ok) {
                    throw "Response not ok";
                }
                return response.json();
            })
            .then((responseBooster) => {
                setBooster(responseBooster);
                setCards(responseBooster.cards.map((cardId) => getCard(cardId)));
                setBusy(false);
            })
            .catch((err) => {
                // TODO error handling
                setBusy(false);
                console.log(err);
            });
    }

    function startDraft() {
        setBusy(true);
        fetch(`/api/drafts/${draftId}/start`, { method: "POST" })
            .then((response) => {
                if (!response.ok) {
                    throw "Response not ok";
                }
                getDraft();
            })
            .catch((err) => {
                // TODO error handling
                setBusy(false);
                console.log(err);
            });
    }
}
