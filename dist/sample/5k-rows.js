var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', 'aurelia-v-grid', 'aurelia-v-grid', 'aurelia-v-grid', './utils/dummyDataGenerator'], function (require, exports, aurelia_framework_1, aurelia_v_grid_1, aurelia_v_grid_2, aurelia_v_grid_3, dummyDataGenerator_1) {
    "use strict";
    var Welcome = (function () {
        function Welcome(dummyDataGenerator) {
            var _this = this;
            this.dummyDataGenerator = dummyDataGenerator;
            this.dummyDataGenerator.generateData(5000, function (data) {
                _this.myCollection = data;
            });
            this.ds = new aurelia_v_grid_2.DataSource(new aurelia_v_grid_3.Selection('multiple'));
            this.gridConnector = new aurelia_v_grid_1.GridConnector(this.ds);
            this.ds.setArray(this.myCollection);
        }
        Welcome = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [dummyDataGenerator_1.DummyDataGenerator])
        ], Welcome);
        return Welcome;
    }());
    exports.Welcome = Welcome;
});

//# sourceMappingURL=5k-rows.js.map
