import { AllPostComponent } from "./components/all_posts.js";
import { AllUserComponent } from "./components/all_users.js";
import { importPosts } from "./components/posts.js";
import { importUsers } from "./components/users.js";
import { displayPost } from "./components/post_details.js";
import { displayUser, getUserByEmail } from "./components/user_details.js";
import { loginFormComponent, isLoginSuccesful } from "./components/login.js";

const getIsPostImported = localStorage.getItem("isPostImported");
const isPostImported = (getIsPostImported) ? getIsPostImported : false;
if (!isPostImported) {
    console.log("Importing posts...");
    importPosts();
}

const getIsUserImported = localStorage.getItem("isUserImported");
const isUserImported = (getIsUserImported) ? getIsUserImported : false;
if (!isUserImported) {
    console.log("Importing users...");
    importUsers();
}

const getAllPosts = JSON.parse(localStorage.getItem("posts"));
// Generate a list of post objects
const allPosts = (getAllPosts) ? getAllPosts : [];

const getAllUsers = JSON.parse(localStorage.getItem("users"));
// Generate a list of user objects
const allUsers = (getAllUsers) ? getAllUsers : [];

document.addEventListener("DOMContentLoaded", function() {
    let authorizedUser = {};

    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const toggleBtns = document.getElementById('toggle-btns');

    const greet = document.getElementById('greet');
    const togglePosts = document.getElementById('toggle-posts');
    const toggleUsers = document.getElementById('toggle-users');
    const main = document.getElementById('main');

    loginBtn.addEventListener("click", () => {
        toggleBtns.style.display = 'none';
        greet.style.display = 'none';
        main.innerHTML = loginFormComponent();

        const loginForm = document.forms['login-form'];
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (isLoginSuccesful(loginForm)) {
                authorizedUser = getUserByEmail(loginForm.elements['email'].value.trim());

                // Handle display
                toggleBtns.style.display = 'block';
                greet.style.display = 'block';
                greet.innerHTML = `Xin chào, ${ authorizedUser['first_name'] } ${ authorizedUser['last_name'] }`;

                main.innerHTML = AllPostComponent();
                attachPostDetailHandler();
            }
        })
    });

    // Default render all posts
    main.innerHTML = AllPostComponent();
    attachPostDetailHandler();

    togglePosts.addEventListener("click", () => {
        main.innerHTML = AllPostComponent();
        
        attachPostDetailHandler();
    });    
    toggleUsers.addEventListener("click", () => { 
        main.innerHTML = AllUserComponent();

        const viewUser = document.querySelectorAll('.view-user');
        viewUser.forEach(
            (btn) => {
                btn.addEventListener("click", () => main.innerHTML = displayUser(btn.dataset.userId))
            }
        )
    });    
})

function attachPostDetailHandler() {
    const viewPost = document.querySelectorAll('.view-post');
    viewPost.forEach(
        (btn) => {
            btn.addEventListener("click", () => main.innerHTML = displayPost(btn.dataset.postId));
        }
    )
}

export { allPosts, allUsers };