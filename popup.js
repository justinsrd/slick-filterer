'use strict';

const deals = document.querySelectorAll('.dealitem');
const DEFAULT_MAX_SLIDER_VAL = 80;

$(document).ready(function() {
	$.get(chrome.extension.getURL('slickfilter.html'), function(data) {
		document.getElementById('top_userbar').innerHTML += data;
		const maxBox = $('#max');
		const inputBox = $('#slickfilter-input');
		inputBox.attr('max', DEFAULT_MAX_SLIDER_VAL);
		maxBox.val(DEFAULT_MAX_SLIDER_VAL);
		setMaxSliderValue();
		inputBox.on('input', hideDeals);
		maxBox.on('change', setMaxSliderValue);
	});
});

function hideDeals(evt) {
    const input = evt.target.value;
    if (parseInt(input) || input === '0') {
        $('#display-number').html(input);
        for (let i = 0; i < deals.length; i++) {
            try {
                let deal = deals[i];
                let rating = parseInt(deal.children[0].children[0].children[0].textContent.trim().replace('+', ''));
                document.getElementById(deal.id).classList.remove('super-hidden-deal');
                if (rating < input) {
                    document.getElementById(deal.id).classList.add('super-hidden-deal');
                }
            } catch(e) {
                
            }
        }
    } else { //if non int is entered
        setMaxSliderValue();
    }
}

function setMaxSliderValue(evt) {
    const maxSliderVal = (evt && parseInt(evt.target.value)) ? evt.target.value : DEFAULT_MAX_SLIDER_VAL;
	const inputBox = $('#slickfilter-input');
	$('#max').val(maxSliderVal);
    inputBox.val(0);
    $('#display-number').html(0);
    inputBox.attr('max', maxSliderVal);
}