"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Resource = void 0;
var DelegatesToResource_1 = require("./DelegatesToResource");
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource(object) {
        var _this = _super.call(this, object) || this;
        _this.data = _this.toArray();
        return _this.data;
    }
    Resource.collection = function (array) {
        var _this = this;
        array = array || [];
        var collection = array.data ? array.data : array;
        var data = collection.map(function (item) { return new _this(item); });
        if (array.data) {
            return Object.assign({}, array, {
                data: data
            });
        }
        return data;
    };
    Resource.prototype.toArray = function () {
        return Object.assign({}, this.resource);
    };
    return Resource;
}(DelegatesToResource_1.DelegatesToResource));
exports.Resource = Resource;
