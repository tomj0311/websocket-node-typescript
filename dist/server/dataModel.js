'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class RequestMessage {
    constructor(payload) {
        let data = JSON.parse(payload);
        if (!data.FromDate || !data.ToDate || !data.Randomize) {
            throw new Error('Invalid message payload received: ' + payload);
        }
        this.data = data;
        console.log(data);
    }
    get FromDate() {
        return this.data.FromDate;
    }
    get ToDate() {
        return this.data.ToDate;
    }
    get Randomize() {
        return this.data.Randomize;
    }
}
exports.RequestMessage = RequestMessage;
//# sourceMappingURL=dataModel.js.map