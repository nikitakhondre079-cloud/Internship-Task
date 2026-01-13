// Register Page Logic
function registerUser(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value.trim();
    let pincode = document.getElementById("pincode").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorMsg = document.getElementById("errorMsg");

    errorMsg.innerText = "";

    if (!name || !email || !password) {
        errorMsg.innerText = "Name, Email, and Password are required!";
        return;
    }

    // Fetch existing users
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // Prevent duplicate email/phone
    let exists = users.some(u => u.email === email || u.phone === phone);
    if (exists) {
        errorMsg.innerText = "User with this Email or Phone already exists!";
        return;
    }

    // Save user
    users.push({ name, age, phone, email, address, pincode, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Redirect to login with pre-filled email/phone
    localStorage.setItem("prefill", JSON.stringify({ email, phone }));
    window.location.href = "login.html";
}

// Login Page Logic
function loginUser(e) {
    e.preventDefault();

    let input = document.getElementById("loginInput").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let errorMsg = document.getElementById("loginError");
    errorMsg.innerText = "";

    if (!input || !password) {
        errorMsg.innerText = "All fields are required!";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let user = users.find(u => (u.email === input || u.phone === input) && u.password === password);

    if (!user) {
        errorMsg.innerText = "Invalid credentials!";
        return;
    }

    // Successful login
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "user.html";
}

// Prefill login if redirected from signup
function prefillLogin() {
    let prefill = JSON.parse(localStorage.getItem("prefill") || "{}");
    if (prefill.email || prefill.phone) {
        document.getElementById("loginInput").value = prefill.email || prefill.phone;
        localStorage.removeItem("prefill");
    }
}

// User Page Logic
function loadUserData() {
    let user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    if (!user.email) {
        window.location.href = "login.html"; // Redirect if not logged in
        return;
    }

    document.getElementById("userData").innerHTML = `
        <p><strong>Full Name:</strong> ${user.name}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address}</p>
        <p><strong>Pincode:</strong> ${user.pincode}</p>
    `;
}

// Logout
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
