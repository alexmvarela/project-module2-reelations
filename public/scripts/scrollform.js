document.getElementById('filters-form').addEventListener('submit', function(event) {
    localStorage.setItem('scrollPos', window.scrollY || window.scrollTop || document.documentElement.scrollTop);
    });

    document.addEventListener('DOMContentLoaded', function() {
      let storedScrollPos = localStorage.getItem('scrollPos');
      if (storedScrollPos) {
        window.scrollTo(0, storedScrollPos);
        localStorage.removeItem('scrollPos');
      }
    });