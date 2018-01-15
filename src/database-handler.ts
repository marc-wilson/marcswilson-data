import * as MongoClient from 'mongodb/lib/mongo_client';
import { BaseballDb } from './baseballdb';


class DatabaseHandler {
    private _mongoUrl: string = 'mongodb://localhost:27017';
    public mongoClient: MongoClient = null;
    public baseballDb: BaseballDb = null;
    constructor() {
        this.connect().then( _client => {
            this.mongoClient = _client;
            this.baseballDb = new BaseballDb(this.mongoClient);
        });
    }
    connect(): Promise<MongoClient> {
        console.log('Connecting to mongodb...');
        return new Promise( (resolve, reject) => {
            MongoClient.connect(this._mongoUrl, (err, client) => {
                if (err) {
                    console.log('Connection Failed...');
                    reject(err);
                } else {
                    console.log('Connection successful');
                    resolve(client);
                }
            })
        });
    }
}

new DatabaseHandler();