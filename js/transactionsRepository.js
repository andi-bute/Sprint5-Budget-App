var repositoryTransactions = (function () {

  var id = 5;
  var data = [
      {
        id: 1,
        category: 'Transport',
        amount: -15,
        tag: 'RATB tickets',
        date: '2016-01-19'
      },
      {
        id: 2,
        category: 'Food',
        amount: -25,
        tag: 'Pizza Lunch',
        date: '2016-01-15'
      },
      {
        id: 3,
        category: 'Clothing',
        amount: -50,
        tag: 'T-shirt',
        date: '2016-01-13'
      },
      {
        id: 4,
        category: 'Tips',
        amount: +90,
        tag: 'Customer Tip',
        date: '2016-01-12'
      },
      {
        id: 5,
        category: 'Godev Site Update',
        amount: +200,
        tag: 'Web Dev Gig',
        date: '2016-01-21'
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



var consoleTransactions = function() {
  repositoryTransactions.getAll().then(function(data) {
    console.log(data);
  })
}

var consoleTotal = function() {
  repositoryTransactions.getTotal().then(function(total) {
    console.log(total)
  })
}



var getFormInfo = function() {
  return {
    amount: parseFloat($('#transactions-amount-input').val()),
    tag: $('#transactions-tag-input').val(),
    date: $('#transactions-date-input').val()
  };
}

$(document).ready(function() {

  $('#transactions-form').on('submit', function() {
    repositoryTransactions.add(getFormInfo()).then(function() {
      $('#transactions-form').find('input').not('[type="submit"]').val('');
    })
    repositoryTransactions.getAll().then(function(data) {
      var $displays = $('#displays').empty();
      $.each(data, function() {
        $displays.append('<p><span>ID: ' + this.id + '</span><span>/// Amount: ' + this.amount + '</span><span>/// Tag: ' + this.tag + '</span><span>/// Date: ' + this.date + '</span></p>')
      })
    })
    return false;
  })
});