function initializeConcierge() {
    const conciergeContainer = document.createElement('div');
    conciergeContainer.id = 'concierge-chat';
    conciergeContainer.className = 'fixed bottom-5 right-5 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col transform transition-transform duration-300 translate-y-full';
    document.body.appendChild(conciergeContainer);

    const chatHeader = document.createElement('div');
    chatHeader.className = 'bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg';
    chatHeader.innerHTML = `
        <h3 class="font-bold text-lg">AI Concierge</h3>
        <button id="close-concierge" class="text-white">&times;</button>
    `;
    conciergeContainer.appendChild(chatHeader);

    const chatMessages = document.createElement('div');
    chatMessages.id = 'chat-messages';
    chatMessages.className = 'flex-1 p-4 overflow-y-auto';
    conciergeContainer.appendChild(chatMessages);

    const chatInputContainer = document.createElement('div');
    chatInputContainer.className = 'p-2 border-t border-gray-200 flex';
    chatInputContainer.innerHTML = `
        <input type="text" id="chat-input" class="flex-1 border rounded-lg px-3 py-2" placeholder="Ask me anything...">
        <button id="send-chat" class="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2">Send</button>
    `;
    conciergeContainer.appendChild(chatInputContainer);

    // Show the chat window
    setTimeout(() => {
        conciergeContainer.classList.remove('translate-y-full');
    }, 100);

    // Add event listeners
    document.getElementById('close-concierge').addEventListener('click', () => {
        conciergeContainer.classList.add('translate-y-full');
        setTimeout(() => {
            conciergeContainer.remove();
        }, 300);
    });

    document.getElementById('send-chat').addEventListener('click', sendMessage);
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (message) {
            addMessage(message, 'user');
            input.value = '';
            generateAiResponse(message);
        }
    }

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `my-2 p-2 rounded-lg ${sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200'}`;
        messageElement.innerText = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateAiResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        let response = "I'm sorry, I don't have the answer to that. Can I help with anything else?";

        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            response = 'Hello! How can I assist you today?';
        } else if (lowerCaseMessage.includes('restaurant') || lowerCaseMessage.includes('food')) {
            response = 'For an unforgettable meal, I recommend Xasapaki. They have amazing steaks and burgers. Another great option for seafood is Barbouni, located near the port.';
        } else if (lowerCaseMessage.includes('beach')) {
            response = 'Lambi Beach is the closest to you. For a more scenic experience, I suggest visiting Agios Stefanos or the unique Therma Beach with its natural hot springs.';
        } else if (lowerCaseMessage.includes('history') || lowerCaseMessage.includes('sites')) {
            response = 'You should definitely visit the Asklepion, the most important archaeological site on the island. Also, explore Neratzia Castle and the ancient Agora in Kos Town.';
        } else if (lowerCaseMessage.includes('transportation') || lowerCaseMessage.includes('get around')) {
            response = 'Renting a car or scooter is the best way to explore. You can also use the KTEL intercity buses for longer distances or local taxis.';
        } else if (lowerCaseMessage.includes('emergency')) {
            response = 'For any emergency, please dial 112. You can also find other important numbers in the "Important Info" section of the welcome book.';
        }

        setTimeout(() => {
            addMessage(response, 'ai');
        }, 500);
    }

    // Initial greeting
    setTimeout(() => {
        addMessage('Welcome to the AI Concierge! How can I help you explore Kos?', 'ai');
    }, 500);
}
