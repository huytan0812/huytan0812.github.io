import { MenuComponent } from "./components/menu_component.js";
import { LeftSidebarComponent } from "./components/left_sidebar_component.js";
import { RightSidebarComponent } from "./components/right_sidebar_component.js";

document.addEventListener("DOMContentLoaded", function() {
    const menuComponent = document.getElementsByTagName('menucomponent')[0];
    const leftSidebarComponent = document.getElementsByTagName('leftsidebar')[0];
    const rightSidebarComponent = document.getElementsByTagName('rightsidebar')[0];

    menuComponent.innerHTML = MenuComponent();
    leftSidebarComponent.innerHTML = LeftSidebarComponent();
    rightSidebarComponent.innerHTML = RightSidebarComponent();
})