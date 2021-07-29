import * as React from "react";
import darkhamSplash from "../../../../../data/darkhamSplash.jpg";
import _1 from "../../../../../data/Darkham/Investigators/Reynauld-de-Châtillon-Front-Face.jpg";
import _1a from "../../../../../data/Darkham/Investigators/Reynauld-de-Châtillon-Back-Face.jpg";
import _2 from "../../../../../data/Darkham/Investigators/Audrey-Bourassa-Front-Face.jpg";
import _2a from "../../../../../data/Darkham/Investigators/Audrey-Bourassa-Back-Face.jpg";
import _3 from "../../../../../data/Darkham/Investigators/Sarmentus-Front-Face.jpg";
import _3a from "../../../../../data/Darkham/Investigators/Sarmentus-Back-Face.jpg";
import _4 from "../../../../../data/Darkham/Investigators/Abdul-Alhazred-Front-Face.jpg";
import _4a from "../../../../../data/Darkham/Investigators/Abdul-Alhazred-Back-Face.jpg";
import _5 from "../../../../../data/Darkham/Investigators/Henry-Bigby-Front-Face.jpg";
import _5a from "../../../../../data/Darkham/Investigators/Henry-Bigby-Back-Face.jpg";
import _6 from "../../../../../data/Darkham/Investigators/Beast-Within-Front-Face.jpg";
import _6a from "../../../../../data/Darkham/Investigators/Beast-Within-Back-Face.jpg";
import _7 from "../../../../../data/Darkham/Investigators/The-Long-Crusade-Front-Face.jpg";
import _8 from "../../../../../data/Darkham/Investigators/Thirst-for-Justice-Front-Face.jpg";
import _9 from "../../../../../data/Darkham/Investigators/Shadowlace-Front-Face.jpg";
import _10 from "../../../../../data/Darkham/Investigators/Reclaiming-the-Family-Name-Front-Face.jpg";
import _11 from "../../../../../data/Darkham/Investigators/Finale-Front-Face.jpg";
import _12 from "../../../../../data/Darkham/Investigators/Tyrant's-Enforcer-Front-Face.jpg";
import _13 from "../../../../../data/Darkham/Investigators/Mentor's-Skull-Front-Face.jpg";
import _14 from "../../../../../data/Darkham/Investigators/Damnation's-Gift-Front-Face.jpg";
import _15 from "../../../../../data/Darkham/Investigators/Osmond-Chains-Front-Face.jpg";
import _16 from "../../../../../data/Darkham/PlayerCards/Guardian/The-Hungering-Blade-Front-Face.jpg";
import _17 from "../../../../../data/Darkham/PlayerCards/Guardian/Bloodlust-Front-Face.jpg";
import _18 from "../../../../../data/Darkham/PlayerCards/Guardian/Overtime-Front-Face.jpg";
import _19 from "../../../../../data/Darkham/PlayerCards/Guardian/Overworked-Front-Face.jpg";
import _20 from "../../../../../data/Darkham/PlayerCards/Guardian/Partner-In-Crime-Front-Face.jpg";
import _21 from "../../../../../data/Darkham/PlayerCards/Guardian/Partner-In-Crime-3-Front-Face.jpg";
import _22 from "../../../../../data/Darkham/PlayerCards/Seeker/Forgotten-Mirror-unidentified-Front-Face.jpg";
import _23 from "../../../../../data/Darkham/PlayerCards/Seeker/Forgotten-Mirror-pillar-of-strength-Front-Face.jpg";
import _24 from "../../../../../data/Darkham/PlayerCards/Seeker/Forgotten-Mirror-pools-of-contemplation-Front-Face.jpg";
import _25 from "../../../../../data/Darkham/PlayerCards/Seeker/Forgotten-Mirror-port-of-calm-Front-Face.jpg";
import _26 from "../../../../../data/Darkham/PlayerCards/Seeker/Beyond-Space-and-Time-Front-Face.jpg";
import _27 from "../../../../../data/Darkham/PlayerCards/Seeker/Guidance-Front-Face.jpg";
import _28 from "../../../../../data/Darkham/PlayerCards/Seeker/Overthinking-It-Front-Face.jpg";
import _29 from "../../../../../data/Darkham/PlayerCards/Rogue/Celebration-Drinks-Front-Face.jpg";
import _30 from "../../../../../data/Darkham/PlayerCards/Rogue/Hangover-Front-Face.jpg";
import _31 from "../../../../../data/Darkham/PlayerCards/Rogue/Henry-Wan-Front-Face.jpg";
import _32 from "../../../../../data/Darkham/PlayerCards/Rogue/Moirai-Shroud-Front-Face.jpg";
import _33 from "../../../../../data/Darkham/PlayerCards/Rogue/On-a-Roll-Front-Face.jpg";
import _34 from "../../../../../data/Darkham/PlayerCards/Mystic/Dance-of-Sarnath-Front-Face.jpg";
import _35 from "../../../../../data/Darkham/PlayerCards/Mystic/Deal-with-Devils-Front-Face.jpg";
import _36 from "../../../../../data/Darkham/PlayerCards/Mystic/Devil-Collector-Front-Face.jpg";
import _37 from "../../../../../data/Darkham/PlayerCards/Mystic/Lifecycle-Front-Face.jpg";
import _38 from "../../../../../data/Darkham/PlayerCards/Mystic/Quantum-Flux-Front-Face.jpg";
import _39 from "../../../../../data/Darkham/PlayerCards/Survivor/Fate's-Child-Front-Face.jpg";
import _40 from "../../../../../data/Darkham/PlayerCards/Survivor/Happier-Times-Front-Face.jpg";
import _41 from "../../../../../data/Darkham/PlayerCards/Survivor/Troubling-Memories-Front-Face.jpg";
import _42 from "../../../../../data/Darkham/PlayerCards/Survivor/Infighting-Front-Face.jpg";
import _43 from "../../../../../data/Darkham/PlayerCards/Survivor/Lucky-Horseshoe-Front-Face.jpg";
import _44 from "../../../../../data/Darkham/PlayerCards/BasicWeaknesses/Celestial-Alignment-Front-Face.jpg";
import _45 from "../../../../../data/Darkham/PlayerCards/BasicWeaknesses/Astral-Alignment-Front-Face.jpg";
import _46 from "../../../../../data/Darkham/PlayerCards/BasicWeaknesses/Lunar-Alignment-Front-Face.jpg";
import _47 from "../../../../../data/Darkham/PlayerCards/BasicWeaknesses/Solar-Alignment-Front-Face.jpg";
import _48 from "../../../../../data/Darkham/PlayerCards/BasicWeaknesses/Delusions-Front-Face.jpg";
import "./CardImageGallery.scss";
import CardImage from "../../../components/cardImages/CardImage";

