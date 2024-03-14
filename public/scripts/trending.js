const initSlider = () => {
    const handleSlideButtons = (imageList, slideButtons) => {
        const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

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
                handleSlideButtons(imageList, slideButtons);
            });
        });

        imageList.addEventListener("scroll", () => {
            handleSlideButtons(imageList, slideButtons);
        });

        // Ocultar botones de desplazamiento al cargar la página
        handleSlideButtons(imageList, slideButtons);
    });
};

window.addEventListener('load', initSlider);
