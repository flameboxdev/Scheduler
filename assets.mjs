const mainKeyboard = {

    reply_markup: {

        keyboard: [

            ['🚂 Сегодня на работу 💻'],
            ['🚂 Сегодня домой 🏡'],
            ['🚂 Завтра на работу 💻'],
            ['🚂 Завтра домой 🏡'],
            [{text: 'Зарегистрироваться ✏️', web_app: {url: 'https://scheduler-front-tawny.vercel.app/'}}]

        ],
        resize_keyboard: true,

    }

};

const days = ['воскресение,', 'понедельник,', 'вторник,', 'среда,', 'четверг,', 'пятница,', 'суббота,', 'воскресение,'];

export {mainKeyboard, days}