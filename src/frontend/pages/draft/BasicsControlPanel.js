import React, { useEffect } from "react";
import * as CookieHelper from "../../helpers/CookieHelper.js";
import whiteManaSymbol from "../../../../data/whiteManaSymbol.svg";
import blueManaSymbol from "../../../../data/blueManaSymbol.svg";
import blackManaSymbol from "../../../../data/blackManaSymbol.svg";
import redManaSymbol from "../../../../data/redManaSymbol.svg";
import greenManaSymbol from "../../../../data/greenManaSymbol.svg";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

export function BasicsControlPanel({
    draftId,
    numberOfPlains,
    setNumberOfPlains,
    numberOfIslands,
    setNumberOfIslands,
    numberOfSwamps,
    setNumberOfSwamps,
    numberOfMountains,
    setNumberOfMountains,
    numberOfForests,
    setNumberOfForests,
    landsLoaded,
    setLandsLoaded,
}) {
    const cookieName = `draft-${draftId}-lands`;
    useEffect(getLandsFromCookie, []);

    return (
        <div className="basics-control-panel">
            Basic lands:
            <BasicLandControl iconUrl={whiteManaSymbol} landState={numberOfPlains} setLandState={setPlains} />
            <BasicLandControl iconUrl={blueManaSymbol} landState={numberOfIslands} setLandState={setIslands} />
            <BasicLandControl iconUrl={blackManaSymbol} landState={numberOfSwamps} setLandState={setSwamps} />
            <BasicLandControl iconUrl={redManaSymbol} landState={numberOfMountains} setLandState={setMountains} />
            <BasicLandControl iconUrl={greenManaSymbol} landState={numberOfForests} setLandState={setForests} />
        </div>
    );

    function getLandsFromCookie() {
        if (!landsLoaded) {
            const cookieLands = CookieHelper.get(cookieName, [0, 0, 0, 0, 0]);
            setNumberOfPlains(cookieLands[0]);
            setNumberOfIslands(cookieLands[1]);
            setNumberOfSwamps(cookieLands[2]);
            setNumberOfMountains(cookieLands[3]);
            setNumberOfForests(cookieLands[4]);
            setLandsLoaded(true);
        }
    }

    function updateCookie(landArray) {
        CookieHelper.set(cookieName, landArray);
    }

    function setPlains(num) {
        updateCookie([num, numberOfIslands, numberOfSwamps, numberOfMountains, numberOfForests]);
        setNumberOfPlains(num);
    }

    function setIslands(num) {
        updateCookie([numberOfPlains, num, numberOfSwamps, numberOfMountains, numberOfForests]);
        setNumberOfIslands(num);
    }

    function setSwamps(num) {
        updateCookie([numberOfPlains, numberOfIslands, num, numberOfMountains, numberOfForests]);
        setNumberOfSwamps(num);
    }

    function setMountains(num) {
        updateCookie([numberOfPlains, numberOfIslands, numberOfSwamps, num, numberOfForests]);
        setNumberOfMountains(num);
    }

    function setForests(num) {
        updateCookie([numberOfPlains, numberOfIslands, numberOfSwamps, numberOfMountains, num]);
        setNumberOfForests(num);
    }
}

function BasicLandControl({ iconUrl, landState, setLandState }) {
    return (
        <div className="basic-control">
            <button onClick={() => setLandState(landState - 1)} disabled={landState <= 0}>
                <MdRemoveCircleOutline />
            </button>
            <div className="symbol-div">
                <img src={iconUrl} className={landState > 0 ? "fade" : ""} />
                {landState > 0 ? landState : ""}
            </div>
            <button onClick={() => setLandState(landState + 1)}>
                <MdAddCircleOutline />
            </button>
        </div>
    );
}
