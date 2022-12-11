window.onload = function () {

    const button = document.querySelector('.btn');
    const button_icon_1 = document.getElementById('icon_1');
    const button_icon_2 = document.getElementById('icon_2');

    button.addEventListener('click', () => {
        button_icon_1.classList.toggle('icon_1');
        button_icon_2.classList.toggle('icon_2');
    })
}