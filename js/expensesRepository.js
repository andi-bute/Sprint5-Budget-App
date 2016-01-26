var repositoryExpenses = (function () {

  var id = 3;
  var data = [
      {
        id: 1,
        category: 'transport',
        amount: 15,
        tag: 'RATB tickets',
        date: '2016-01-19'
      },
      {
        id: 2,
        category: 'food',
        amount: 25,
        tag: 'pizza lunch',
        date: '2016-01-15'
      },
      {
        id: 3,
        category: 'clothing',
        amount: 50,
        tag: 't-shirt',
        date: '2016-01-13'
      }
    ];

  var total = function() {
    var sum = 0;
    data.forEach(function (el) {
      sum = sum + el.amount;
    })

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



var consoleExpenses = function() {
  repositoryExpenses.getAll().then(function(data) {
    console.log(data);
  })
}

var consoleTotalExpenses = function() {
  repositoryExpenses.getTotal().then(function(total) {
    console.log(total)
  })
}



var getFormInfo = function() {
  return {
    amount: $('#expenses-amount-input').val(),
    tag: $('#expenses-tag-input').val(),
    date: $('#expenses-date-input').val()
  };
}

$(document).ready(function() {

  $('#expenses-form').on('submit', function() {
    repositoryExpenses.add(getFormInfo()).then(function() {
      $('#expenses-form').find('input').not('[type="submit"]').val('');
    })
    repositoryExpenses.getAll().then(function(data) {
      var $displays = $('#displays').empty();
      $.each(data, function() {
        $displays.append('<p><span>ID: ' + this.id + '</span><span>/// Amount: ' + this.amount + '</span><span>/// Tag: ' + this.tag + '</span><span>/// Date: ' + this.date + '</span></p>')
      })
    })
    return false;
  })
});