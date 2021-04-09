import React, { useEffect } from "react";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

import * as CookieHelper from "../../../../helpers/CookieHelper.js";
import WhiteManaSymbol from "../../../../../../data/whiteManaSymbol.svg";
import BlueManaSymbol from "../../../../../../data/blueManaSymbol.svg";
import BlackManaSymbol from "../../../../../../data/blackManaSymbol.svg";
import RedManaSymbol from "../../../../../../data/redManaSymbol.svg";
import GreenManaSymbol from "../../../../../../data/greenManaSymbol.svg";
import "./BasicsControlPanel.scss";

export function BasicsControlPanel({ basicsLoaded, setBasicsLoaded, basics, setBasics }) {
    const { draftId } = useParams();
    const cookieName = `draft-${draftId}-lands`;
    useEffect(getLandsFromCookie, []);

    return (
        <div className="basics-control-panel">
            Basic lands:
            <BasicLandControl icon={<WhiteManaSymbol />} landState={basics.plains} setLandState={setPlains} />
            <BasicLandControl icon={<BlueManaSymbol />} landState={basics.islands} setLandState={setIslands} />
            <BasicLandControl icon={<BlackManaSymbol />} landState={basics.swamps} setLandState={setSwamps} />
            <BasicLandControl icon={<RedManaSymbol />} landState={basics.mountains} setLandState={setMountains} />
            <BasicLandControl icon={<GreenManaSymbol />} landState={basics.forests} setLandState={setForests} />
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

function BasicLandControl({ icon, landState, setLandState }) {
    return (
        <div className="basic-control">
            <button onClick={() => setLandState(landState - 1)} disabled={landState <= 0}>
                <MdRemoveCircleOutline />
            </button>
            <div className={`symbol-div${landState > 0 ? " fade" : ""}`}>
                {icon}
                <div className="basic-number">{landState > 0 ? landState : ""}</div>
            </div>
            <button onClick={() => setLandState(landState + 1)}>
                <MdAddCircleOutline />
            </button>
        </div>
    );
}
