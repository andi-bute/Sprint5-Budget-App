var cheltuieli = [{
    values: [190, 26, 55, 500, 400],
    labels: ['Palose', 'Cuie', 'Clante', 'Whiskey', 'Barbierit'],
    type: 'pie'
}];

var layoutexpenses = {
    title: 'All expense 01:01:2016 - 01:02:2016',
    height: 400,
    width: 500
};
var venituri = [{
    values: [10, 21, 143],
    labels: ['Part-Time Job', 'Freelancer contracts ', 'Nasa Job'],
    type: 'pie'
}];

var layoutincome = {
    title: 'All incomes 01:02:2016 - 01:02:2016',
    height: 400,
    width: 500
};
//draw plots



$(document).ready(function () {
    var manageCat = $('#managecat');
    var statisticsOption = $('#menu').find('li:nth-child(5)');
    var transactionsForm = $('#inputform');
    var closeButton = $('#closebutton');
    var statisticspage = $('#statistics');

    var openStatistics = function () {
        statisticsOption.click(function () {
            transactionsForm.addClass('hidden');
            manageCat.addClass('hidden');
            statisticspage.removeClass('hidden');
        });
    };
    var closeStatistics = function () {
        closeButton.click(function () {
            statisticspage.addClass('hidden');
            transactionsForm.removeClass('hidden');
        });
        return false;//nu prea merge preventdefault
    };
    Plotly.newPlot('inc', cheltuieli, layoutexpenses);
    Plotly.newPlot('chelt', venituri, layoutincome);

    openStatistics();
    closeStatistics();
});/**
 * Created by temujin on 29.01.2016.
 */
