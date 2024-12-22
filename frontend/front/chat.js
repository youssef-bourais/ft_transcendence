import { SecureApiRequest  } from './api.js';
let socket = null;
let currentRecipient = null;
let friends = [];
const currentUserName = localStorage.getItem("username");

export function loadChatInterface() {
    const content = document.getElementById('con');
    content.innerHTML = `
    <div class="container-main-home">
    <div class="child-container-main-home">
    <div class="chat-interface">
        <div class="friends-list">
            <h2>Chat</h2>
            <ul id="friendsList"></ul>
        </div>
        <div class="chat-area hidden">
            <div id="chatHeader">
                <div class="chat-header-left">
                    <img id="chatHeaderImage" src="" alt="Friend's avatar" class="friend-avatar">
                    <span id="chatHeaderName"></span>
                </div>
                <div class="chat-header-right">
                    <button id="chatOptionsButton">
                        <i class='bx bx-dots-horizontal-rounded'></i>
                    </button>
                    <div id="chatOptionsMenu" class="hidden">
                        <button class="block-user"><strong>Block user</strong></button>
                        <button><strong>Invite for a game</strong></button>
                    </div>
                </div>
            </div>
            <div id="messagesContainer" class="messages-container"></div>
            <div class="input-area">
                <input type="text" id="messageInput" placeholder="Type your message...">
                <button id="sendButton">
                    <i class='bx bxs-send'></i>
                </button>
            </div>
        </div>
    </div>
    </div>
    </div>
    `;
    // content.innerHTML = `<h1>hola</h1>`;
    console.log("alexander");
    initializeChat();
}

function initializeChat() {
    const friendsList = document.getElementById('friendsList');
    const messagesContainer = document.getElementById('messagesContainer');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatOptionsButton = document.getElementById('chatOptionsButton');
    const chatOptionsMenu = document.getElementById('chatOptionsMenu');

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    chatOptionsButton.addEventListener('click', () => {
        chatOptionsMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!chatOptionsButton.contains(e.target) && !chatOptionsMenu.contains(e.target)) {
            chatOptionsMenu.classList.add('hidden');
        }
    });

    connectWebSocket();
    fetchFriends();
}

function connectWebSocket() {
    socket = new WebSocket(`https://${window.location.host}/ws/chat`);

    socket.onopen = function(e) {
        console.log("WebSocket connection established");
    };

    socket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        if (data.type === 'chat') {
            displayMessage(data);
        } else if (data.type === 'conversation_history') {
            displayConversationHistory(data.messages);
        }
    };

    socket.onclose = function(e) {
        console.log("WebSocket connection closed");
    };
}

async function fetchFriends() {
    // try {
    //     const response = await SecureApiRequest('/friends/');
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     const friendData = await response.json();
    //     friends = friendData.map(friend => ({
    //         name: friend.friend_name,
    //         avatar: friend.avatar_url
    //     }));
    //     renderFriends();
    // } catch (error) {
        // console.error('Error fetching friends:', error);
        friends = [
            { name: "eel-hour", avatar: "https://cdn-images-3.listennotes.com/podcasts/two-dead-pines/lsd-trip-report-Qe0E3pjyGlg-USIahZq6KYe.1400x1400.jpg?_gl=1*2qe68d*_ga*ODMxNDUyOTgxLjE3MzMxNDk5MzY.*_ga_T0PZE2Z7L4*MTczMzE0OTkzNS4xLjAuMTczMzE0OTk0My41Mi4wLjA." },
            { name: "ybourais", avatar: "https://cdn-images-3.listennotes.com/podcasts/two-dead-pines/lsd-trip-report-Qe0E3pjyGlg-USIahZq6KYe.1400x1400.jpg?_gl=1*2qe68d*_ga*ODMxNDUyOTgxLjE3MzMxNDk5MzY.*_ga_T0PZE2Z7L4*MTczMzE0OTkzNS4xLjAuMTczMzE0OTk0My41Mi4wLjA." }
        ];
        renderFriends();
    // }
}

