"use strict";
exports.__esModule = true;
exports.DelegatesToResource = void 0;
var DelegatesToResource = /** @class */ (function () {
    function DelegatesToResource(resource) {
        if (!(resource instanceof Object)) {
            resource = {};
        }
        this.resource = resource;
        this.proxy = new Proxy(this, {
            get: function (target, property) {
                if (target[property]) {
                    return target[property];
                }
                if (resource[property]) {
                    return resource[property];
                }
                return undefined;
            }
        });
        return this.proxy;
    }
    return DelegatesToResource;
}());
exports.DelegatesToResource = DelegatesToResource;
