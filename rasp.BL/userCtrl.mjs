import {readFile, writeFile} from 'node:fs/promises'

const db = './rasp.Data/db.json';
const DefaultStation = {sH: "s9613181",sW: "s9613602"};
let usersCache = JSON.parse( await readFile(db, {encoding: 'utf-8'}));

class UserCtrl {

    async addUser(cid, homeStation, workStation) {

        try {
            if (this.isUser(cid)) {
                usersCache.forEach((item, index) => {
                    if (item.cid === cid) {
                        item.sH = homeStation;
                        item.sW = workStation;
                    }
                });

            }
            else {
                usersCache.push({"cid": cid, "sH": homeStation, "sW": workStation});
            }

            await writeFile(db, JSON.stringify(usersCache));
            return true
        }
        catch (e) {
            return false
        }
    }

    isUser (cid) {

        return usersCache.find ( (i) => i.cid === cid)
    }
    userConstructor (cid) {
        const user = this.isUser(cid);
        return user || {cid: cid, sH: "s9613181", sW: "s9613602"}
    }
}

export default UserCtrl