let appData = {
    budget: 0,
    date: '',
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,

    dateValid: function () {
        let day = this.getDay(), 
            month = this.getMonth(), 
            year = this.getYear(),
            date = appData.date;

        if ( (isNatural(day) && day <= 30) && 
        (isNatural(month) && month <= 12) && 
        (isNatural(year)) &&
        (appData.date.length == 10) &&
        (date.charAt(4) == '-' && date.charAt(7) == '-') ) {
            return 1;
        }

        return 0;
    },

    getDay: function () {
        return +appData.date.slice(-2);
    },

    getMonth: function () {
        return +appData.date.slice(5, 7);
    },

    getYear: function () {
        return +appData.date.slice(0, 4);
    }
};

function isNatural (num) {
    if (Number.isInteger(num) &&  num > 0 ) {
        return 1;
    } else {
        return 0;
    }
}

//budget validation check
do {
    appData.budget = +prompt('Ваш бюджет на месяц?', '');
} while (!isNatural(appData.budget));

//date validation check
do {
    appData.date = prompt('Введите дату в формате YYYY-MM-DD?', '');
} while (!appData.dateValid());





