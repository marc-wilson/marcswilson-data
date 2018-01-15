
import * as fs from 'fs-extra';
import * as MongoClient from 'mongodb/lib/mongo_client';
import * as download from 'download-git-repo';

export class BaseballDb {

    public mongoClient: MongoClient = null;
    public repository: any = null;
    constructor(private _mongoClient: MongoClient) {

        this.mongoClient = _mongoClient;

        this.cloneRepository().then( _repo => {
            this.repository = _repo;
        }, error => {
            console.log(error);
        })
    }
    cloneRepository(): Promise<any> {
        console.log('Removing repo...');
        return new Promise( (resolve, reject) => {
            this.removeRepoDirectory().then( res => {
                if (res) {
                    console.log('Repo removed successfully');
                    console.log('Cloning baseballdatabank...');
                    download('chadwickbureau/baseballdatabank', 'baseballdatabank', (err) => {
                        if (!err) {
                            console.log('Repo has been cloned')
                            resolve(true);
                        } else {
                            reject(err);
                            console.error('Repo could not be cloned!');
                        }
                    })
                } else {
                    reject(null);
                }
            });
        });
    }
    removeRepoDirectory(): Promise<any> {
        return new Promise( (resolve, reject) => {
            fs.remove('baseballdatabank', err => {
                if( err) {
                    reject(err);
                } else {
                    resolve (true);
                }
            });
        })
    }
    generateTableNames(): Promise<string[]> {
        const ret: string[] =[];
        return new Promise( (resolve, reject) => {
            fs.readdir('baseballdatabank/core', (err, files) => {
                if (!err) {
                    for (let i = 0; i < files.length; i++) {
                        let fileName = files[i].toLowerCase();
                        if (fileName.endsWith('.csv')) {
                            fileName = fileName.replace('.csv', '');
                            if (!fileName.endsWith('s')) {
                                fileName += 's';
                            }
                            ret.push(fileName);
                        }
                    }
                    resolve(ret);
                    this.removeRepoDirectory();
                } else {
                    reject(err);
                }
            });
        });
    }
}
