var $tbody = $('table').find('tbody');

var drawTable = function (transactionsRepository){

    transactionsRepository.getAll().then(function(data){
        $tbody.empty();
        $.each(data, function(index,element) {
            categoriesRepository.get(element.catId).then(function(category){
                var tr = (tmpl("tpl", {
                    id: element.id,
                    name: category.name,
                    tag: element.tag,
                    amount: element.amount,
                    date: element.date
                }));
                $tbody.append(tr);
                $tbody.find('a.delete').click(deleteClicked);
            });

        });
    });
};

var onSubmit = function(){
    var catInput = $('#catSelect').val();

    categoriesRepository.getAll().then(function(data){
        $.each(data, function(index, el) {
                if (catInput == el.name) {
                    var data = {
                            tag: $('#inputTag').val(),
                            catId: el.id,
                            amount: parseInt($('#inputAmount').val(),10),
                            date: $('#inputDate').val()
                        };
                    transactionsRepository.add(data).then(function() {
                        drawTable(transactionsRepository);
                        resetForm();
                    });
                }
        });
    });
    return false;
};

var deleteClicked = function() {
    var id = $(this).closest('tr').data('id');

    transactionsRepository.delete(id).then(function() {
            drawTable(transactionsRepository);
        });

    return false;
};

var resetForm = function (){
    $('#catSelect').val("");
    $('#inputTag').val("");
    $('#inputAmount').val("");
    $('#inputDate').val("");
};

$(document).ready(function() {
    $('form').submit(onSubmit);
    drawTable(transactionsRepository);
});