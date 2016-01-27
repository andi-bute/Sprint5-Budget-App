var testRepo = new Repository("http://localhost:8080/persoana");

var $testTable = $("#testRepositoriesTable");

$(document).ready(function () {

    $('#testForm').submit(function(){
        var newId = $('#inputID').val();
        var newName = $('#inputName').val();
        testRepo.add({id:newId , name:newName});
        console.log("submit");
        return false;
    });

    $('body').on("keypress", function (e) {
        if (e.keyCode == "32") {
            //test UIController
            //var testTableController = new UIController($('#testRepositoriesTable'));
            //testTableController.fill();
            testRepo.getAll();
            //console.log(testRepo.getLocalStore());
            var data = testRepo.getLocalStore();
            $testTable.empty();
            data.forEach(function (item) {
                $testTable.append(tmpl("repositoriesTableTemplate", item))
            });

        }
    });
});