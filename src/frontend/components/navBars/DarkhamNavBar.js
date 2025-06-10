import * as React from "react";
import SubNavBar from "./SubNavBar";

export default function DarkhamNavBar() {
    return <SubNavBar basePath="darkham" items={[
        { path: "downloads", name: "Downloads" },
        { path: "card-image-gallery", name: "Player Cards" }
    ]} />;
}
