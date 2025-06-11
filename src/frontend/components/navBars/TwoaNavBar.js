import * as React from "react";
import SubNavBar from "./SubNavBar";

export default function TwoaNavBar() {
    return <SubNavBar basePath="twoa" items={[
        { path: "downloads", name: "Downloads" },
        { path: "investigators", name: "Investigators" }
    ]} />;
}
