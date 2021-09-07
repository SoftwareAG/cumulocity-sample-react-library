import { FetchClient } from "@c8y/client";
import React from "react";
declare type Props = {
    fetchClient: FetchClient;
    id: string;
};
export declare type DeviceItem = {
    id: string;
    creationTime: string;
    lastUpdated: string;
    name: string;
};
declare const App: React.FC<Props>;
export default App;
//# sourceMappingURL=App.d.ts.map