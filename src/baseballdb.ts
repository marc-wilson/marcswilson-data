import * as Git from 'nodegit';
import * as fs from 'fs-extra';

class BuildDataBase {

    constructor() {
        this.removeRepoDirectory().then( res => {
            this.cloneRepository();
        });

    }

    cloneRepository(): Promise<any> {
        return new Promise( (resolve, reject) => {
            console.log('Cloning baseballdatabank...');
            Git.Clone('https://github.com/chadwickbureau/baseballdatabank.git', 'baseballdatabank').then( repo => {
                this.generageTableNames();
                resolve();
            })
        });
    }
    removeRepoDirectory(): Promise<any> {
        return new Promise( (resolve, reject) => {
            fs.remove('baseballdatabank', err => {
                if( err) {

                }
                resolve();
            })
        })
    }
    generageTableNames(): Promise<string[]> {
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

new BuildDataBase();