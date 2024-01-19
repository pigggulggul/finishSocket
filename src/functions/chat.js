import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const websocketUrl = 'http://localhost:8080/spring-boot-tutorial';
const topic = '/topic/greetings';
const app = '/app/hello';
var client = null;

export function connect(id, setChattingList) {
    const sock = new SockJS(websocketUrl);
    client = Stomp.over(sock);
    client.connect({}, () => {
        client.subscribe(topic, (payload) => {
            console.log('구독완료');
            console.log(JSON.parse(payload.body).content);
            showMessage(
                '은수',
                '1',
                JSON.parse(payload.body).content,
                setChattingList
            );
        });
    });
}

export function disconnect() {
    if (client !== null) {
        client.disconnect();
        console.log('Disconnected');
    }
}

function showMessage(userName, time, content, setChattingList) {
    setChattingList((props) => [
        ...props,
        { userName: userName, time: time, content: content },
    ]);
}

export function sendMessage(userName, time, content, setChattingList) {
    client.send(app, {}, JSON.stringify({ name: content }));
}

function setConnected(connected) {
    // buttonConnect.disabled = connected;
    // buttonDisConnect.disabled = !connected;
    // buttonSend.disabled = !connected;
    // if (connected) {
    //   conversationDisplay.style.display = "block";
    // } else {
    //   conversationDisplay.style.display = "none";
    // }
    // greetings.innerHTML = '';
}

// document.addEventListener("DOMContentLoaded", function () {
//   buttonConnect = document.getElementById("connect");
//   buttonDisConnect = document.getElementById("disconnect");
//   buttonSend = document.getElementById("send");
// conversationDisplay = document.getElementById("conversation");
// greetings = document.getElementById('greetings');
//   formInput = document.getElementById("form");
//   nameInput = document.getElementById("name");
//   buttonConnect.addEventListener("click", (e) => {
//     connect();
//     e.preventDefault();
//   });
//   buttonDisConnect.addEventListener("click", (e) => {
//     disconnect();
//     e.preventDefault();
//   });
//   buttonSend.addEventListener("click", (e) => {
//     sendMessage();
//     e.preventDefault();
//   });
//   formInput.addEventListener("submit", (e) => e.preventDefault());
//   setConnected(false);
// });
