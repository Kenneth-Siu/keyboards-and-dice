import * as React from "react";
import SubNavBar from "./SubNavBar";

export default function StcNavBar() {
    return <SubNavBar basePath="stc" items={[
        { path: "card-image-gallery", name: "Card Image Gallery" },
        { path: "faq", name: "Rules FAQ" },
        { path: "downloads", name: "Downloads" }
    ]} />;
}
