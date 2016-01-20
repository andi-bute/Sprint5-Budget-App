
var categoriesStore = (function () {
       // private
    var data = [
        {
            id: 1,
            name: 'Transportation',
            type: 'expense',
            limitation: 0,
            amount: 1300,
            recurring: false,//colect with radio button
            datestart:10,
            dateend:20

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
//public
    return {
        getAllCategories: function () {
            return new Promise(function (resolve, reject) {
                   resolve(data);
                });
        },
        //getCategory: function (id) {
        //    return new Promise(function (resolve, reject) {
        //        $.ajax(entriesUrl + "/" + id, {
        //            type: 'GET',
        //            headers: headers,
        //            data: JSON.stringify(id)
        //        }).done(resolve).fail(error);
        //    });
        //},
        addCategory: function (item) {
           return new Promise(function (resolve, reject) {
                    data.push(item);
                    item.id = 6;
                    resolve(data);
                });
        },
        updateCategory: function (id, updateData) {
        return new Promise(function (resolve, reject) {
            $.each(data, function (index) {
                if (this.id == id) {
                    data[index] = updateData;
                    resolve(data);
                    }
            });
    });
},
        deleteCategory: function (id) {
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