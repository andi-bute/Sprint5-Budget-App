"use strict";

var url = 'server_url';
var online = true;
var defaults = {
    headers: {
        'Content-Type': 'application/json'
    },
    beforeSend: function () {
        $('body').trigger("loadingStarted");
    },
    complete: function () {
        $('body').trigger("loadingStopped");
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
    if (xhr.readyState == 4) {
        var errorCode = xhr.status;
        var errorMessage;
        
        if (xhr.responseJSON.message) {
            errorMessage = xhr.responseJSON.message;
        } else {
            errorMessage = xhr.responseJSON.error;
        }
        reject("ERROR " + errorCode + ": " + errorMessage);
    } else {
        reject("No server connection");
        online = false;
        $('body').trigger("offline");
    }
};


function LocalStore() {
    var _data = [];
    return {
        getAll: function () {
            return _data;
        },

        cache: function (receivedData) {
            _data = receivedData;
            console.log("Caching Data");
            console.log(_data);
        },

        get: function (id) {
            var itemFound = null;

            _data.forEach(function (item, index) {
                if (item._id == id) {
                    itemFound = item;
                }
            });
            return itemFound;
        },

        update: function (id, newItem) {
            _data.forEach(function (item, index) {
                if (item._id == id) {
                    _data[index] = newItem;
                }
            });
        },

        add: function (item) {
            _data.push(item);
        },

        delete: function (id) {
            _data.forEach(function (item, index) {
                if (item._id == id) {
                    _data.splice(index, 1);
                }
            });
        }
    }
}

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

function Repository(url) {
    var remoteStore = new RemoteStore(url);
    var localStore = new LocalStore();

    return {
        getAll: function (settings) {
            if (online) {
                return new Promise(function (resolve, reject) {
                    remoteStore.getAll(settings).then(
                        function (data) {
                            localStore.cache(data);
                            resolve(data);
                        }, function (xhr) {
                            errorHandler(xhr, reject)
                        });
                });
                //if no connection to server
            } else {
                return new Promise(function (resolve, reject) {
                    resolve(localStore.getAll());
                });
            }

        },

        get: function (id) {
            var item;

            if (online) {
                item = localStore.get(id);
                return new Promise(function (resolve, reject) {
                    //if item in local cache
                    if (item) {
                        console.log(item);
                        resolve(item);
                    }
                    //if item is not in local cache
                    else {
                        remoteStore.get(id).then(
                            function (data) {
                                resolve(data);
                            }, function (xhr) {
                                errorHandler(xhr, reject)
                            })
                    }
                });
                //if no connection to server
            } else {
                item = localStore.get(id);
                console.log("ITEM FROM STORE : ");
                console.log(item);
                return new Promise(function (resolve, reject) {
                    resolve(item);
                });
            }
        },

        add: function (item) {

            return new Promise(function (resolve, reject) {
                if (online) {
                    remoteStore.add(item).then(
                        function (data) {
                            localStore.add(data);
                            resolve(data);
                        },
                        function (xhr) {
                            errorHandler(xhr, reject)
                        });
                    //if no connection to server
                } else {
                    localStore.add(item);
                    resolve(item);
                }
            });
        },

        update: function (id, item) {
            return new Promise(function (resolve, reject) {
                if (online) {
                    remoteStore.update(id, item).then(
                        function (itemFromServer) {
                            localStore.update(id, itemFromServer);
                            resolve(itemFromServer);
                        },
                        function (xhr) {
                            errorHandler(xhr, reject)
                        });
                    //if no connection to server
                } else {
                    localStore.update(id, item);
                    resolve(item);
                }
            });
        },

        delete: function (id) {
            return new Promise(function (resolve, reject) {
                if (online) {
                    remoteStore.delete(id).then(
                        function () {
                            localStore.delete(id);
                            resolve();
                        },
                        function (xhr) {
                            errorHandler(xhr, reject)
                        });
                } else {
                    localStore.delete(id);
                    resolve();
                }
            });

        },

        getLocalStore: function () {
            return localStore.getAll();
        }
    }
}