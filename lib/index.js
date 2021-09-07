"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchDeviceDetails = void 0;
const react_1 = __importDefault(require("react"));
const react_query_1 = require("react-query");
const App_1 = __importDefault(require("./App"));
// In order to use react query in our application, we need Query Client
const client = new react_query_1.QueryClient();
// Create a functional component and pass fetchClient object as an input
const FetchDeviceDetails = ({ fetchClient, id }) => {
    return (react_1.default.createElement(react_query_1.QueryClientProvider, { client: client },
        react_1.default.createElement(App_1.default, { fetchClient: fetchClient, id: id })));
};
exports.FetchDeviceDetails = FetchDeviceDetails;
//# sourceMappingURL=index.js.map