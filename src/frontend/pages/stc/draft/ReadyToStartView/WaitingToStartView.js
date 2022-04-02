import React from "react";

import { RotatingLoadingIcon } from "../../../../components/rotatingLoadingIcon/RotatingLoadingIcon";

export default function WaitingToStartView() {
    return (
        <>
            <p>Waiting for the owner to start the draft...</p>
            <RotatingLoadingIcon />
        </>
    );
}
