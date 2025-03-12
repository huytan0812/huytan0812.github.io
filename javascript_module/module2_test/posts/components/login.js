import { allUsers } from "../index.js";

function loginFormComponent() {
    return `
    <h3>Đăng nhập</h3>
    <form class="d-flex flex-column justify-content-center align-items-center" id='login-form'>
        <p class="error" id="display-error-login"></p>
        <div class="form-group mt-2 w-50">
            <label for="email"><strong>Email</strong></label>
            <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" required>
        </div>
        <div class="form-group mt-2 w-50">
            <label for="password"><strong>Password</strong></label>
            <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
            <button type="submit" class="btn btn-primary mt-2" id='submit-login-btn'>Đăng nhập</button>
        </div>
    </form>
    `;
}

function isLoginSuccesful(form) {
    const email = form.elements['email'].value.trim();
    const password = form.elements['password'].value.trim();
    const displayErrorLogin = document.getElementById('display-error-login');
    
    if (!email || !password) {
        displayErrorLogin.innerHTML = "Hãy nhập đầy đủ thông tin";
        return false;
    }

    for (let user of allUsers) {
        if (user['email'] == email && user['password'] == password) {
            return true;
        }
    }

    displayErrorLogin.innerHTML = "Thông tin tài khoản không chính xác";
    return false;
}

export { loginFormComponent, isLoginSuccesful };