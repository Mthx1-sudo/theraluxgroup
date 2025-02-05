document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.control-btn.prev');
    const nextBtn = document.querySelector('.control-btn.next-btn'); // Ensure this class is unique to the button
    const indicatorsContainer = document.querySelector('.indicators');
    let currentIndex = 0;

    // Create indicators
    items.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === currentIndex) indicator.classList.add('active');
        indicator.addEventListener('click', () => gotoSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');

    // Function to update the carousel state
    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active', 'next', 'prev');

            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === (currentIndex + 1) % items.length) {
                item.classList.add('next');
            } else if (index === (currentIndex - 1 + items.length) % items.length) {
                item.classList.add('prev');
            }
        });

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Function to go to a specific slide
    function gotoSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Function to go to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }

    // Function to go to the previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }

    // Event listeners for buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Event delegation for clicking on the next or previous tile
    carousel.addEventListener('click', (e) => {
        const clickedItem = e.target.closest('.carousel-item');
        if (clickedItem) {
            if (clickedItem.classList.contains('next')) {
                nextSlide();
            } else if (clickedItem.classList.contains('prev')) {
                prevSlide();
            }
        }
    });

    // Touch handling for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) nextSlide(); // Swipe left
        if (touchEndX - touchStartX > 50) prevSlide(); // Swipe right
    });

    // Auto-advance (optional)
    //setInterval(nextSlide, 5000);
});

document.addEventListener('mousemove', (e) => {
    const title = document.querySelector('.header-title');
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalize mouse position (-1 to 1)
    const xPercent = (clientX / innerWidth) * 2 - 1; // Left (-1) to Right (1)
    const yPercent = (clientY / innerHeight) * 2 - 1; // Top (-1) to Bottom (1)

    // Adjust glow strength based on mouse position
    const blueGlow = `rgba(0, 0, 255, ${0.8 - Math.abs(xPercent)})`;  // Blue (Left)
    const purpleGlow = `rgba(128, 0, 128, ${0.8 - Math.abs(yPercent)})`; // Purple (Middle)
    const redGlow = `rgba(255, 0, 0, ${0.8 - Math.abs(xPercent)})`;  // Red (Middle-Right)
    const yellowGlow = `rgba(255, 255, 0, ${0.8 - Math.abs(yPercent)})`;  // Yellow (Right)

    // Apply dynamic text shadow
    title.style.textShadow = `
        ${-10 * xPercent}px ${-5 * yPercent}px 20px ${blueGlow},
        ${0}px ${5 * yPercent}px 25px ${purpleGlow},
        ${10 * xPercent}px ${-5 * yPercent}px 20px ${redGlow},
        ${15 * xPercent}px ${5 * yPercent}px 15px ${yellowGlow}
    `;
});
