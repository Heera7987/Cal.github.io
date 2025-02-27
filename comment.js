let totalComments = 0; // Total comments counter
const adminPassword = "admin123"; // Admin secret key

document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    // Create comment element
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
        <strong>${name}:</strong> ${comment}
        <div class="like-dislike-buttons">
            <button onclick="likeComment(this)">👍 <span>0</span></button>
            <button onclick="dislikeComment(this)">👎 <span>0</span></button>
            <button class="reply-button" onclick="showReplyForm(this)">जवाब दें</button>
        </div>
        <div class="reply-form">
            <input type="text" placeholder="नाम" class="reply-name" required>
            <textarea placeholder="जवाब" class="reply-text" required></textarea>
            <button onclick="submitReply(this)">जवाब सबमिट करें</button>
        </div>
        <div class="replies"></div>
        <button class="delete-button" onclick="deleteComment(this)">Delete</button>
    `;

    // Append comment to the comments section
    document.getElementById('commentsSection').appendChild(commentElement);

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
}

// Dislike comment function
function dislikeComment(button) {
    const dislikeCount = button.querySelector('span');
    let count = parseInt(dislikeCount.textContent);
    count++;
    dislikeCount.textContent = count;
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
    } else {
        alert("Galat password! Sirf admin hi comment delete kar sakta hai.");
    }
}