import config from './config.json' assert { type: "json"}

class Person {
    #id
    constructor(TgID) {
        this.id = TgID
    }
    getStation () {

        if (this.id === config.IrinaUID) return config.IrinaHomeStation
        else if (this.id === config.AlmiraUID) return config.AlmiraHomeStation
        else return config.DefaultStation

    }
}
// получает коды станций из конфиг файла, переделать для получения из БД
export default Person