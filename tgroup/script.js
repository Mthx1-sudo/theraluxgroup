// Add hover effects or animations (optional)
const tiles = document.querySelectorAll('.tile');

tiles.forEach(tile => {
    tile.addEventListener('mouseenter', () => {
        tile.style.transform = 'scale(1.05)';
    });

    tile.addEventListener('mouseleave', () => {
        tile.style.transform = 'scale(1)';
    });
});
