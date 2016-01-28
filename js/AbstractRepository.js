"use strict";

var url = 'server_url';

function RemoteStore(url) {

    return {
        get: function (id) {
            return ajaxPromise(url + "/" + id, defaults);
        },
        getAll: function (settings) {
            settings = settings == undefined ? "" : settings;
            return ajaxPromise(url, $.extend({}, defaults, {data: JSON.stringify(settings)}));
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
            data.push(item);
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
        getAll: function (settings) {
            return new Promise(function (resolve, reject) {
                remoteStore.getAll(settings).then(
                    function (data) {
                        localStore.cache(data);
                        resolve(data);
                    }, function (xhr) {
                        errorHandler(xhr, reject)
                    });
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
                        }, function (xhr) {
                            errorHandler(xhr, reject)
                        })
                }
            });
        },

        add: function (item) {

            return new Promise(function (resolve, reject) {
                localStore.add(data);
                remoteStore.add(item).then(
                    function (data) {
                        //localStore.add(data); aici
                        resolve(data);
                    },
                    function (xhr) {
                        errorHandler(xhr, reject)
                    });
            });
        },

        update: function (id, item) {
            return new Promise(function (resolve, reject) {
                remoteStore.update(id, item).then(
                    function (itemFromServer) {
                        localStore.update(id, itemFromServer);
                        resolve(itemFromServer);
                    },
                    function (xhr) {
                        errorHandler(xhr, reject)
                    });
            });
        },

        delete: function (id) {
            return new Promise(function (resolve, reject) {
                remoteStore.delete(id).then(
                    function () {
                        localStore.delete(id);
                        resolve();
                    },
                    function (xhr) {
                        errorHandler(xhr, reject)
                    });
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
            reject(xhr);
        });
    });
};

var errorHandler = function (xhr, reject) {
    var errorMessage = xhr.responseJSON.message;
    reject(errorMessage);
};


