var transactionsRepository = (function () {

    var id = 5;
    var data = [
        {
            id: 1,
            catId: 4,
            amount: -15,
            tag: 'RATB tickets',
            date: '2016-01-19'
        },
        {
            id: 2,
            catId: 2,
            amount: -25,
            tag: 'Pizza Lunch',
            date: '2016-01-15'
        },
        {
            id: 3,
            catId: 3,
            amount: -50,
            tag: 'T-shirt',
            date: '2016-01-13'
        }
    ];

    var total = function () {
        var sum = 0;
        data.forEach(function (el) {
            sum = sum + el.amount;
        });

        return sum;
    };

    return {
        getTotal: function () {
            return new Promise(function (resolve, reject) {
                resolve(total());
            });
        },
        getAll: function () {
            return new Promise(function (resolve, reject) {
                resolve(data);
            });
        },
        get: function (id) {
            return new Promise(function (resolve, reject) {
                $.each(data, function () {
                    if (this.id == id) {
                        resolve(this);
                    }
                });
            });
        },
        add: function (item) {
            return new Promise(function (resolve, reject) {
                data.push(item);
                item.id = ++id;
                resolve(data);
            });
        },
        update: function (id, updateData) {
            return new Promise(function (resolve, reject) {
                $.each(data, function (index) {
                    if (this.id == id) {
                        updateData.id = id;
                        data[index] = updateData;
                        resolve(data);
                    }
                });
            });
        },

        delete: function (id) {
            return new Promise(function (resolve, reject) {
                $.each(data, function (index) {
                    if (this.id == id) {
                        data.splice(index, 1);
                        resolve();
                    }
                });
            });
        }
    };
})();