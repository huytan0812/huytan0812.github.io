import { allUsers } from "../index.js";

let newUser = {};

function RegisterFormComponent() {
    return `
    <h3>Đăng ký</h3>
    <form class="d-flex flex-column justify-content-center align-items-center" id='register-form'>
        <p class="error" id="display-error-register"></p>
        <div class="form-group mt-2 w-50">
            <label for="first_name"><strong>First name</strong></label>
            <input type="text" class="form-control" id="first_name" name="first_name" placeholder="First name">
        </div>
        <div class="form-group mt-2 w-50">
            <label for="last_name"><strong>Last name</strong></label>
            <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Last name">
        </div>
        <div class="form-group mt-2 w-50">
            <label for="email"><strong>Email</strong></label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Enter email">
        </div>
        <div class="form-group mt-2 w-50">
            <label for="password"><strong>Password</strong></label>
            <input type="password" class="form-control" id="password" name="password" placeholder="Password">
            <button type="submit" class="btn btn-primary mt-2" id='submit-login-btn'>Đăng nhập</button>
        </div>
    </form>
    `
}

function validateRegistration(form) {
    const user = {};

    const firstName = form.elements['first_name'].value.trim();
    const lastName = form.elements['last_name'].value.trim();
    const email = form.elements['email'].value.trim();
    const password = form.elements['password'].value.trim();

    const error = document.getElementById('display-error-register');

    if (!firstName || !lastName || !email || !password) {
        error.innerHTML = "Hãy nhập đầy đủ thông tin";
        return false;
    }

    if (isDuplicatedEmail(email)) {
        error.innerHTML = "Email này đã có tài khoản";
        return false;
    }

    user['id'] = parseInt(localStorage.getItem("PK")) + 1;
    user['first_name'] = firstName;
    user['last_name'] = lastName;
    user['email'] = email;
    user['password'] = password;

    newUser = {...user};

    return true;
}

function isDuplicatedEmail(email = '') {
    for (let user of allUsers) {
        if (email == user['email']) {
            return true;
        }
    }

    return false;
}

export { RegisterFormComponent, validateRegistration, newUser };