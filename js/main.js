let appData = {
    budget: 0,
    date: '',
    expenses: {},
    optionalExpenses: [],
    income: [],
    savings: false,

    validDate: function () {
        let day = this.getDay(),
            month = this.getMonth(),
            year = this.getYear(),
            date = this.date;

        if ((isNatural(day) && day <= 30) &&
            (isNatural(month) && month <= 12) &&
            (isNatural(year)) &&
            (appData.date.length == 10) &&
            (date.charAt(4) == '-' && date.charAt(7) == '-')) {
            return 1;
        }

        return 0;
    },

    getDay: function () {
        return +this.date.slice(-2);
    },

    getMonth: function () {
        return +this.date.slice(5, 7);
    },

    getYear: function () {
        return +this.date.slice(0, 4);
    },

    getBudgetPerDay: function () {
        let budget = 0, 
            budgetForMonth = this.budget;

        for (let key in appData.expenses) {
            budgetForMonth -= appData.expenses[key];
        }

        if (budgetForMonth !== 0) {
            budget = (budgetForMonth / (31 - appData.getDay())).toFixed(2);
        }

        if (budget > 1000) {
            alert('У вас большой бюджет в день из расчета на 30 дней.\n' +
            'Результат округлен до двух цифр после запятой: ' + budget);
        } else if ( budget > 0) {
            alert('У вас не большой бюджет в день из расчета на 30 дней.\n' +
            'Результат округлен до двух цифр после запятой: ' + budget);
        } else if ( budget < 0) {
            alert('Ваш бюджет не может покрыть расходы, найдите еще ' +
            budgetForMonth*-1 + 
            ' , чтобы покрыть расходы и выйти в ноль');
        } else if ( budget === 0) {
            alert('У вас нет бюджета');
        }
    },

    getOptionalExpenses: function () {
        let i = 0;

        //expenses validation check
        while (i == 0) {
            let value = prompt('Статья необязательных расходов?', '');

            if (!!value && appData.isZeroToTen(value))  {
                this.optionalExpenses[this.optionalExpenses.length] = value;
                i++;
            }
        }
    },

    isZeroToTen: function (value) {
        let firstChar = value.charAt(0);
        if (firstChar != 0 &&
        firstChar != 1 &&
        firstChar != 2 &&
        firstChar != 3 &&
        firstChar != 4 &&
        firstChar != 5 &&
        firstChar != 6 &&
        firstChar != 7 &&
        firstChar != 8 &&
        firstChar != 9) {
            return 1;
        }

        return 0;
    }
};

function isNatural(num) {
    if (Number.isInteger(num) && num > 0) {
        return 1;
    }

    return 0;
}

//budget validation check
do {
    appData.budget = +prompt('Ваш бюджет на месяц?', '');
} while (!isNatural(appData.budget));

//date validation check
do {
    appData.date = prompt('Введите дату в формате YYYY-MM-DD?', '');
} while (!appData.validDate());

//expenses validation check
for (let i = 0; i < 2;) {
    let key = prompt('Введите обязательную статью расходов в этом месяце', ''),
        value;

    if (!!key) {
        appData[key] = 0;

        do {
            value = +prompt('Во сколько обойдется?', '');
        } while (!isNatural(value));

        appData.expenses[key] = value;
        i++;
    }
}

appData.getOptionalExpenses();
appData.getBudgetPerDay();

