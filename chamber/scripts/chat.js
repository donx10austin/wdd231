// chat.js — Simple toggle for the chat widget.

window.addEventListener('DOMContentLoaded', () => {
    const widget = document.querySelector('.chat-widget');
    const toggleButton = widget?.querySelector('.chat-button');
    const closeButton = widget?.querySelector('.chat-close');

    if (!widget || !toggleButton || !closeButton) return;

    const openChat = () => {
        widget.classList.add('open');
        toggleButton.setAttribute('aria-label', 'Close chat');
    };

    const closeChat = () => {
        widget.classList.remove('open');
        toggleButton.setAttribute('aria-label', 'Open chat');
    };

    toggleButton.addEventListener('click', () => {
        widget.classList.toggle('open');
        if (widget.classList.contains('open')) {
            openChat();
        } else {
            closeChat();
        }
    });

    closeButton.addEventListener('click', closeChat);

    // Close chat on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && widget.classList.contains('open')) {
            closeChat();
        }
    });
});
