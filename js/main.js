let money = +prompt('Ваш бюджет на месяц?', ''),
    time = prompt('Введите дату в формате YYYY-MM-DD?', ''); // The DD is only 30 days max


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

for (let i = 0; i < 2; i++) {
    appData.expenses[prompt('Введите обязательную статью расходов в этом месяце', '')] = prompt('Во сколько обойдется?', '');
}

//getting user's date
appData.dayToday = appData.timeData.slice(-2);


if (!isNaN(appData.dayToday) && +appData.dayToday > 0 +appData.dayToday < 31 && +appData.budget > 0) {
    alert('Ваш бюджет на день, округленный до двух цифр после запятой: ' + (appData.budget / (31 - appData.dayToday)).toFixed(2));
} else {
    alert('Введены некорректные данные даты');
}