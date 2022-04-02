import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import WhiteManaSymbol from "../../../../../../data/whiteManaSymbol.svg";
import BlueManaSymbol from "../../../../../../data/blueManaSymbol.svg";
import BlackManaSymbol from "../../../../../../data/blackManaSymbol.svg";
import RedManaSymbol from "../../../../../../data/redManaSymbol.svg";
import GreenManaSymbol from "../../../../../../data/greenManaSymbol.svg";

import * as CookieHelper from "../../../../helpers/CookieHelper";
import BasicsControl from "./BasicsControl";
import "./BasicsControlPanel.scss";

export default function BasicsControlPanel({ basics, setBasics }) {
    const { draftId } = useParams();
    const cookieName = `draft-${draftId}-lands`;
    useEffect(getLandsFromCookie, []);

    return (
        basics && (
            <div className="basics-control-panel">
                Basic lands:
                <BasicsControl
                    icon={<WhiteManaSymbol />}
                    landState={basics.plains}
                    setLandState={(num) => setBasicOfType("plains", num)}
                />
                <BasicsControl
                    icon={<BlueManaSymbol />}
                    landState={basics.islands}
                    setLandState={(num) => setBasicOfType("islands", num)}
                />
                <BasicsControl
                    icon={<BlackManaSymbol />}
                    landState={basics.swamps}
                    setLandState={(num) => setBasicOfType("swamps", num)}
                />
                <BasicsControl
                    icon={<RedManaSymbol />}
                    landState={basics.mountains}
                    setLandState={(num) => setBasicOfType("mountains", num)}
                />
                <BasicsControl
                    icon={<GreenManaSymbol />}
                    landState={basics.forests}
                    setLandState={(num) => setBasicOfType("forests", num)}
                />
            </div>
        )
    );

    function getLandsFromCookie() {
        if (!basics) {
            const cookieBasics = CookieHelper.get(cookieName) || {
                plains: 0,
                islands: 0,
                swamps: 0,
                mountains: 0,
                forests: 0,
            };
            setBasics(cookieBasics);
        }
    }

    function setBasicOfType(basicType, num) {
        setBasics((basics) => ({
            ...basics,
            [basicType]: num,
        }));
        CookieHelper.set(cookieName, basics);
    }
}
