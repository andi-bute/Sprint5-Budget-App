var DOMbudgetBox = $('#budget-box');
var DOMeditBudgetBtn = $('#btn-edit-budget');
var DOMacceptEditBudgetBtn = $('#btn-accept-edit-budget');
var DOMcancelEditBudgetBtn = $('#btn-cancel-edit-budget');

var displayBudget = function() {
	budgetRepository.get().then(function(data) {
		$('#budget-box').text(data);
	})
}

var updateBudget = function(type, amount) {
	budgetRepository.update(type, amount).then(function(data) {
		$('#budget-box').text(data);
	})
}

var enableModifyBudget = function() {
	DOMeditBudgetBtn.removeClass("transition");
	DOMeditBudgetBtn.fadeOut(function (){
	    DOMacceptEditBudgetBtn.fadeIn(function () {
	     	DOMacceptEditBudgetBtn.addClass("transition");
	    });
	    DOMcancelEditBudgetBtn.fadeIn(function () {
	    	DOMcancelEditBudgetBtn.addClass("transition");
	     	var budget = $('#budget-box').text();
			$('#budget-box').replaceWith("<input class='edit-update-input' type='text' value='" + budget + "'/>");
			fluidizeInput();
			$('.edit-update-input').focus();
	    });  
	})
}

var acceptModifiedBudget = function() {
	updateBudget("set", parseFloat($('.edit-update-input').val()));
	var budget = $('.edit-update-input').val();
	$('.edit-update-input').replaceWith("<h3 class='inline stable-width' id='budget-box'>" + budget + "</h3>");
  	DOMacceptEditBudgetBtn.removeClass("transition");
  	DOMcancelEditBudgetBtn.removeClass("transition");
  	DOMacceptEditBudgetBtn.fadeOut(function() {
  		DOMeditBudgetBtn.fadeIn(function() {
  			DOMeditBudgetBtn.addClass("transition");
  		})
  	})
  	DOMcancelEditBudgetBtn.fadeOut();
}

var cancelModifiedBudget = function() {
	budgetRepository.get().then(function(data) {
  		$('.edit-update-input').replaceWith("<h3 class='inline stable-width' id='budget-box'>" + data + "</h3>");
  	})
  	DOMacceptEditBudgetBtn.removeClass("transition");
  	DOMcancelEditBudgetBtn.removeClass("transition");
  	DOMacceptEditBudgetBtn.fadeOut(function() {
  		DOMeditBudgetBtn.fadeIn(function() {
  			DOMeditBudgetBtn.addClass("transition");
  		})
  	})
  	DOMcancelEditBudgetBtn.fadeOut();
}

var fluidizeInput = function() {
	var newwidth = (($('.edit-update-input').val().length) * 13.2) + 2 + 'px';
	$('.edit-update-input').css("width", newwidth);
}

$(document).ready(function() {
	displayBudget();
	DOMeditBudgetBtn.on('click', enableModifyBudget);
	DOMacceptEditBudgetBtn.on('click', acceptModifiedBudget);
	DOMcancelEditBudgetBtn.on('click', cancelModifiedBudget);
	$('.budget').on('keyup', '.edit-update-input', fluidizeInput);
});