export default function Darkham() {
    return (
        <>
            <title>Card Image Gallery · Darkham Horror · Keyboards &amp; Dice</title>
            <main className="darkham-card-image-gallery">
                <div className="background-image-container">
                    <img className="background-image" src={darkhamSplash} />
                </div>
                <div className="container">
                    <h1>Card Image Gallery</h1>
                    <h2>Investigators</h2>
                    <section className="investigators">
                        <div className="investigators-grid">
                            <CardImage src={_1} lazy className="landscape" />
                            <CardImage src={_1a} lazy />
                        </div>
                        <div className="card-grid">
                            <CardImage src={_7} lazy />
                            <CardImage src={_8} lazy />
                        </div>
                        <div className="investigators-grid">
                            <CardImage src={_2} lazy />
                            <CardImage src={_2a} lazy />
                        </div>
                        <div className="card-grid">
                            <CardImage src={_9} lazy />
                            <CardImage src={_10} lazy />
                        </div>
                        <div className="investigators-grid">
                            <CardImage src={_3} lazy />
                            <CardImage src={_3a} lazy />
                        </div>
                        <div className="card-grid">
                            <CardImage src={_11} lazy />
                            <CardImage src={_12} lazy />
                        </div>
                        <div className="investigators-grid">
                            <CardImage src={_4} lazy />
                            <CardImage src={_4a} lazy />
                        </div>
                        <div className="card-grid">
                            <CardImage src={_13} lazy />
                        </div>
                        <div className="investigators-grid">
                            <CardImage src={_5} lazy />
                            <CardImage src={_5a} lazy />
                            <CardImage src={_6} lazy />
                            <CardImage src={_6a} lazy />
                        </div>
                        <div className="card-grid">
                            <CardImage src={_14} lazy />
                            <CardImage src={_15} lazy />
                        </div>
                    </section>
                    <h2>Guardian</h2>
                    <section className="card-grid">
                        <CardImage src={_16} lazy />
                        <CardImage src={_17} lazy />
                        <CardImage src={_18} lazy />
                        <CardImage src={_19} lazy />
                        <CardImage src={_20} lazy />
                        <CardImage src={_21} lazy />
                    </section>
                    <h2>Seeker</h2>
                    <section className="card-grid">
                        <CardImage src={_22} lazy />
                        <CardImage src={_23} lazy />
                        <CardImage src={_24} lazy />
                        <CardImage src={_25} lazy />
                        <CardImage src={_26} lazy />
                        <CardImage src={_27} lazy />
                        <CardImage src={_28} lazy />
                    </section>
                    <h2>Rogue</h2>
                    <section className="card-grid">
                        <CardImage src={_29} lazy />
                        <CardImage src={_30} lazy />
                        <CardImage src={_31} lazy />
                        <CardImage src={_32} lazy />
                        <CardImage src={_33} lazy />
                    </section>
                    <h2>Mystic</h2>
                    <section className="card-grid">
                        <CardImage src={_34} lazy />
                        <CardImage src={_35} lazy />
                        <CardImage src={_36} lazy />
                        <CardImage src={_37} lazy />
                        <CardImage src={_38} lazy />
                    </section>
                    <h2>Survivor</h2>
                    <section className="card-grid">
                        <CardImage src={_39} lazy />
                        <CardImage src={_40} lazy />
                        <CardImage src={_41} lazy />
                        <CardImage src={_42} lazy />
                        <CardImage src={_43} lazy />
                    </section>
                    <h2>Basic Weaknesses</h2>
                    <section className="card-grid">
                        <CardImage src={_44} lazy />
                        <CardImage src={_45} lazy />
                        <CardImage src={_46} lazy />
                        <CardImage src={_47} lazy />
                        <CardImage src={_48} lazy />
                    </section>
                </div>
            </main>
        </>
    );
}
