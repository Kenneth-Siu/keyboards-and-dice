import React, { useState } from "react";
import WhiteManaSymbol from "../../../../../data/whiteManaSymbol.svg";
import BlueManaSymbol from "../../../../../data/blueManaSymbol.svg";
import BlackManaSymbol from "../../../../../data/blackManaSymbol.svg";
import RedManaSymbol from "../../../../../data/redManaSymbol.svg";
import GreenManaSymbol from "../../../../../data/greenManaSymbol.svg";
import stcMainSplash from "../../../../../data/stcMainSplash.jpg";
import "./Archetypes.scss";

export default function Rankings() {
    const [wuExpanded, setWuExpanded] = useState(false);
    const [ubExpanded, setUbExpanded] = useState(false);
    const [brExpanded, setBrExpanded] = useState(false);
    const [rgExpanded, setRgExpanded] = useState(false);
    const [gwExpanded, setGwExpanded] = useState(false);
    const [wbExpanded, setWbExpanded] = useState(false);
    const [urExpanded, setUrExpanded] = useState(false);
    const [bgExpanded, setBgExpanded] = useState(false);
    const [rwExpanded, setRwExpanded] = useState(false);
    const [guExpanded, setGuExpanded] = useState(false);

    const archetypes = [
        {
            colors: (
                <>
                    <WhiteManaSymbol />
                    <BlueManaSymbol />
                </>
            ),
            expanded: wuExpanded,
            setExpanded: setWuExpanded,
            name: "Blink",
            role: "Control",
            description:
                "Reuse over and over the enter-the-battlefield triggers of your creatures for tempo or card advantage, whichever you need at the moment.",
        },
        {
            colors: (
                <>
                    <BlueManaSymbol />
                    <BlackManaSymbol />
                </>
            ),
            expanded: ubExpanded,
            setExpanded: setUbExpanded,
            name: "Infiltrate",
            role: "Tempo/Control",
            description:
                "Keep the opponent off-balance while your assassins and saboteurs slowly accrue value chipping away at the opponent's life total.",
        },
        {
            colors: (
                <>
                    <BlackManaSymbol />
                    <RedManaSymbol />
                </>
            ),
            expanded: brExpanded,
            setExpanded: setBrExpanded,
            name: "Artifact Sacrifice",
            role: "Aggro/Control",
            description:
                "Get a head start early, then use your pressure and sacrifice effects to control the board and deal the final few points of damage.",
        },
        {
            colors: (
                <>
                    <RedManaSymbol />
                    <GreenManaSymbol />
                </>
            ),
            expanded: rgExpanded,
            setExpanded: setRgExpanded,
            name: "Combat Tricks",
            role: "Aggro/Combo",
            description:
                "Put together creatures that benefit from attacking and nomads who benefit from being targeted to run over your opponent with surprising bursts of damage.",
        },
        {
            colors: (
                <>
                    <GreenManaSymbol />
                    <WhiteManaSymbol />
                </>
            ),
            expanded: gwExpanded,
            setExpanded: setGwExpanded,
            name: "Tokens",
            role: "Midrange/Combo",
            description: "Swarm the opponent with little creatures that team up to achieve great things.",
        },
        {
            colors: (
                <>
                    <WhiteManaSymbol />
                    <BlackManaSymbol />
                </>
            ),
            expanded: wbExpanded,
            setExpanded: setWbExpanded,
            name: "Lifegain Aristocrats",
            role: "Midrange/Control",
            description: "White gains life, black spends life. White makes creatures, black sacrifices creatures.",
        },
        {
            colors: (
                <>
                    <BlueManaSymbol />
                    <RedManaSymbol />
                </>
            ),
            expanded: urExpanded,
            setExpanded: setUrExpanded,
            name: "Artifact Teleport",
            role: "Midrange",
            description:
                "The colors that love artifacts and teleport the most, they come together to make efficient threats and consistent value.",
        },
        {
            colors: (
                <>
                    <BlackManaSymbol />
                    <GreenManaSymbol />
                </>
            ),
            expanded: bgExpanded,
            setExpanded: setBgExpanded,
            name: "Creature Sacrifice",
            role: "Midrange",
            description: "A creature value deck. Reconstitute and tokens make for plentiful sacrificial fodder.",
        },
        {
            colors: (
                <>
                    <RedManaSymbol />
                    <WhiteManaSymbol />
                </>
            ),
            expanded: rwExpanded,
            setExpanded: setRwExpanded,
            name: "Equipment",
            role: "Aggro/Midrange",
            description:
                "Play creatures and equip them. In the late game, use your equipment to suit up enormous attackers and keep the pressure on.",
        },
        {
            colors: (
                <>
                    <GreenManaSymbol />
                    <BlueManaSymbol />
                </>
            ),
            expanded: guExpanded,
            setExpanded: setGuExpanded,
            name: "Flash",
            role: "Control",
            description:
                "Never tap out again! Combine instants with repeatable activated abilities to keep the cards flowing and your opponent guessing.",
        },
    ];

    function getRow(archetype) {
        return (
            <tr key={archetype.name}>
                <td className="colors">{archetype.colors}</td>
                <td className={`archetype-description ${archetype.expanded ? "" : "collapsed"}`}>
                    <button onClick={() => archetype.setExpanded(!archetype.expanded)}>
                        <div className="arrow">{archetype.expanded ? "▾" : "▸"}</div>
                        <div className="text">
                            <h2>{archetype.name}</h2>
                            <small>({archetype.role})</small>
                        </div>
                    </button>
                    <p>{archetype.description}</p>
                </td>
            </tr>
        );
    }

    return (
        <>
            <title>Archetypes · Space the Convergence</title>
            <main className="archetypes-page">
                <div className="background-image-container">
                    <img className="background-image" src={stcMainSplash} />
                </div>
                <div className="container">
                    <h1>Archetypes</h1>
                    <table>
                        <tbody>{archetypes.map(getRow)}</tbody>
                    </table>
                </div>
            </main>
        </>
    );
}
