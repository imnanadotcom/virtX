let index = 0;
const slides = document.querySelector(".carousel");
const slideImages = document.querySelectorAll(".carousel img");
const totalSlides = slideImages.length;

// Set the carousel width dynamically based on the number of images
slides.style.width = `${totalSlides * 100}vw`;
slideImages.forEach(img => img.style.width = `100vw`);

function moveSlide(step) {
    index += step;

    // If we reach the last image, go back to the first one
    if (index < 0) {
        index = totalSlides - 1;
    } else if (index >= totalSlides) {
        index = 0;
    }

    slides.style.transform = `translateX(${-index * 100}vw)`;
}

// Auto-slide every 3 seconds
let autoSlide = setInterval(() => moveSlide(1), 3000);

// Buttons functionality
document.querySelector(".prev").addEventListener("click", function () {
    moveSlide(-1);
    resetAutoSlide();
});

document.querySelector(".next").addEventListener("click", function () {
    moveSlide(1);
    resetAutoSlide();
});

// Reset the auto-slide timer when manually interacting

function resetAutoSlide() {

    clearInterval(autoSlide);
    autoSlide = setInterval(() => moveSlide(1), 3000);

}
