"use strict";

var url = 'server_url';

function RemoteStore(url) {

    return {
        get: function (id) {
            return ajaxPromise(url + "/" + id, defaults);
        },
        getAll: function (settings) {
            return ajaxPromise(url, defaults)
        },
        add: function (item) {
            var requestSettings = $.extend({}, defaults, {type: "POST", data: JSON.stringify(item)});
            return ajaxPromise(url, requestSettings);
        },
        update: function (id, updateData) {
            var requestSettings = $.extend({}, defaults, {type: 'PATCH', data: JSON.stringify(updateData)});
            return ajaxPromise(url + '/' + id, requestSettings);
        },
        delete: function (id) {
            return ajaxPromise(url + '/' + id, {type: 'DELETE'});
        }
    };
}

function LocalStore() {
    var data = [];
    return {
        getAll: function () {
            return data;
        },

        cache: function (receivedData) {
            data = receivedData;
            console.log("Caching Data");
            console.log(data);
        },

        get: function (id) {
            data.forEach(function (item, index) {
                if (item.id = id) {
                    return data[index];
                }
            });

            return null;
        },

        update: function (id, newItem) {
            data.forEach(function (item, index) {
                if (item.id = id) {
                    data[index] = newItem;
                }
            });
        },

        add: function (item) {
            data.push(item)
        },

        delete: function (id) {
            data.forEach(function (item, index) {
                if (item.id = id) {
                    data.splice(index, 1);
                }
            });
        }
    }
}

function Repository(url) {
    var remoteStore = new RemoteStore(url);
    var localStore = new LocalStore();

    return {
        getAll: function () {
            return new Promise(function (resolve, reject) {
                remoteStore.getAll().then(
                    function (data) {
                        localStore.cache(data);
                        resolve(data);
                    },
                    errorHandler(reject)
                );

            });
        },

        get: function (id) {
            var item = localStore.get(id);

            return new Promise(function (resolve, reject) {
                if (item != null) {
                    console.log("Get Local Data By ID LOCAL");
                    console.log(item);
                    resolve(item);
                }
                else {
                    console.log("Get Local Data By ID REMOTE");
                    remoteStore.get(id).then(
                        function (data) {
                            resolve(data);
                        },
                        repoErrorHandler(reject)
                    );
                }
            });
        },

        add: function (item) {

            return new Promise(function (resolve, reject) {
                remoteStore.add(item).then(
                    function (data) {
                        localStore.add(data);
                        resolve(data);
                    },
                    repoErrorHandler(reject)
                );
            });
        },

        update: function (id, item) {
            return new Promise(function (resolve, reject) {
                remoteStore.update(id, item).then(
                    function (itemFromServer) {
                        localStore.update(id, itemFromServer);
                        resolve(itemFromServer);
                    },
                    repoErrorHandler(reject)
                );
            });
        },

        delete: function (id) {
            return new Promise(function (resolve, reject) {
                remoteStore.delete(id).then(
                    function () {
                        localStore.delete(id);
                        resolve();
                    },
                    repoErrorHandler(reject)
                )
            });

        },

        getLocalStore: function () {
            return localStore.getAll();
        }
    }
}

var defaults = {
    headers: {
        'Content-Type': 'application/json'
    },
    beforeSend: function () {
    },
    complete: function () {
    }
};

var ajaxPromise = function (ajaxUrl, ajaxSetting) {
    return new Promise(function (resolve, reject) {
        $.ajax(ajaxUrl, ajaxSetting).done(resolve).error(function (xhr) {
            errorHandler(reject, xhr)
        });
    });
};

var repoErrorHandler = function (error) {
    alert(error);
};
var errorHandler = function (xhr,reject) {
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

function RecurringRepository() {
    var data = [{"id": 1, "catId": 1, "amount": 300, "day": 22, "tag": "Salary"}];
}

