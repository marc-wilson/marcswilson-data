"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var download = require("download-git-repo");
var BaseballDb = /** @class */ (function () {
    function BaseballDb(_mongoClient) {
        var _this = this;
        this._mongoClient = _mongoClient;
        this.mongoClient = null;
        this.repository = null;
        this.mongoClient = _mongoClient;
        this.cloneRepository().then(function (_repo) {
            _this.repository = _repo;
        }, function (error) {
            console.log(error);
        });
    }
    BaseballDb.prototype.cloneRepository = function () {
        var _this = this;
        console.log('Removing repo...');
        return new Promise(function (resolve, reject) {
            _this.removeRepoDirectory().then(function (res) {
                if (res) {
                    console.log('Repo removed successfully');
                    console.log('Cloning baseballdatabank...');
                    download('chadwickbureau/baseballdatabank', 'baseballdatabank', function (err) {
                        if (!err) {
                            console.log('Repo has been cloned');
                            resolve(true);
                        }
                        else {
                            reject(err);
                            console.error('Repo could not be cloned!');
                        }
                    });
                }
                else {
                    reject(null);
                }
            });
        });
    };
    BaseballDb.prototype.removeRepoDirectory = function () {
        return new Promise(function (resolve, reject) {
            fs.remove('baseballdatabank', function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    BaseballDb.prototype.generateTableNames = function () {
        var _this = this;
        var ret = [];
        return new Promise(function (resolve, reject) {
            fs.readdir('baseballdatabank/core', function (err, files) {
                if (!err) {
                    for (var i = 0; i < files.length; i++) {
                        var fileName = files[i].toLowerCase();
                        if (fileName.endsWith('.csv')) {
                            fileName = fileName.replace('.csv', '');
                            if (!fileName.endsWith('s')) {
                                fileName += 's';
                            }
                            ret.push(fileName);
                        }
                    }
                    resolve(ret);
                    _this.removeRepoDirectory();
                }
                else {
                    reject(err);
                }
            });
        });
    };
    return BaseballDb;
}());
exports.BaseballDb = BaseballDb;
//# sourceMappingURL=baseballdb.js.map