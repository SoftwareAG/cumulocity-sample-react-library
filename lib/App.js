"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@c8y/client");
const react_1 = __importStar(require("react"));
const react_query_1 = require("react-query");
const App = ({ fetchClient, id }) => {
    // 'name' variable is used to store the updated value of name.
    // setName sets the updated value to the variable 'name'
    const [name, setName] = (0, react_1.useState)('');
    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }
    ;
    // create an instance of inventory service
    const inventory = new client_1.InventoryService(fetchClient);
    // Fetch device details with device id as an input.
    // Refetch the details, once updated
    const getDeviceDetails = () => __awaiter(void 0, void 0, void 0, function* () { return ((yield inventory.detail(id)).data); });
    const { data, refetch } = (0, react_query_1.useQuery)('devices', getDeviceDetails);
    // update the name of the device
    const updateDeviceDetails = (name) => __awaiter(void 0, void 0, void 0, function* () {
        const partialUpdateObject = {
            id: id,
            name: name,
        };
        inventory.update(partialUpdateObject).then((result) => {
            if (result.res.status == 200) {
                refetch();
            }
        });
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null, "This is a demo widget which fetches the device details"),
        react_1.default.createElement("div", null,
            "Device Id ", data === null || data === void 0 ? void 0 :
            data.id),
        react_1.default.createElement("div", null,
            "Name ", data === null || data === void 0 ? void 0 :
            data.name),
        react_1.default.createElement("div", null,
            " Last Updated ", data === null || data === void 0 ? void 0 :
            data.lastUpdated),
        react_1.default.createElement("div", null,
            "Creation Time ", data === null || data === void 0 ? void 0 :
            data.creationTime),
        react_1.default.createElement("input", { onChange: handleChange, type: "text", placeholder: "Enter device name" }),
        react_1.default.createElement("button", { onClick: () => updateDeviceDetails(name) }, "Update Device"),
        react_1.default.createElement("div", null,
            "Updated name : ",
            name)));
};
exports.default = App;
//# sourceMappingURL=App.js.map