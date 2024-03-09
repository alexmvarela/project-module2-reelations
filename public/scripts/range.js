const currentRange = document.getElementById('customRange3')
const rangeValue = document.getElementById('rangeValue')

currentRange.addEventListener('input', function() {

    rangeValue.textContent = this.value;

    if(this.value === '2030') {
        rangeValue.textContent = 'All Decades'
    }

    
  });




