var displayBudget = function() {
	budgetRepository.get().then(function(data) {
		$('#budget-box').text(data);
	})
};

var updateBudget = function(type, amount) {
	budgetRepository.update(type, amount).then(function(data) {
		$('#budget-box').text(data);
	})
};

var enableModifyBudget = function() {
	DOMeditBudgetBtn.removeClass("transition");
	DOMeditBudgetBtn.fadeOut(function (){
	    DOMacceptEditBudgetBtn.fadeIn(function () {
	     	DOMacceptEditBudgetBtn.addClass("transition");
	    });
	    DOMcancelEditBudgetBtn.fadeIn(function () {
	    	DOMcancelEditBudgetBtn.addClass("transition");
	     	var budget = $('#budget-box').text();
			$('#budget-box').replaceWith("<input class='edit-budget-input' type='text' value='" + budget + "'/>");
			fluidizeInput();
			$('.edit-budget-input').focus();
	    });  
	})
};

var acceptModifiedBudget = function() {
	updateBudget("set", parseFloat($('.edit-budget-input').val()));
	var budget = $('.edit-budget-input').val();
	$('.edit-budget-input').replaceWith("<h3 class='inline stable-width' id='budget-box'>" + budget + "</h3>");
  	DOMacceptEditBudgetBtn.removeClass("transition");
  	DOMcancelEditBudgetBtn.removeClass("transition");
  	DOMacceptEditBudgetBtn.fadeOut(function() {
  		DOMeditBudgetBtn.fadeIn(function() {
  			DOMeditBudgetBtn.addClass("transition");
  		})
  	});
  	DOMcancelEditBudgetBtn.fadeOut();
};

var cancelModifiedBudget = function() {
	budgetRepository.get().then(function(data) {
  		$('.edit-budget-input').replaceWith("<h3 class='inline stable-width' id='budget-box'>" + data + "</h3>");
  	});
  	DOMacceptEditBudgetBtn.removeClass("transition");
  	DOMcancelEditBudgetBtn.removeClass("transition");
  	DOMacceptEditBudgetBtn.fadeOut(function() {
  		DOMeditBudgetBtn.fadeIn(function() {
  			DOMeditBudgetBtn.addClass("transition");
  		})
  	});
  	DOMcancelEditBudgetBtn.fadeOut();
};

var fluidizeInput = function() {
	var newwidth = (($('.edit-budget-input').val().length) * 13.2) + 'px';
	$('.edit-budget-input').css("width", newwidth);
};

var initializeBudget = function() {
	transactionsRepository.getAll().then(function(data) {
		var sum = 0;
		$.each(data, function(index) {
			sum = sum + data[index].amount;
		});
		updateBudget("set", sum);
	})
};