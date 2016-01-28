var DOMtable = $('table').find('tbody');
var DOMbudgetBox = $('#budget-box');
var DOMeditBudgetBtn = $('#btn-edit-budget');
var DOMacceptEditBudgetBtn = $('#btn-accept-edit-budget');
var DOMcancelEditBudgetBtn = $('#btn-cancel-edit-budget');

var editingObject = null;

var drawTable = function (transactionsRepository){
    transactionsRepository.getAll().then(function(data){
        DOMtable.empty();
        $.each(data, function(index,element) {
            categoriesRepository.get(element.catId).then(function(category){
                var tr = (tmpl("tpl", {
                    id: element.id,
                    name: category.name,
                    tag: element.tag,
                    amount: element.amount,
                    date: element.date
                }));
                DOMtable.append(tr);
            });

        });
    });
};

var onSubmit = function(){
    var catInput = $('#catSelect').val();
    updateBudget("calculate", parseFloat($('#inputAmount').val()));
    categoriesRepository.getAll().then(function(data){
        $.each(data, function(index, el) {
                if (catInput == el.name) {
                    var data = {
                            tag: $('#inputTag').val(),
                            catId: el.id,
                            amount: $('#inputAmount').val(),
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
            initializeBudget();
            drawTable(transactionsRepository);
        });

    return false;
};

var editClicked = function() {
    var DOMparentTr = $(this).closest('tr');
    DOMparentTr.addClass("highlight-tr");
    var id = DOMparentTr.data('id');

    transactionsRepository.get(id).then(function(data) {
        editingObject = data;
        DOMparentTr.find('.transaction-table-tag').replaceWith("<input class='edit-transaction-input-tag' type='text' value='" + editingObject.tag + "'/>");
        DOMparentTr.find('.transaction-table-amount').replaceWith("<input class='edit-transaction-input-amount' type='text' value='" + editingObject.amount + " RON'/>");
        DOMparentTr.find('.transaction-table-date').replaceWith("<input class='edit-transaction-input-date' type='text' value='" + editingObject.date + "'/>"); 
    })

    DOMparentTr.find('.delete').fadeOut();
    DOMparentTr.find('.edit').fadeOut(function() {
        DOMparentTr.find('.edit-accept').fadeIn();
        DOMparentTr.find('.edit-cancel').fadeIn();
    })

    return false;
};

var editClickedAccept = function() {
    var DOMparentTr = $(this).closest('tr');
    DOMparentTr.removeClass("highlight-tr");
    var id = DOMparentTr.data('id');

    editingObject.tag = DOMparentTr.find('.edit-transaction-input-tag').val();
    editingObject.amount = parseFloat(DOMparentTr.find('.edit-transaction-input-amount').val().split(" ")[0]);
    editingObject.date = DOMparentTr.find('.edit-transaction-input-date').val();
    DOMparentTr.find('.edit-transaction-input-tag').replaceWith("<span class='transaction-table-tag'>" + editingObject.tag + "</span>");
    DOMparentTr.find('.edit-transaction-input-amount').replaceWith("<span class='transaction-table-amount'>" + editingObject.amount + " RON</span>");
    DOMparentTr.find('.edit-transaction-input-date').replaceWith("<span class='transaction-table-date'>" + editingObject.date + "</span>");

    transactionsRepository.update(id, editingObject).then(function() {
        initializeBudget();
    });

    editingObject = null;

    DOMparentTr.find('.edit-cancel').fadeOut();
    DOMparentTr.find('.edit-accept').fadeOut(function() {
        DOMparentTr.find('.delete').fadeIn();
        DOMparentTr.find('.edit').fadeIn();
    })

    return false;
}

var editClickedCancel = function() {
    var DOMparentTr = $(this).closest('tr');
    DOMparentTr.removeClass("highlight-tr");

    DOMparentTr.find('.edit-transaction-input-tag').replaceWith("<span class='transaction-table-tag'>" + editingObject.tag + "</span>");
    DOMparentTr.find('.edit-transaction-input-amount').replaceWith("<span class='transaction-table-amount'>" + editingObject.amount + " RON</span>");
    DOMparentTr.find('.edit-transaction-input-date').replaceWith("<span class='transaction-table-date'>" + editingObject.date + "</span>");

    DOMparentTr.find('.edit-cancel').fadeOut();
    DOMparentTr.find('.edit-accept').fadeOut(function() {
        DOMparentTr.find('.delete').fadeIn();
        DOMparentTr.find('.edit').fadeIn();
    })

    return false;
}

var resetForm = function (){
    $('#catSelect').val("");
    $('#inputTag').val("");
    $('#inputAmount').val("");
    $('#inputDate').val("");
};

$(document).ready(function() {
    $('form').submit(onSubmit);
    drawTable(transactionsRepository);

    initializeBudget();
    DOMeditBudgetBtn.on('click', enableModifyBudget);
    DOMacceptEditBudgetBtn.on('click', acceptModifiedBudget);
    DOMcancelEditBudgetBtn.on('click', cancelModifiedBudget);
    $('.budget').on('keyup', '.edit-budget-input', fluidizeInput);

    DOMtable.on('click', 'a.delete', deleteClicked);
    DOMtable.on('click', 'a.edit', editClicked);
    DOMtable.on('click', 'a.edit-accept', editClickedAccept);
    DOMtable.on('click', 'a.edit-cancel', editClickedCancel);
});