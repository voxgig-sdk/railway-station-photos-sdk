"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxStateQueryEntity = void 0;
const RailwayStationPhotosEntityBase_1 = require("../RailwayStationPhotosEntityBase");
// TODO: needs Entity superclass
class InboxStateQueryEntity extends RailwayStationPhotosEntityBase_1.RailwayStationPhotosEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'inbox_state_query';
        this.name_ = 'inbox_state_query';
        this.Name = 'InboxStateQuery';
    }
    make() {
        return new InboxStateQueryEntity(this._client, this.entopts());
    }
}
exports.InboxStateQueryEntity = InboxStateQueryEntity;
//# sourceMappingURL=InboxStateQueryEntity.js.map