$(document).ready(function() {
    $('form').submit(onSubmit);
    drawTable();

});
var $tbody = $('table').find('tbody');

var drawTable = function (){

    repositoryTransactions.getAll().then(function(data){
        $tbody.empty();
        $.each(data, function() {
            var tr = (tmpl("tpl", this));
            $tbody.append(tr);
        });
    });
};
var onSubmit = function(){
    var data = {
        tag: $('#inputTag').val(),
        catID: $('#catSelect').val(),
        amount: $('#inputAmount').val(),
        date:$('#inputDate').val()
    };
    repositoryTransactions.add(data).then(function() {
        drawTable();
    });

    return false;
};