function renderFriends() {
    const friendsList = document.getElementById('friendsList');
    friendsList.innerHTML = '';
    friends.forEach(friend => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="friend-item">
                <img src="${friend.avatar}" alt="${friend.name}'s avatar" class="friend-avatar">
                <span class="friend-name">${friend.name}</span>
            </div>
        `;
        li.addEventListener('click', () => selectFriend(friend));
        friendsList.appendChild(li);
    });
}

async function selectFriend(friend) {
    currentRecipient = friend.name;
    fetchConversationHistory(friend.name);
    
    const chatArea = document.querySelector('.chat-area');
    chatArea.classList.remove('hidden');
    chatArea.classList.add('slide-in');
    
    const friendsList = document.querySelector('.friends-list');
    // friendsList.classList.add('shrink');
    
    const chatHeader = document.getElementById('chatHeader');
    const chatHeaderImage = document.getElementById('chatHeaderImage');
    const chatHeaderName = document.getElementById('chatHeaderName');
    
    chatHeaderImage.src = friend.avatar;
    chatHeaderName.textContent = friend.name;
}

function fetchConversationHistory(otherUser) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            type: 'fetch_messages',
            sender: currentUserName,
            other_user: otherUser
        }));
    } else {
        console.error("WebSocket is not connected");
    }
}

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message && currentRecipient) {
        socket.send(JSON.stringify({
            type: 'chat',
            body: message,
            sender: currentUserName,
            recipient: currentRecipient
        }));
        messageInput.value = '';
    }
}

async function displayMessage(message) {
    // console.log(message);
    const messagesContainer = document.getElementById('messagesContainer');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    const isCurrentUser = message.sender__username === currentUserName;
    // console.log(message.sender__username + "    "  +  currentUserName);
    // console.log(isCurrentUser);
    messageElement.classList.add(isCurrentUser ? 'sent' : 'received');
    
    const contentSpan = document.createElement('span');
    contentSpan.classList.add('message-content');
    contentSpan.textContent = message.body;
    
    if (!isCurrentUser) {
        const senderSpan = document.createElement('span');
        senderSpan.classList.add('message-sender');
        senderSpan.textContent = ``;
        messageElement.appendChild(senderSpan);
    }
    
    messageElement.appendChild(contentSpan);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function displayConversationHistory(messages) {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = '';
    messages.forEach(displayMessage);
}


/////new

// import { SecureApiRequest  } from './api.js';

// let socket = null;
// let currentRecipient = null;
// let friends = [];
// const currentUserName = 'AlexanderTG';

// export function loadChatInterface() {
//     const content = document.getElementById('content');
//     content.innerHTML = `
//     <div class="chat-container">
//         <div class="chat-interface">
//             <div class="friends-list">
//                 <h2>Direct Messages</h2>
//                 <ul id="friendsList"></ul>
//             </div>
//             <div class="chat-area hidden">
//                 <div id="chatHeader">
//                     <div class="chat-header-left">
//                         <img id="chatHeaderImage" src="" alt="Friend's avatar" class="friend-avatar">
//                         <span id="chatHeaderName"></span>
//                     </div>
//                     <div class="chat-header-right">
//                         <button id="chatOptionsButton">
//                             <i class='bx bx-dots-horizontal-rounded'></i>
//                         </button>
//                         <div id="chatOptionsMenu" class="hidden">
//                             <button class="block-user">Block user</button>
//                             <button>Invite for a game</button>
//                         </div>
//                     </div>
//                 </div>
//                 <div id="messagesContainer" class="messages-container"></div>
//                 <div class="input-area">
//                     <input type="text" id="messageInput" placeholder="Type your message...">
//                     <button id="sendButton">
//                         <i class='bx bxs-send'></i>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `;

//     initializeChat();
// }
// async function initializeChat() {
//     // Get the new DOM elements
//     const friendsList = document.getElementById('friendsList');
//     const messagesContainer = document.getElementById('messagesContainer');
//     const messageInput = document.getElementById('messageInput');
//     const sendButton = document.getElementById('sendButton');

//     // Set up event listeners
//     sendButton.addEventListener('click', sendMessage);
//     messageInput.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     });

//     // Initialize WebSocket and fetch friends
//     connectWebSocket();
//     fetchFriends();
// }

// async function connectWebSocket() {
//     socket = new WebSocket(`ws://${window.location.host}/ws/chat`);

//     socket.onopen = function(e) {
//         console.log("WebSocket connection established");
//     };

//     socket.onmessage = function(e) {
//         const data = JSON.parse(e.data);
//         if (data.type === 'chat') {
//             displayMessage(data);
//         } else if (data.type === 'conversation_history') {
//             displayConversationHistory(data.messages);
//         }
//     };

//     socket.onclose = function(e) {
//         console.log("WebSocket connection closed");
//     };
// }

// async function fetchFriends() {
//         try {
//             response = SecureApiRequest('/friends/');
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const friendData = await response.json();
//             friends = friendData.map(friend => ({
//                 name: friend.friend_name
//             }));
//             renderFriends();
//         } catch (error) {
//             console.error('Error fetching friends:', error);
//             friends = [
//                 { name: "admin" }
//             ];
//             renderFriends();
//             // friendsList.innerHTML = '<li>Error loading friends. Please try again later.</li>';
//         }
// }

// // Render friends list
// async function renderFriends() {
//     friendsList.innerHTML = '';
//     friends.forEach(friend => {
//         const li = document.createElement('li');
//         li.textContent = friend.name;
//         li.dataset.id = friend.id; // Store the id in the DOM element
//         li.addEventListener('click', () => selectFriend(friend.name));
//         friendsList.appendChild(li);
//     });
// }

// function selectFriend(friendName) {
//     currentRecipient = friendName;
//     fetchConversationHistory(friendName);
//     // Update UI to show selected friend
//     const chatHeader = document.getElementById('chatHeader');
//     chatHeader.textContent = `${friendName}`;
// }

// function fetchConversationHistory(otherUser) {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.send(JSON.stringify({
//             type: 'fetch_messages',
//             other_user: otherUser
//         }));
//     } else {
//         console.error("WebSocket is not connected");
//     }
// }

// function sendMessage() {
//     const messageInput = document.getElementById('messageInput');
//     const message = messageInput.value.trim();
    
//     if (message && currentRecipient) {
//         socket.send(JSON.stringify({
//             type: 'chat',
//             body: message,
//             recipient: currentRecipient
//         }));
//         messageInput.value = '';
//     }
// }


// async function displayMessage(message) {
//     console.log(message);
//     const messagesContainer = document.getElementById('messagesContainer');
//     const messageElement = document.createElement('div');
//     messageElement.classList.add('message');
    
//     const isCurrentUser = message.sender__username === currentUserName;
//     console.log(message.sender__username + "    "  +  currentUserName);
//     console.log(isCurrentUser);
//     messageElement.classList.add(isCurrentUser ? 'sent' : 'received');
    
//     const contentSpan = document.createElement('span');
//     contentSpan.classList.add('message-content');
//     contentSpan.textContent = message.body;
    
//     if (!isCurrentUser) {
//         const senderSpan = document.createElement('span');
//         senderSpan.classList.add('message-sender');
//         senderSpan.textContent = ``;
//         messageElement.appendChild(senderSpan);
//     }
    
//     messageElement.appendChild(contentSpan);
//     messagesContainer.appendChild(messageElement);
//     messagesContainer.scrollTop = messagesContainer.scrollHeight;
// }


// function displayConversationHistory(messages) {
//     const messagesContainer = document.getElementById('messagesContainer');
//     messagesContainer.innerHTML = '';
//     messages.forEach(displayMessage);
// }

