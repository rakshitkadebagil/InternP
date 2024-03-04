document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;
        
        fetch('http://localhost:9000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username,password })
        })
        .then(response => {
            if (response.ok) {
                console.log('Login successful');
                window.location.href = 'rent.html';
            } else {
                console.error('Login failed');
                // Here you can show an error message to the user
            }
        })
        .catch(error => console.error('Error:', error));
    });

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("signupUsername").value;
        const email = document.getElementById("signupEmail").value;
        const number = document.getElementById("signupNumber").value;
        const password = document.getElementById("signupPassword").value;
        
        fetch('http://localhost:9000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username,email,number, password })
        })
        .then(response => {
            if (response.ok) {
                console.log('Signup successful');
                window.location.href = 'login.html';
            } else {
                console.error('Signup failed');
                // Here you can show an error message to the user
            }
        })
        .catch(error => console.error('Error:', error));
    });
});