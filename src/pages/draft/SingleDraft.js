import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import "./SingleDraft.scss";

export default function SingleDraft() {
    const { draftId } = useParams();

    const [draft, setDraft] = useState(null);
    useEffect(getDraft, []);

    return (
        <>
            <title>Draft · Terra 2170</title>
            <main className="single-draft-page">
                <h1>Drafting!</h1>
                {!draft ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <p>{draft.id}</p>
                        <p>{draft.statusName}</p>
                        <button onClick={startDraft}>Start the draft!</button>
                    </>
                )}
            </main>
        </>
    );

    function getDraft() {
        fetch(`/api/drafts/${draftId}`)
            .then((response) => {
                if (!response.ok) {
                    throw "Response not ok";
                }
                return response.json();
            })
            .then((responseDraft) => {
                setDraft(responseDraft);
            })
            .catch(() => {
                // TODO error handling
            });
    }

    function startDraft() {
        fetch(`/api/drafts/start/${draftId}`, { method: "POST" })
            .then((response) => {
                if (!response.ok) {
                    throw "Response not ok";
                }
                getDraft();
            })
            .catch(() => {
                // TODO error handling
            });
    }
}
