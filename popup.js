'use strict';

(function haveFeaturedDealsLoadedYet() {
    init();
})();

function init() {
    let deals;
    const DEFAULT_MAX_SLIDER_VAL = 80;

    $.get(chrome.extension.getURL('slickfilter.html'), function(data) {
        if (document.querySelector('.top_userbar_container')) { // when user is logged in/out
            deals = document.querySelectorAll('[data-module-name="Frontpage Deals"] .dealitem:not(.expiredbutton)');
            document.querySelector('.top_userbar_container').innerHTML += data;

            $('#slickfilter-input').attr('max', DEFAULT_MAX_SLIDER_VAL);
            $('#max').val(DEFAULT_MAX_SLIDER_VAL);
            setMaxSliderValue();
            $('#slickfilter-input').on('input', hideDealsLoggedIn);
            $('#max').on('change', setMaxSliderValue);
            $('#slickfilter-container').css('height', document.getElementById('top_userbar').offsetHeight);
        } else { // when user has not logged in before
            deals = document.querySelectorAll('.frontpage');
            document.querySelector('#globalBar .inner').innerHTML += data;

            $('#slickfilter-input').attr('max', DEFAULT_MAX_SLIDER_VAL);
            $('#max').val(DEFAULT_MAX_SLIDER_VAL);
            setMaxSliderValue();
            $('#slickfilter-input').on('input', hideDealsClean);
            $('#max').on('change', setMaxSliderValue);
            $('#slickfilter-container').css('height', document.getElementById('globalBar').offsetHeight);
        }
    });

    function hideDealsClean(evt) {
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

    function hideDealsLoggedIn(evt) {
        const input = evt.target.value;
        if (parseInt(input) || input === '0') {
            $('#display-number').html(input);
            for (let i = 0; i < deals.length; i++) {
                try {
                    let dealId = deals[i].dataset.threadid;
                    let domItem = document.querySelector('[data-threadid="' + dealId + '"]');
                    let rating = parseInt(domItem.querySelector('.rating').textContent.replace('+', '')); 
                    domItem.classList.remove('super-hidden-deal');
                    if (rating < input) {
                        domItem.classList.add('super-hidden-deal');
                        if (deals[i].dataset && deals[i].dataset.promotedid) {
                            document.querySelectorAll('[data-threadid="' + dealId + '"]').forEach(function(item) {
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