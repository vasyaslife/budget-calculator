let startBtn = document.querySelector('#start'),
    valueBox = document.querySelector('.result__table').querySelectorAll('div'),
    dateBox = document.querySelectorAll('.time-data__input'),
    expensesInput = document.getElementsByClassName('expenses__item'),
    optionalExpensesInput = document.querySelectorAll('.optionalexpenses__item'),
    expensesAccept = document.querySelector('.expenses__item-btn'),
    optionalExpensesAccept = document.querySelector('.optionalexpenses__btn'),
    countBudgetAccept = document.getElementsByClassName('count-budget__btn'),
    incomeInpput = document.querySelector('.choose-income__item'),
    savingsCheck = document.querySelector('#savings'),
    savingsSumInput = document.querySelector('.checksavings__sum'),
    savingsPercentInput = document.querySelector('.checksavings__percent');

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
            (date.charAt(4) == '-' && 
            date.charAt(7) == '-') ) {
            console.log(!!date);
            return 1;
        }

        return 0;
    },

    getDay: function () {
        if (!!this.date) {
            return +this.date.slice(-2);
        }
    },

    getMonth: function () {
        if (!!this.date) {
            return +this.date.slice(5, 7);
        }
    },

    getYear: function () {
        if (!!this.date) {
            return +this.date.slice(0, 4); 
        }
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

        valueBox[0].textContent = appData.budget;
    },

    takeDate: function () {
        do {
            appData.date = prompt('Введите дату в формате YYYY-MM-DD?', '');
        } while (!appData.validDate());

        dateBox[0].value = appData.getYear();
        dateBox[1].value = appData.getMonth();
        dateBox[2].value = appData.getDay();
    },

    takeExpenses: function () {
        let validation = 1;

        for (let i = 0; i < expensesInput.length; i++) {
            let key = expensesInput[i].value,
                value = +expensesInput[++i].value;

            if ( !(!!key && appData.isZeroToTen(key) && isNatural(value)) ) {
                validation = 0;  
            }
        }

        if (validation == 1) {
            let sum = 0;
            Object.keys(appData.expenses).forEach(function(key) { delete appData.expenses[key]; });

            for (let i = 0; i < expensesInput.length; i++) { 
                appData.expenses[expensesInput[i].value] = +expensesInput[++i].value;
                sum += +expensesInput[i].value;
            }

            valueBox[3].textContent = sum;
        } else {
            alert('Введены некорректные данные в полях с обязательными расходами');
        }
    },

    
    takeOptionalExpenses: function () {
        let validation = 1;

        for (let i = 0; i < optionalExpensesInput.length; i++) {
            let value = optionalExpensesInput[i].value;

            if ( !(!!value && appData.isZeroToTen(value)) )  {
                validation = 0;
            }
        }

        if (validation == 1) {
            let sumText = '';
            Object.keys(appData.optionalExpenses).forEach(function(key) { delete appData.optionalExpenses[key]; });
        
            for (let i = 0; i < optionalExpensesInput.length; i++) {
                appData.optionalExpenses[i] = optionalExpensesInput[i].value;
                sumText += appData.optionalExpenses[i] + ' ';
            }

            valueBox[4].textContent = sumText;
        } else {
            alert('Введены некорректные данные в полях с необязательными расходами');
        }
    }
};

function isNatural(num) {
    if (Number.isInteger(num) && num > 0) {
        return 1;
    }

    return 0;
}

startBtn.addEventListener('click', function(event) {
    appData.takeDate();
    appData.takeBudget();
});

expensesAccept.addEventListener('click', function() {
    appData.takeExpenses();
});

optionalExpensesAccept.addEventListener('click', function () {
    appData.takeOptionalExpenses();
});
