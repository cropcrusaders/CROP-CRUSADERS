document.addEventListener('DOMContentLoaded', function() {
    loadComments();
    var submitButton = document.getElementById('submitComment');
    if (submitButton) {
        submitButton.addEventListener('click', addComment);
    }
});

function loadComments() {
    var saved = JSON.parse(localStorage.getItem('forumComments')) || [];
    var commentSection = document.getElementById('commentSection');
    if (!commentSection) return;
    commentSection.innerHTML = '';
    saved.forEach(function(c) {
        var el = document.createElement('div');
        el.className = 'comment';
        el.innerHTML = '<strong>' + sanitize(c.username) + ':</strong> <p>' + sanitize(c.comment) + '</p>';
        commentSection.appendChild(el);
    });
}

function addComment() {
    var usernameInput = document.getElementById('username');
    var commentInput = document.getElementById('comment');
    var username = usernameInput ? usernameInput.value.trim() : '';
    var comment = commentInput ? commentInput.value.trim() : '';

    var usernameError = document.getElementById('usernameError');
    var commentError = document.getElementById('commentError');

    if (usernameError) usernameError.style.display = 'none';
    if (commentError) commentError.style.display = 'none';

    if (!username && usernameError) {
        usernameError.style.display = 'block';
    }
    if (!comment && commentError) {
        commentError.style.display = 'block';
    }

    if (username && comment) {
        var commentSection = document.getElementById('commentSection');
        if (!commentSection) return;
        var newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = '<strong>' + sanitize(username) + ':</strong> <p>' + sanitize(comment) + '</p>';
        commentSection.appendChild(newComment);

        var saved = JSON.parse(localStorage.getItem('forumComments')) || [];
        saved.push({ username: username, comment: comment });
        localStorage.setItem('forumComments', JSON.stringify(saved));

        if (usernameInput) usernameInput.value = '';
        if (commentInput) commentInput.value = '';
    }
}

function sanitize(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}
