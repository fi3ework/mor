"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_react_1 = require("mobx-react");
var React = require("react");
function withMobx(model) {
    return function (ComposedComponent) {
        var HOC = /** @class */ (function (_super) {
            __extends(HOC, _super);
            function HOC() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.injectedProps = {};
                return _this;
            }
            // private hasInited: boolean = false
            HOC.prototype.componentWillReact = function () {
                console.log('will react');
            };
            HOC.prototype.basePreRender = function () {
                var _this = this;
                var _a = model.obModel, obState = _a.obState, obComputed = _a.obComputed, boundAction = _a.boundAction;
                // ob state
                Object.keys(obState).forEach(function (prop) {
                    /* tslint:disable */
                    _this.injectedProps[prop] = obState[prop];
                });
                // ob computed
                var obComputedSnap = obComputed.get();
                Object.keys(obComputedSnap).forEach(function (prop) {
                    _this.injectedProps[prop] = obComputedSnap[prop];
                });
                // ob actions
                // debugger
                Object.keys(boundAction).forEach(function (actionKey) {
                    _this.injectedProps[actionKey] = boundAction[actionKey];
                });
            };
            HOC.prototype.render = function () {
                console.log('> render');
                this.basePreRender();
                console.log(this.injectedProps);
                return React.createElement(ComposedComponent, __assign({}, this.props, this.injectedProps));
            };
            HOC = __decorate([
                mobx_react_1.observer
            ], HOC);
            return HOC;
        }(React.Component));
        return HOC;
    };
}
exports.default = withMobx;
//# sourceMappingURL=withMobx.js.map