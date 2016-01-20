/**
 * Created by temujin on 19.01.2016.
 */
//lvl1
var totalBudget = 0;
var balance = 0;
RecurringIncomes= [{
    namecategory: salariu,
    dayOfMonth: 1,
    amount: 500
    },
    {
        namecategory: bursa,
        dayOfMonth: 15,
        amount: 100
    },

];
BudgetRepository = {
    getBudget: function () {
        var results = [];
        data.forEach(function (el) {
            if (el.type === "budget" && el.recurring) {
                results.push(el.amount)
            }
        });
        return results;
    },
    addBudget: function (budget) {
        totalBudget += budget;
    },
    editBudget: function (Updatedata) {
        totalBudget = Updatedata;
    },
    setRecurringRevenue: function (item) {
        RecurringIncomes.push(item);
    },
    setUnreliebleRevenue: function (item) {
        UnreliablleIncomes.push(item);
    }
};

//    addExtraBudget: function () {
//        data.forEach(function (el) {
//            if (el.type === "budget") {
//                totalBudget += el.amount;
//            }
//        })
//    },
//    deleteBudget: function (id) {
//        data.forEach(function (el) {
//            if (el.id == id) {
//                if (el.type === "budget") {
//                    // console.log(this);
//                    totalBudget -= el.amount;
//                }
//            }
//        })
//    },
//    getFullBudgetObject: function (dateStart, dateEnd) {
//        var results = [];
//        data.forEach(function (el) {
//            if (el.date >= datestart && el.date <= dateend) {
//                results.push(el)
//            }
//        });
//        return results;
//    },
//    substractBudget: function () {
//        data.forEach(function (el) {
//            if (el.type === "expense") {
//                balance -= el.amount;
//            }
//        })
//    }
//};


// lvl0
var data = [
    {
        id: 1,
        name: 'Transportation',
        type: 'expense',
        limitation: 0,
        amount: 1300,
        recurring: false,//colect with radio button
        datestart: 10,
        dateend: 20
    },
    {
        id: 2,
        name: 'Food',
        type: 'expense',
        limitation: 0,
        amount: 500,
        recurring: false//colect with radio button
    },
    {
        id: 3,
        name: 'Entertainment',
        type: 'expense',
        limitation: 100,
        amount: 100,
        recurring: false//colect with radio button
    },
    {
        id: 4,
        name: 'salary',
        type: 'budget',
        amount: 1000,//must be always set because it has recurring true!!!
        limitation: 0,
        recurring: true//colect with radio button
    },
    {
        id: 5,
        name: 'part-time',
        type: 'budget',
        limitation: 0,
        amount: 100,
        recurring: false//colect with radio button
    }
];
