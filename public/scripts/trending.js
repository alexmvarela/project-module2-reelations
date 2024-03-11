const initSlider = () => {
    const sliderWrappers = document.querySelectorAll(".slider-wrapper");

    sliderWrappers.forEach((sliderWrapper) => {
        const imageList = sliderWrapper.querySelector(".image-list");
        const slideButtons = sliderWrapper.querySelectorAll(".slide-button");
        const imageItem = sliderWrapper.querySelector('.image-item');

        slideButtons.forEach(button => {
            button.addEventListener('click', () => {
                const direction = button.id.includes('prev') ? -1 : 1;
                const scrollAmount = imageItem.clientWidth * 2 * direction;
                imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        });
    });
}

window.addEventListener('load', initSlider);
