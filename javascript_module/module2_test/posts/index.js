import { AllPostComponent } from "./components/all_posts.js";
import { AllUserComponent } from "./components/all_users.js";

document.addEventListener("DOMContentLoaded", function() {
    const greet = document.getElementById('greet');
    const togglePosts = document.getElementById('toggle-posts');
    const toggleUsers = document.getElementById('toggle-users');
    const main = document.getElementById('main');

    togglePosts.addEventListener("click", () => main.innerHTML = AllPostComponent());    
    toggleUsers.addEventListener("click", () => main.innerHTML = AllUserComponent());    
})