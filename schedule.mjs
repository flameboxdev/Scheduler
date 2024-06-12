import cron from 'node-cron'
import TelegramBot from 'node-telegram-bot-api'
import config from './config.json' assert { type: "json"}
import rootHandler from "./rootHandler.mjs";
import Person from "./person.mjs";
import {mainKeyboard, days} from "./assets.mjs";

console.log('Starting app..')

const bot = new TelegramBot(config.token, {polling: true});

bot.on('message', async (msg) => {

    const chatId = msg.chat.id;
    const uid = msg.from.id;
    let txt = msg.text;
    let params = {};
    let day_sign = {
        num: 0,
        txt: '',
        txt2: ''
    };
    const person = new Person(uid);
    // console.log(chatId);
    switch (txt) {
        case "/start": {
            day_sign.txt = 'Сегодня ';
            day_sign.txt2 = ' добро пожаловать в команду! ';

            params.status = "success";
            params.times = " Скоро добавим вас в систему.";

            bot.sendMessage(config.SupportChatID, `Order by\nid ${uid}\nChat ${chatId}`);
            bot.sendMessage(chatId, '👋🏻', mainKeyboard);
            break
        }


        case "🚂 Сегодня на работу 💻": {
            day_sign.num = 0;
            day_sign.txt = 'Сегодня ';
            day_sign.txt2 = config.textW;
            params = await rootHandler('w', day_sign, person);
            break
        }
        case "🚂 Сегодня домой 🏡": {

            day_sign.num = 0;
            day_sign.txt = 'Сегодня ';
            day_sign.txt2 = config.textH;
            params = await rootHandler('h', day_sign, person);
            break
        }
        case "🚂 Завтра на работу 💻": {

            day_sign.num = 1;
            day_sign.txt = 'Завтра ';
            day_sign.txt2 = config.textW;
            params = await rootHandler('w', day_sign, person);
            break
        }
        case "🚂 Завтра домой 🏡": {
            day_sign.num = 1;
            day_sign.txt = 'Завтра ';
            day_sign.txt2 = config.textH;
            params = await rootHandler('h', day_sign, person);
            break
        }
    }

    if (params.status === "success") bot.sendMessage(chatId,day_sign.txt + day(day_sign.num) + day_sign.txt2 + params.times);
    else {
        bot.sendMessage(chatId, 'Яндекс-расписание не отвечает, попробуй ещё раз');
    }


});

// переделать в функцию приема массива UID

cron.schedule('0 17 * * 0-4', async () => {
try {
    const Almira = new Person(config.AlmiraUID);
    const Irina = new Person(config.IrinaUID);
    let reqSheduler = {};
    let messageSent = 'Яндекс-расписание не отвечает, попробуй ещё раз';

    for (let i = 0; i < 10; i++) {

            reqSheduler = await rootHandler('w', 1, Almira)


     if (reqSheduler.status === "success") {
         messageSent = rr(reqSheduler.times);
         break;
     }
    }

    bot.sendMessage(config.AlmiraChatID, messageSent);
    messageSent = 'Яндекс-расписание не отвечает, попробуй ещё раз'


    for (let i = 0; i < 15; i++) {

        reqSheduler = await rootHandler('w', 1, Irina)


        if (reqSheduler.status === "success") {
            messageSent = rr(reqSheduler.times);
            break;
        }
    }
    bot.sendMessage(config.IrinaChatID, messageSent);
}
catch (e) {
    console.log('Error cron');
}
});

cron.schedule('0 7 * * 1-5', async () => {
    try {
        let reqSheduler = {};
        let messageSent = 'Яндекс-расписание не отвечает, попробуй ещё раз';

        for (let i = 0; i < 10; i++) {

            reqSheduler = await rootHandler('h', 0);

            if (reqSheduler.status === "success") {
                messageSent = rHome(reqSheduler.times);
                break;
            }
        }

        bot.sendMessage(config.AlmiraChatID, messageSent);
        bot.sendMessage(config.IrinaChatID, messageSent);

    }
    catch (e) {
        console.log('Error cron');
    }
});


const rr = (handle) => {
    return 'Завтра ' + day(1) + ' твоя электричка отправится в ' + handle[1]
    }

const rHome = (handle) => {
    return `Сегодня домой твоя электричка отправится в ${handle[2]}, следующая в ${handle[3]}`
}

const day = (n) => {
    return days[new Date().getDay() + n]
}

