let appData = {
    budget: 0,
    date: '',
    expenses: {},
    optionalExpenses: [],
    income: [],
    savings: true,

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
            budgetForMonth = this.getBudgetForMonth();

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

    getBudgetPerMonth: function () {
        alert('Ваш бюджет на месяц: ' + this.getBudgetForMonth());
    },

    getBudgetForMonth: function () {
        let budgetForMonth = this.budget;

        for (let key in appData.expenses) {
            budgetForMonth -= appData.expenses[key];
        }

        return budgetForMonth;
    },

    takeOptionalExpenses: function () {
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
    },

    checkSavings: function () {
        if (this.savings == true) {
            let save = +prompt('Какова сумма накоплений?'),
                percent = +prompt('Под какой процент?');

                while (!(isFinite(save) && !!save)) {
                    save = +prompt('Какова сумма накоплений?');
                }

                while (!(isFinite(percent) && !!percent)) {
                    percent = +prompt('Какова сумма накоплений?');
                }


                this.monthIncome = (save / 100 / 12 * percent).toFixed(2);
                alert('Доход в месяц с вашего депозита: ' + this.monthIncome +
                 '\nРезультат округлен до двух цифр после запятой.');
        }
    },

    chooseIncome: function () {
        let incomeItems = prompt('Что принесет вам дополнительный доход? (Перечислите через запятую)', '');

        while ( !(!!incomeItems) ) {
            incomeItems = prompt('Что принесет вам дополнительный доход? (Перечислите через запятую)', '');
        }

        this.income = incomeItems.split(', ');
        incomeItems = prompt('Может что-то еще?', '');

        while ( !(!!incomeItems) ) {
            incomeItems = prompt('Может что-то еще?', '');
        }

        this.income.push(incomeItems);
        this.income.sort();
    },

    showIncome: function () {  
        let incomeText = '';

            appData.income.forEach(function(item, i) {
                incomeText += (++i) + ') ' + item +  '\n';
            });

        alert('Способы доп. заработка: \n' + incomeText); 
    },

    showAllInfo: function () {
        let infoText = '';

        for (let key in this) {
            
            infoText += key + ' значение: ' + this[key] + '\n';
        }

        alert('Наша программа включает в себя данные: \n' + infoText);
    },

    takeBudget: function () {
        do {
            appData.budget = +prompt('Ваш бюджет на месяц?', '');
        } while (!isNatural(appData.budget));
    },

    takeDate: function () {
        do {
            appData.date = prompt('Введите дату в формате YYYY-MM-DD?', '');
        } while (!appData.validDate());
    },

    takeExpenses: function () {
        for (let i = 0; i < 2;) {
            let key = prompt('Введите обязательную статью расходов в этом месяце', ''),
                value;
        
            if (!!key) {
        
                do {
                    value = +prompt('Во сколько обойдется?', '');
                } while (!isNatural(value));
        
                appData.expenses[key] = value;
                i++;
            }
        }
    },

    takeInfo: function () {
        this.startBtn = document.querySelector('#start');
        this.valueBox = document.querySelector('.result__table').querySelectorAll('div');
        this.dateInput = document.querySelectorAll('.time-data__input');
        this.expensesInput = document.getElementsByClassName('expenses__item');
        this.optionalExpensesInput = document.querySelectorAll('.optionalexpenses__item');
        this.expensesAccept = document.getElementsByClassName('expenses__item-btn');
        this.optionalExpensesAccept = document.getElementsByClassName('optionalexpenses__btn');
        this.countBudgetAccept = document.getElementsByClassName('count-budget__btn');
        this.incomeInpput = document.querySelector('.choose-income__item');
        this.savingsCheck = document.querySelector('#savings');
        this.savingsSumInput = document.querySelector('.checksavings__sum');
        this.savingsPercentInput = document.querySelector('.checksavings__percent');
    }
};

function isNatural(num) {
    if (Number.isInteger(num) && num > 0) {
        return 1;
    }

    return 0;
}



// appData.takeBudget();
// appData.takeDate();
// appData.takeExpenses();

// appData.takeOptionalExpenses(); // Use when need to take optional expenses
// appData.checkSavings (); //Use when need to set a month income from savings

// appData.getBudgetPerMonth();
// appData.getBudgetPerDay();

// appData.chooseIncome();
// appData.showIncome();
// appData.showAllInfo();