// ---------- REGISTER ----------
function registerUser(){
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const address = document.getElementById('address').value.trim();
    const pincode = document.getElementById('pincode').value.trim();
    const password = document.getElementById('password').value.trim();

    if(!name || !email || !password){
        document.getElementById('registerError').innerText = "Name, Email and Password are required!";
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let userExists = users.some(u => 
        u.email.trim().toLowerCase() === email || u.phone.trim() === phone
    );

    if(userExists){
        document.getElementById('registerError').innerText = "User already exists!";
        return;
    }

    users.push({name, age, phone, email, address, pincode, password});
    localStorage.setItem('users', JSON.stringify(users));

    localStorage.setItem("autoFillEmail", email);
    localStorage.setItem("autoFillPhone", phone);

    alert("Registration Successful!");
    window.location.href = "login.html";
}

// ---------- LOGIN ----------
function loginUser(){
    const loginInput = document.getElementById('loginEmailPhone').value.trim();
    const loginPass = document.getElementById('loginPassword').value.trim();

    if(!loginInput || !loginPass){
        document.getElementById('loginError').innerText = "All fields are required!";
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => 
        (u.email.trim().toLowerCase() === loginInput.toLowerCase() || u.phone.trim() === loginInput)
        && u.password === loginPass
    );

    if(user){
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "user.html";
    } else {
        document.getElementById('loginError').innerText = "Invalid Credentials!";
    }
}

// ---------- USER PROFILE ----------
function loadUserProfile(){
    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user); // ✅ Debug: Check saved data
    if(!user) window.location.href = "login.html";

    document.getElementById('uName').value = user.name;
    document.getElementById('uAge').value = user.age;
    document.getElementById('uPhone').value = user.phone;
    document.getElementById('uEmail').value = user.email;
    document.getElementById('uAddress').value = user.address || ""; // Fix undefined
    document.getElementById('uPincode').value = user.pincode;
    document.getElementById('uPassword').value = user.password || ""; // Display password
}

function toggleEditProfile(){
    document.getElementById('userForm').classList.remove('readonly');
    ['uName','uAge','uPhone','uEmail','uAddress','uPincode'].forEach(id=>{
        document.getElementById(id).removeAttribute('readonly');
    });
    document.getElementById('updateProfileBtn').style.display = "none";
    document.getElementById('saveChangesBtn').style.display = "block";
}

function saveProfileChanges(){
    const updatedUser = {
        name: document.getElementById('uName').value.trim(),
        age: document.getElementById('uAge').value.trim(),
        phone: document.getElementById('uPhone').value.trim(),
        email: document.getElementById('uEmail').value.trim().toLowerCase(),
        address: document.getElementById('uAddress').value.trim(),
        pincode: document.getElementById('uPincode').value.trim(),
        password: JSON.parse(localStorage.getItem("currentUser")).password
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(u => (u.email.trim().toLowerCase() === updatedUser.email ? updatedUser : u));
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    alert("Profile Updated!");
    window.location.reload();
}

// ---------- CHANGE PASSWORD ----------
function showPasswordModal(){
    document.getElementById('passwordModal').style.display = "flex";
}

function closePasswordModal(){
    document.getElementById('passwordModal').style.display = "none";
    document.getElementById('passwordError').innerText = "";
    document.getElementById('newPassword').value = "";
    document.getElementById('confirmPassword').value = "";
    document.getElementById('confirmCheckbox').checked = false;
}

function changePassword(){
    const newPass = document.getElementById('newPassword').value.trim();
    const confirmPass = document.getElementById('confirmPassword').value.trim();
    const checkbox = document.getElementById('confirmCheckbox').checked;

    if(!checkbox){
        document.getElementById('passwordError').innerText = "Please confirm to change password.";
        return;
    }
    if(newPass !== confirmPass){
        document.getElementById('passwordError').innerText = "Passwords do not match!";
        return;
    }

    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.password = newPass;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(u => (u.email.trim().toLowerCase() === user.email.trim().toLowerCase() ? user : u));
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));

    alert("Password changed successfully!");
    closePasswordModal();
    loadUserProfile(); // Update password field
}

// ---------- LOGOUT ----------
function logoutUser(){
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
