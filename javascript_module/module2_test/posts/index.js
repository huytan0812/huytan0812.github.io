import { AllPostComponent } from "./components/all_posts.js";
import { AllUserComponent } from "./components/all_users.js";
import { importPosts } from "./components/posts.js";
import { importUsers } from "./components/users.js";

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
    const greet = document.getElementById('greet');
    const togglePosts = document.getElementById('toggle-posts');
    const toggleUsers = document.getElementById('toggle-users');
    const main = document.getElementById('main');

    togglePosts.addEventListener("click", () => main.innerHTML = AllPostComponent());    
    toggleUsers.addEventListener("click", () => main.innerHTML = AllUserComponent());    
})

export { allPosts, allUsers };