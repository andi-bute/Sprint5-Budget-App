var budgetRepository = (function () {

    var data = 2000;

    return {
        get: function() {
            return new Promise(function (resolve, reject) {
                resolve(data);
            });
        },
        update: function (type, amount) {
            if(type == "calculate") {
                data = data + amount;
                return new Promise(function (resolve, reject) {
                resolve(data);
                });
            }
            else if(type == "set") {
                data = amount;
                return new Promise(function (resolve, reject) {
                resolve(data);
                });
            }
        }
    }
})();