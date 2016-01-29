var recurringRepository = (function () {

    var data = [

        {"id":1, "catId":1, "amount": 300, "day":22 , "tag":"Salary"},
        {"id":2, "catId":4, "amount": -200, "day":10, "tag":"Internet Bill"}
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
