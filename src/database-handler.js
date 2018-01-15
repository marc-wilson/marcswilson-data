"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoClient = require("mongodb/lib/mongo_client");
var baseballdb_1 = require("./baseballdb");
var DatabaseHandler = /** @class */ (function () {
    function DatabaseHandler() {
        var _this = this;
        this._mongoUrl = 'mongodb://localhost:27017';
        this.mongoClient = null;
        this.baseballDb = null;
        this.connect().then(function (_client) {
            _this.mongoClient = _client;
            _this.baseballDb = new baseballdb_1.BaseballDb(_this.mongoClient);
        });
    }
    DatabaseHandler.prototype.connect = function () {
        var _this = this;
        console.log('Connecting to mongodb...');
        return new Promise(function (resolve, reject) {
            MongoClient.connect(_this._mongoUrl, function (err, client) {
                if (err) {
                    console.log('Connection Failed...');
                    reject(err);
                }
                else {
                    console.log('Connection successful');
                    resolve(client);
                }
            });
        });
    };
    return DatabaseHandler;
}());
new DatabaseHandler();
//# sourceMappingURL=database-handler.js.map