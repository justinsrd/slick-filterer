'use strict';

(function haveFeaturedDealsLoadedYet() {
    if (!document.getElementById('featureDealsAndCoupons')) {
        window.requestAnimationFrame(haveFeaturedDealsLoadedYet);
    } else {
        init();
    }
})();

function init() {
    const deals = document.querySelectorAll('.frontpage');
    const DEFAULT_MAX_SLIDER_VAL = 80;

    $.get(chrome.extension.getURL('slickfilter.html'), function(data) {
        document.getElementById('globalBar').innerHTML += data;
        $('#slickfilter-input').attr('max', DEFAULT_MAX_SLIDER_VAL);
        $('#max').val(DEFAULT_MAX_SLIDER_VAL);
        setMaxSliderValue();
        $('#slickfilter-input').on('input', hideDeals);
        $('#max').on('change', setMaxSliderValue);
        $('#slickfilter-container').css('height', document.getElementById('globalBar').offsetHeight);
    });

    function hideDeals(evt) {
        const input = evt.target.value;
        if (parseInt(input) || input === '0') {
            $('#display-number').html(input);
            for (let i = 0; i < deals.length; i++) {
                try {
                    let dealId = deals[i].dataset.threadid;
                    let domItem = document.querySelector('.frontpage[data-threadid="' + dealId + '"]');
                    let rating = parseInt(domItem.querySelector('.count').textContent);

                    domItem.classList.remove('super-hidden-deal');

                    if (rating < input) {
                        domItem.classList.add('super-hidden-deal');
                        if (deals[i].dataset && deals[i].dataset.promotedid) {
                            document.querySelectorAll('.frontpage[data-threadid="' + dealId + '"]').forEach(function(item) {
                                item.classList.add('super-hidden-deal');
                            });
                        }
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
        $('#max').val(maxSliderVal);
        $('#slickfilter-input').val(0);
        $('#display-number').html(0);
        $('#slickfilter-input').attr('max', maxSliderVal);
    }
}