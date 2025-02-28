let totalComments = 0; // Total comments counter
const adminPassword = "0099"; // Admin secret key

// Load comments from local storage when the page loads
document.addEventListener('DOMContentLoaded', function () {
    loadComments();
});

// Function to load comments from local storage
function loadComments() {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    totalComments = savedComments.length;
    document.getElementById('totalComments').textContent = `कुल टिप्पणियाँ: ${totalComments}`;

    savedComments.forEach(comment => {
        addCommentToDOM(comment.name, comment.text, comment.likes, comment.dislikes, comment.replies);
    });
}

// Function to add a comment to the DOM
function addCommentToDOM(name, text, likes = 0, dislikes = 0, replies = []) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
        <strong>${name}:</strong> ${text}
        <div class="like-dislike-buttons">
            <button onclick="likeComment(this)">👍 <span>${likes}</span></button>
            <button onclick="dislikeComment(this)">👎 <span>${dislikes}</span></button>
            <button class="reply-button" onclick="showReplyForm(this)">जवाब दें</button>
        </div>
        <div class="reply-form">
            <input type="text" placeholder="नाम" class="reply-name" required>
            <textarea placeholder="जवाब" class="reply-text" required></textarea>
            <button onclick="submitReply(this)">जवाब सबमिट करें</button>
        </div>
        <div class="replies">
            ${replies.map(reply => `<div class="reply"><strong>${reply.name}:</strong> ${reply.text}</div>`).join('')}
        </div>
        <button class="delete-button" onclick="deleteComment(this)">Delete</button>
    `;

    document.getElementById('commentsSection').appendChild(commentElement);
}

// Function to save comments to local storage
function saveComment(name, text, likes = 0, dislikes = 0, replies = []) {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    savedComments.push({ name, text, likes, dislikes, replies });
    localStorage.setItem('comments', JSON.stringify(savedComments));
}

// Function to update comments in local storage
function updateCommentsInStorage() {
    const comments = [];
    document.querySelectorAll('.comment').forEach(commentElement => {
        const name = commentElement.querySelector('strong').textContent.replace(':', '');
        const text = commentElement.childNodes[2].textContent.trim();
        const likes = parseInt(commentElement.querySelector('.like-dislike-buttons span').textContent);
        const dislikes = parseInt(commentElement.querySelector('.like-dislike-buttons span:nth-child(2)').textContent);
        const replies = [];
        commentElement.querySelectorAll('.reply').forEach(replyElement => {
            const replyName = replyElement.querySelector('strong').textContent.replace(':', '');
            const replyText = replyElement.childNodes[2].textContent.trim();
            replies.push({ name: replyName, text: replyText });
        });
        comments.push({ name, text, likes, dislikes, replies });
    });
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Submit comment form
document.getElementById('commentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    // Add comment to DOM
    addCommentToDOM(name, comment);

    // Save comment to local storage
    saveComment(name, comment);

    // Update total comments count
    totalComments++;
    document.getElementById('totalComments').textContent = `कुल टिप्पणियाँ: ${totalComments}`;

    // Clear form
    document.getElementById('commentForm').reset();
});

// Like comment function
function likeComment(button) {
    const likeCount = button.querySelector('span');
    let count = parseInt(likeCount.textContent);
    count++;
    likeCount.textContent = count;
    updateCommentsInStorage();
}

// Dislike comment function
function dislikeComment(button) {
    const dislikeCount = button.querySelector('span');
    let count = parseInt(dislikeCount.textContent);
    count++;
    dislikeCount.textContent = count;
    updateCommentsInStorage();
}

// Show reply form function
function showReplyForm(button) {
    const replyForm = button.parentElement.nextElementSibling;
    replyForm.style.display = 'block';
}

// Submit reply function
function submitReply(button) {
    const replyForm = button.parentElement;
    const replyName = replyForm.querySelector('.reply-name').value;
    const replyText = replyForm.querySelector('.reply-text').value;

    if (replyName && replyText) {
        const replyElement = document.createElement('div');
        replyElement.classList.add('reply');
        replyElement.innerHTML = `<strong>${replyName}:</strong> ${replyText}`;

        const repliesSection = replyForm.nextElementSibling;
        repliesSection.appendChild(replyElement);

        // Clear reply form
        replyForm.querySelector('.reply-name').value = '';
        replyForm.querySelector('.reply-text').value = '';
        replyForm.style.display = 'none';

        // Update comments in local storage
        updateCommentsInStorage();
    }
}

// Delete comment function
function deleteComment(button) {
    const password = prompt("Admin password dalen:");
    if (password === adminPassword) {
        const commentElement = button.parentElement;
        commentElement.remove();
        totalComments--;
        document.getElementById('totalComments').textContent = `कुल टिप्पणियाँ: ${totalComments}`;
        updateCommentsInStorage();
    } else {
        alert("Galat password! Sirf admin hi comment delete kar sakta hai.");
    }
}
