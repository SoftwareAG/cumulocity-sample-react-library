"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.div `

.heading {
    font-family: cursive;
    font-size: 23px;
 }

div {
    padding: 10px;
}


.key {
    font-weight: bold;
    font-size:17px;
}

.updateButton {
    height: 33px;
    border-color: beige;
    border-radius: 10px;
    cursor: pointer;
    border: solid grey;
}

.inputBox {
    margin: 0px 10px 0px 13px;
    height: 30px;
}
`;
//# sourceMappingURL=App.styles.js.map