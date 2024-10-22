// Define constants for user credentials
const VALID_USERNAME = "Book1";
const VALID_PASSWORD = "user";

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Basic credential check
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        alert("Login successful!");
        // Redirect to another page or take some action
        window.location.href = "Dashboard.html"; 
    } else {
        alert("Invalid username or password.");
    }
    
    // Prevent form from submitting to the server
    return false;
}
