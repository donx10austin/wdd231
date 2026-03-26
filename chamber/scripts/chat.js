document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.querySelector('.chat-button');
    const chatBubble = document.querySelector('.chat-bubble');
    const chatClose = document.querySelector('.chat-close');
    const chatNotice = document.querySelector('.chat-notice');

    // 1. Open the chat bubble
    chatButton.addEventListener('click', () => {
        chatBubble.classList.add('active');
        // Hide the "1" notification once clicked
        if (chatNotice) chatNotice.style.display = 'none';
    });

    // 2. Close the chat bubble
    chatClose.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents the click from re-opening the bubble
        chatBubble.classList.remove('active');
    });
});