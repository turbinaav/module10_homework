window.onload = function () {
    const button = document.querySelector('.btn');

    button.addEventListener('click', () => {
        alert(`Размер экрана: ${window.screen.width} x ${window.screen.height}`)
    })
}