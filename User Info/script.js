// ======== REGISTER ========
const registerForm = document.getElementById('registerForm');
if(registerForm){
  registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    const user = {
      name: document.getElementById('name').value,
      age: document.getElementById('age').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    // Check if email already exists
    if(users.find(u => u.email === user.email)){
      alert('Email already registered!');
      return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
    window.location.href = 'index.html';
  });
}

// ======== LOGIN ========
const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if(user){
      localStorage.setItem('currentUser', email);
      window.location.href = 'user.html';
    } else {
      alert('Invalid email or password!');
    }
  });
}

// ======== USER PAGE ========
const currentUserEmail = localStorage.getItem('currentUser');
if(document.getElementById('displayName')){
  if(!currentUserEmail){
    window.location.href = 'index.html';
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  let user = users.find(u => u.email === currentUserEmail);

  // Elements
  const displayName = document.getElementById('displayName');
  const displayAge = document.getElementById('displayAge');
  const displayPhone = document.getElementById('displayPhone');
  const displayEmail = document.getElementById('displayEmail');

  const editFields = document.getElementById('editFields');
  const editName = document.getElementById('editName');
  const editAge = document.getElementById('editAge');
  const editPhone = document.getElementById('editPhone');
  const editEmail = document.getElementById('editEmail');

  const updateProfileBtn = document.getElementById('updateProfileBtn');
  const saveChangesBtn = document.getElementById('saveChangesBtn');

  const changePasswordBtn = document.getElementById('changePasswordBtn');
  const passwordModal = document.getElementById('passwordModal');
  const submitPasswordBtn = document.getElementById('submitPasswordBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');

  const logoutBtn = document.getElementById('logoutBtn');

  // Display user info
  function loadUser(){
    displayName.textContent = user.name;
    displayAge.textContent = user.age;
    displayPhone.textContent = user.phone;
    displayEmail.textContent = user.email;

    editName.value = user.name;
    editAge.value = user.age;
    editPhone.value = user.phone;
    editEmail.value = user.email;
  }

  loadUser();

  // Update profile button click
  updateProfileBtn.addEventListener('click', ()=>{
    editFields.style.display = 'block';
    saveChangesBtn.style.display = 'inline-block';
    updateProfileBtn.style.display = 'none';
  });

  // Save changes
  saveChangesBtn.addEventListener('click', ()=>{
    user.name = editName.value;
    user.age = editAge.value;
    user.phone = editPhone.value;

    // Update localStorage
    const index = users.findIndex(u => u.email === user.email);
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));

    editFields.style.display = 'none';
    saveChangesBtn.style.display = 'none';
    updateProfileBtn.style.display = 'inline-block';
    loadUser();
    alert('Profile updated successfully!');
  });

  // Change Password
  changePasswordBtn.addEventListener('click', ()=>{ passwordModal.style.display='block'; });
  closeModalBtn.addEventListener('click', ()=>{ passwordModal.style.display='none'; });

  submitPasswordBtn.addEventListener('click', ()=>{
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const checkbox = document.getElementById('confirmCheckbox').checked;

    if(!checkbox){
      alert('Please confirm to change password.');
      return;
    }
    if(newPassword !== confirmPassword){
      alert('Passwords do not match!');
      return;
    }

    user.password = newPassword;
    const index = users.findIndex(u => u.email === user.email);
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));

    passwordModal.style.display = 'none';
    alert('Password changed successfully!');
  });

  // Logout
  logoutBtn.addEventListener('click', ()=>{
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  });
}
