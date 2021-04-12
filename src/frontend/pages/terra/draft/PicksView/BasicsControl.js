import React from "react";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

export default function BasicLandControl({ icon, landState, setLandState }) {
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