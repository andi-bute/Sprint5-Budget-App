/**
 * Created by temujin on 29.01.2016.
 */

$(document).ready(function () {

    var editCatOption = $('#menu').find('li:nth-child(1)');
    var transactionsForm = $('#inputform');
    var closeBtn = $('#closebtn');
    var saveBtn = $('#savebtn');
    var manageCat = $('#managecat');
    var statisticspage = $('#statistics');

    var slideDownLimit = function () {
        $('#yes').click(function () {
            $('#limit').slideDown("slow")
        });
    };

    var slideUpLimit = function () {
        $('#no').click(function () {
            $('#limit').slideUp("slow")
        });
    };

    var addCategory = function () {
        $("#catSelect").change(function (ev) {
            if ($(ev.target).val() == "newone") {
                var categorie = prompt("Add new category", "Food");
                $('#catSelect').prepend("<option>" + categorie + "</option>");
            }
        });
    };

    var openEditCategory = function () {
        editCatOption.click(function () {
            transactionsForm.addClass('hidden');
            manageCat.removeClass('hidden');
            statisticspage.addClass('hidden');
        });
    };
    var closeEditCategory = function () {
        closeBtn.click(function () {
            manageCat.addClass('hidden');
            transactionsForm.removeClass('hidden');
            statisticspage.addClass('hidden');
        });
        return false;
    };
    var saveNewCategory = function () {
        saveBtn.click(function () {
            ///nothing yet--try again later baiete!!
        });
        return false;
    };



    addCategory();
    openEditCategory();
    closeEditCategory();
    slideDownLimit();
    slideUpLimit();
});
