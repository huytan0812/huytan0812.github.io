import { AllPostComponent } from "./components/all_posts.js";
import { AllUserComponent } from "./components/all_users.js";
import { isLoginSuccesful, loginFormComponent } from "./components/login.js";
import { displayPost } from "./components/post_details.js";
import { importPosts } from "./components/posts.js";
import { displayUser, getUserByEmail } from "./components/user_details.js";
import { importUsers } from "./components/users.js";
import { RegisterFormComponent, validateRegistration, newUser } from "./components/register.js";
import { SearchForPostByIdForm, SearchForPostResultById } from "./components/search_for_posts_by_id.js";
import { searchForPostByEmailForm, SearchForPostResultByEmail } from "./components/search_for_post_by_email.js";

const getIsPostImported = localStorage.getItem("isPostImported");
const isPostImported = (getIsPostImported) ? getIsPostImported : false;
if (!isPostImported) {
    importPosts();
}

const getIsUserImported = localStorage.getItem("isUserImported");
const isUserImported = (getIsUserImported) ? getIsUserImported : false;
if (!isUserImported) {
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

    const authorizeBtns = document.getElementById('authorize-btns');
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

                // Switch to all posts
                toggleBtns.style.display = 'block';
                greet.style.display = 'block';
                greet.innerHTML = `Xin chào, ${ authorizedUser['first_name'] } ${ authorizedUser['last_name'] }`;

                authorizeBtns.innerHTML = `
                <p class="mt-2">
                    <button type="button" onClick="window.location.reload()" class="btn btn-primary ms-2" id="logout-btn">Đăng xuất</button>
                </p>
                <p class="mt-2 ms-2">
                    <button type="button" class="btn btn-outline-dark ms-2" id="register-btn">Đăng ký</button>
                </p>
                `;

                main.innerHTML = AllPostComponent();
                attachPostDetailHandler();
            }
        })
    });

    registerBtn.addEventListener("click", () => {
        toggleBtns.style.display = 'none';
        greet.style.display = 'none';
        main.innerHTML = RegisterFormComponent();

        const registerForm = document.forms['register-form'];
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (validateRegistration(registerForm)) {
                // Add new user to local storage
                allUsers.unshift(newUser);
                localStorage.setItem("users", JSON.stringify(allUsers));

                // Update PK to local storage
                localStorage.setItem("PK", allUsers.length);

                // Switch to all users
                authorizedUser = newUser;

                toggleBtns.style.display = 'block';
                greet.style.display = 'block';
                greet.innerHTML = `Xin chào, ${ authorizedUser['first_name'] } ${ authorizedUser['last_name'] }`;

                authorizeBtns.innerHTML = `
                <p class="mt-2">
                    <button type="button" onClick="window.location.reload()" class="btn btn-primary ms-2" id="logout-btn">Đăng xuất</button>
                </p>
                <p class="mt-2 ms-2">
                    <button type="button" class="btn btn-outline-dark ms-2" id="register-btn">Đăng ký</button>
                </p>
                `;

                main.innerHTML = AllUserComponent();

                const viewUser = document.querySelectorAll('.view-user');
                viewUser.forEach(
                    (btn) => {
                        btn.addEventListener("click", () => main.innerHTML = displayUser(btn.dataset.userId))
                    }
                )
            }
        })
    })

    // Default render all posts
    main.innerHTML = AllPostComponent();
    switchToSearchByPostId();

    // const searchByEmail = document.getElementById('search-by-email');
    // searchByEmail.addEventListener("click", () => {
    //     searchForPost.innerHTML = searchForPostByEmailForm();
    //     const searchById = document.getElementById('search-by-id');
    //     searchById.addEventListener("click", () => {
    //         searchForPost.innerHTML = SearchForPostByIdForm();

    //     });
    // })

    attachPostDetailHandler();

    // Switch to all post component
    togglePosts.addEventListener("click", () => {
        main.innerHTML = AllPostComponent();
        
        switchToSearchByPostId();

        attachPostDetailHandler();
    });
    
    // Switch to all user component
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

function switchToSearchByPostId() {
    const searchForPost = document.getElementById('search-for-post');

    searchForPost.innerHTML = SearchForPostByIdForm();

    const searchForPostByIdForm = document.forms["search-for-post-by-id"];
        searchForPostByIdForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const searchValue = searchForPostByIdForm.elements['q_post'].value.trim();

            main.innerHTML = SearchForPostResultById(parseInt(searchValue));
        })

    const searchByEmail = document.getElementById('search-by-email');
    searchByEmail.addEventListener("click", () => switchToSearchByEmail());
}

function switchToSearchByEmail() {
    const searchForPost = document.getElementById('search-for-post');
    
    searchForPost.innerHTML = searchForPostByEmailForm();

    const form = document.forms["search-for-post-by-email"];
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const searchValue = form.elements['q_email'].value.trim();

        main.innerHTML = SearchForPostResultByEmail(searchValue);
    })

    const searchById = document.getElementById('search-by-id');
    searchById.addEventListener("click", () => switchToSearchByPostId());
}

export { allPosts, allUsers };
