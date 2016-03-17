var formatDate = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    formattedDate = yyyy + '-' + mm + '-' + dd;
}

var displayDateDiv = function() {
    var today = new Date();
    $('.date-div').text(today.getDate() + " " + (today.toLocaleString("en-us", { month: "long" })) + " " + today.getFullYear());
}

var displayCurrentMonthExpenses = function() {
    transactionsRepository.getAll().then(function(data) {
        var sum = 0;
        $.each(data, function(index) {
            if(data[index].date.substring(0, 7) == formattedDate.substring(0,7) && data[index].amount < 0) {
               sum = sum + data[index].amount; 
            }
        })
        $('#expenses-box').text(Math.abs(sum));
    })
}