
var categoriesRepository = (function () {
       // private
    var data = [
        {
            name: "Transport",
            type: "Expenses",
            limitation: 500,
            id: 4
        },
        {
            name: "Food",
            type: "Expenses",
            limitation: 0,
            id: 2
        },
        {
            name: "Clothing",
            type: "Expenses",
            limitation: 500,
            id: 3
        }
    ];
//public
    return {
        getAll: function () {
            return new Promise(function (resolve, reject) {
                   resolve(data);
                });
        },
        get: function (id) {
            return new Promise(function (resolve, reject) {
                $.each(data, function() {
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
                    resolve(data);
                }
            });
        });
    }
};
})();