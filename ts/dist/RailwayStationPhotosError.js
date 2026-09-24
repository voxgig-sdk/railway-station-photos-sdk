"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RailwayStationPhotosError = void 0;
class RailwayStationPhotosError extends Error {
    isRailwayStationPhotosError = true;
    sdk = 'RailwayStationPhotos';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.RailwayStationPhotosError = RailwayStationPhotosError;
//# sourceMappingURL=RailwayStationPhotosError.js.map