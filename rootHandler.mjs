import axios from 'axios'
import config from './config.json' assert { type: "json"}

const rootHandler = async (direction, day_sign, subject) => {

try {

        const req = config.reqURI
        const d = dateRequest(day_sign);
        const sH = subject ? subject.getStation() : config.DefaultStation;
        const a = direction === 'w' ? sH : config.WorkStation;
        const b = direction === 'w' ? config.WorkStation : sH;

        const response = await axios.get(req, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': config.tokenSchedule
            },
            params: {
                from: a,
                to: b,
                date: d,
                transport_types: 'suburban'
            }
        });

        const eList = response.data.segments;

        const timeArray = eList.map((item, index) => {

            return item.departure.slice(11, 16);

        });

        return {
            status: "success",
            times: timeArray
        }


    }
    catch (e) {
    return {
        status: "error",
        times: ''
    }

            }

}

const dateRequest = (p) => {
    const date = new Date();
    if (p === 1) date.setDate(date.getDate() + 1);
    // date.setHours(date.getHours() - 3);
    const y = date.getFullYear() + '-';
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const formattedM = m < 10 ? `0${m}` : m;
    const formattedD = d < 10 ? `0${d}` : d;
    return y + formattedM + '-' + formattedD

}

export default rootHandler
