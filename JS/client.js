
const socket = io('http://localhost:8000')

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')
var receiveAudio = new Audio('sounds/receive.mp3')
var joinAudio = new Audio('sounds/join.mp3')

const append =(message,position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
    if(position == 'left'){
        receiveAudio.play()
    }
    // if(position == 'right'){
    //     sendAudio.play()
    // }
}
const appendJ =(message,position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add("join");
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
    if(position == 'left'){
        joinAudio.play()
    }
    // if(position == 'right'){
    //     sendAudio.play()
    // }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value = '';

})

let name= prompt("Enter your name to join : ")
socket.emit('new-user-joined',name)

socket.on('user-joined', name =>{
    appendJ(`${name}: joined the chat.`,'left')
   
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('left', name =>{
    appendJ(`${name}: is disconnected.`,'left')
})