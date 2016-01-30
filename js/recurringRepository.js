var recurringRepository = (function () {

    var id = 2;
    var data = [

        {"id":1, "catId":3, "amount": 300, "day":22 , "tag":"Salary"},
        {"id":2, "catId":4, "amount": -200, "day":10, "tag":"Internet bill"},
        {"id":3, "catId":2, "amount": -100, "day":15, "tag":"Electricity"},
        {"id":4, "catId":4, "amount": 500, "day":13, "tag":"Part-time job"}
    ];

    return {
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
