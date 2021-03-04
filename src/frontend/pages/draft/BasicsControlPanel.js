import React, { useEffect } from "react";
import * as CookieHelper from "../../helpers/CookieHelper.js";
import whiteManaSymbol from "../../../../data/whiteManaSymbol.svg";
import blueManaSymbol from "../../../../data/blueManaSymbol.svg";
import blackManaSymbol from "../../../../data/blackManaSymbol.svg";
import redManaSymbol from "../../../../data/redManaSymbol.svg";
import greenManaSymbol from "../../../../data/greenManaSymbol.svg";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import "./BasicsControlPanel.scss";

export function BasicsControlPanel({ draftId, basicsLoaded, setBasicsLoaded, basics, setBasics }) {
    const cookieName = `draft-${draftId}-lands`;
    useEffect(getLandsFromCookie, []);

    return (
        <div className="basics-control-panel">
            Basic lands:
            <BasicLandControl iconUrl={whiteManaSymbol} landState={basics.plains} setLandState={setPlains} />
            <BasicLandControl iconUrl={blueManaSymbol} landState={basics.islands} setLandState={setIslands} />
            <BasicLandControl iconUrl={blackManaSymbol} landState={basics.swamps} setLandState={setSwamps} />
            <BasicLandControl iconUrl={redManaSymbol} landState={basics.mountains} setLandState={setMountains} />
            <BasicLandControl iconUrl={greenManaSymbol} landState={basics.forests} setLandState={setForests} />
        </div>
    );

    function getLandsFromCookie() {
        if (!basicsLoaded) {
            const cookieBasics = CookieHelper.get(cookieName, {
                plains: 0,
                islands: 0,
                swamps: 0,
                mountains: 0,
                forests: 0,
            });
            setBasics(cookieBasics);
            setBasicsLoaded(true);
        }
    }

    function updateCookie() {
        CookieHelper.set(cookieName, basics);
    }

    function setPlains(num) {
        basics.plains = num;
        setBasics({
            ...basics,
        });
        updateCookie();
    }

    function setIslands(num) {
        basics.islands = num;
        setBasics({
            ...basics,
        });
        updateCookie();
    }

    function setSwamps(num) {
        basics.swamps = num;
        setBasics({
            ...basics,
        });
        updateCookie();
    }

    function setMountains(num) {
        basics.mountains = num;
        setBasics({
            ...basics,
        });
        updateCookie();
    }

    function setForests(num) {
        basics.forests = num;
        setBasics({
            ...basics,
        });
        updateCookie();
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
