 const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const imageItem = document.querySelector('.image-item')

    slideButtons.forEach(button => {
        button.addEventListener('click', () => {
            const direction = button.id === 'prev-slide' ? -1 : 1;
            const scrollAmount = imageItem.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: 'smooth'})
        })
    })
 }
 
 
 window.addEventListener('load', initSlider);