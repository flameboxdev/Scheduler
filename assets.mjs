const mainKeyboard = {

    reply_markup: {

        keyboard: [

            ['🚂 Сегодня на работу 💻'],
            ['🚂 Сегодня домой 🏡'],
            ['🚂 Завтра на работу 💻'],
            ['🚂 Завтра домой 🏡']

        ],
        resize_keyboard: true
    }

};

const days = ['воскресение,', 'понедельник,', 'вторник,', 'среда,', 'четверг,', 'пятница,', 'суббота,', 'воскресение,'];

export {mainKeyboard, days}