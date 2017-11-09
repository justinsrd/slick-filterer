let container = document.createElement('div');
container.id = 'slickfilter-container';
let input = document.createElement('input');
input.id = 'slickfilter-input';
input.type = 'range';
input.min = 0;
input.max = 80;
input.value = 0;
input.onchange = ratingChangeHandler;
container.appendChild(input);
document.body.appendChild(container);



function ratingChangeHandler(evt) {
    const val = evt.target.value;
    console.log('val', val);
}


const deals = document.querySelectorAll('.dealitem');

for (var i = 0; i < deals.length; i++) {
    try {
        let deal = deals[i];
        let rating = parseInt(deal.children[0].children[0].children[0].textContent.trim().replace('+', ''));

        if (rating !== 25) {
            document.getElementById(deal.id).classList.add('super-hidden-deal');
        }
    } catch(e) {
        console.log(e);
    }
}
