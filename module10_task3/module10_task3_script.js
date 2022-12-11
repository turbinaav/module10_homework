const wsUri = 'wss://echo-ws-service.herokuapp.com';

function pageLoaded() {

    const connection = document.querySelector('.connection');
    const input = document.querySelector('.input');
    const btnSend = document.querySelector('.btn-send');
    const btnLocation = document.querySelector('.btn-location');
    const outputMessage = document.querySelector('.mes');

    let websocket = new WebSocket(wsUri);
    websocket.onopen = function (event) {
        connection.innerText = 'Соединение установлено';
    }

    websocket.onmessage = function (event) {
        let incomingMessage = event.data;
        writeAnswer(incomingMessage);
    }

    websocket.onerror = function (event) {
        connection.innerText = 'При передаче данных произошла ошибка';
    }

    function writeMessage(message) {
        outputMessage.innerHTML += `<p class="message">${message}</p>`
    };

    function writeAnswer(answer) {
        outputMessage.innerHTML += `<p class="answer">${answer}</p>`
    }

    btnSend.addEventListener('click', () => {
        const message = input.value;
        if (!message) return;
        writeMessage(message);
        websocket.send(message);
        input.value = '';
    });


    btnLocation.addEventListener('click', () => {
        if ('geolocation' in navigator) {
            connection.innerText = 'Определение местоположения…';
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
        } else {
            writeOutput('Браузер не поддерживает функцию определения местоположения');
        }
    });

    function locationSuccess(location) {
        let link = `https://www.openstreetmap.org/#map=18/${location.coords.latitude}/${location.coords.longitude}`;
        writeOutput(`<a href="${link}" target="_blank">Вы находитесь здесь</a>`);
        connection.innerText = '';
    }

    function locationError() {
        writeOutput('При получении местоположения произошла ошибка');
        connection.innerText = '';
    }

    function writeOutput(location) {
        outputMessage.innerHTML += `<p class="location">${location}</p>`;
    }

}

document.addEventListener('DOMContentLoaded', pageLoaded);