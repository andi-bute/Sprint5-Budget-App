var url = 'server_url';
var defaults = {
    headers: {
        'Content-Type': 'application/json'
    }
};

var recurringRespository = (function () {

    var total;
    var data = [
        {
            id: 1,
            catId: 2, //could be category name
            amount: 1000,
            day:17,
            tag: "Monthly salary"
        },
        {
            id: 2,
            catId: 3, //could be category name
            amount: -200,
            day:22,
            tag: "Internet bill payment"
        }
    ];
    return {
        get: function (id) {
            return new Promise(function (resolve, reject) {
                $.ajax(url + '/' + id, defaults).done(resolve).error(function (xhr) {
                    errorHandler(reject, xhr)
                });
            });
        },
        getAll: function (settings) {
            return new Promise(function (resolve, reject) {

                $.ajax(url, defaults).done(function (dataReceived) {
                    resolve(dataReceived);
                }).error(function (xhr) {
                    errorHandler(reject, xhr)
                });
            });
        },
        add: function (item) {
            return new Promise(function (resolve, reject) {
                $.ajax(url + "/", $.extend({}, defaults, {
                    type: "POST",
                    data: JSON.stringify(item)
                })).done(function (data) {
                    resolve(data);
                }).error(function (xhr) {
                    errorHandler(reject, xhr)
                })
            });
        },
        update: function (id, updateData) {
            return new Promise(function (resolve, reject) {

                $.ajax(url + '/' + id, $.extend({}, defaults, {type: 'PUT', data: JSON.stringify(updateData)})
                ).done(function (data) {
                    resolve(data);
                }).error(function (xhr) {
                    errorHandler(reject, xhr);
                });
            });
        },
        delete: function (id) {
            return new Promise(function (resolve, reject) {

                $.ajax(url + '/' + id, {
                    type: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                }).done(resolve).error(function (xhr) {
                    errorHandler(reject, xhr)
                })

            });
        }
    };

})();

var errorHandler = function (reject, xhr) {
    var errorCode = xhr.status;
    var errorMessage = xhr.responseJSON.error;

    if (errorCode == "409") {
        reject(function () {
            return errorMessage;
        })
    } else {
        reject(function () {
            return "Server Error";
        })
    }
};
