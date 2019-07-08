window.addEventListener('DOMContentLoaded', function() {

    let startBtn = document.querySelector('#start'),
        valueBox = document.querySelector('.result__table').querySelectorAll('div'),
        dateBox = document.querySelectorAll('.time-data__input'),
        expensesInput = document.getElementsByClassName('expenses__item'),
        optionalExpensesInput = document.querySelectorAll('.optionalexpenses__item'),
        expensesAccept = document.querySelector('.expenses__item-btn'),
        optionalExpensesAccept = document.querySelector('.optionalexpenses__btn'),
        countBudgetAccept = document.querySelector('.count-budget__btn'),
        incomeInput = document.querySelector('.choose-income__item'),
        savingsCheck = document.querySelector('#savings'),
        savingsSumInput = document.querySelector('.checksavings__sum'),
        savingsPercentInput = document.querySelector('.checksavings__percent');

    let appData = {
        budget: 0,
        budgetReady: 0,
        appReady: 0,
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
                (date.charAt(4) == '-' && 
                date.charAt(7) == '-') ) {
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
            if (this.budgetReady && this.budget != 0) {
                let budget = 0, 
                budgetForMonth = this.getBudgetForMonth();

                if (budgetForMonth !== 0) {
                    budget = (budgetForMonth / (31 - appData.getDay())).toFixed(2);
                }

                valueBox[1].textContent = budget;
                if (budget > 3000) {
                    valueBox[2].textContent = 'У вас большой уровень достатка';
                } else if ( budget > 2000) {
                    valueBox[2].textContent = 'У вас средний уровень достатка';
                } else if ( budget > 0) {
                    valueBox[2].textContent = 'У вас маленький уровень достатка';
                } else if ( budget < 0) {
                    valueBox[2].textContent = 'Ваш бюджет не может покрыть расходы, найдите еще ' +
                    budgetForMonth*-1 +
                    ' , чтобы покрыть расходы и выйти в ноль';
                } else if ( budget === 0) {
                    valueBox[2].textContent = 'У вас нет бюджета';
                }
            }  else {
                alert('Введите обязательные расходы и бюджет');
            }
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
            if (this.savings) {
                this.savings = 0;
            } else {
                this.savings = 1;
            }
        },

        getSavings: function () {
            if (this.savings) {
                let save = +savingsSumInput.value,
                    percent = +savingsPercentInput.value;

                if ((isFinite(save) && !!save) &&
                    (isFinite(percent) && !!percent)) {
                    this.monthIncome = (save / 100 / 12 * percent).toFixed(2);
                    this.yearIncome = (save / 100 * percent).toFixed(2);
                    
                    valueBox[6].textContent = this.monthIncome;
                    valueBox[7].textContent = this.yearIncome;
                }
            }
        },

        chooseIncome: function () {
            let incomeItems = incomeInput.value;

                this.income = incomeItems.split(', ');
                valueBox[5].textContent = this.income;
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
            this.appReady = 1;
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

                appData.budgetReady = 1;
                valueBox[3].textContent = sum;
            } else {
                appData.budgetReady = 0;
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

    savingsCheck.addEventListener('click', function () {
        appData.checkSavings();
    });


    expensesAccept.addEventListener('click', function() {
        if (appData.appReady) {
            appData.takeExpenses();
        }
    });

    optionalExpensesAccept.addEventListener('click', function () {
        if (appData.appReady) {
            appData.takeOptionalExpenses();
        }
    });

    countBudgetAccept.addEventListener('click', function () {
        if (appData.appReady) {
            appData.getBudgetPerDay();   
        }
    });

    incomeInput.addEventListener('input', function () {
        if (appData.appReady) {
            appData.chooseIncome();
        }
    });

    savingsSumInput.addEventListener('input', function () {
        if (appData.appReady) {
            appData.getSavings();   
        }
    });

    savingsPercentInput.addEventListener('input', function () {
        if (appData.appReady) {
            appData.getSavings();
        }
    });

});