import { MenuComponent } from "./components/menu_component.js";
import { LeftSidebarComponent } from "./components/left_sidebar_component.js";
import { RightSidebarComponent } from "./components/right_sidebar_component.js";

const fruitsArr = [
    {
        'kiwi': {
            'name': "kiwi",
            'description': "Kiwi là trái cây màu xanh"
        }
    },
    {
        'mango': {
            'name': "mango",
            'description': "Xoài là trái cây nhiệt đới"
        }
    },
    {
        'dragon_fruit': {
            'name': "dragon fruit",
            'description': "Thanh long là trái cây nhiệt đới"
        }
    }
]

document.addEventListener("DOMContentLoaded", function() {
    const menuComponent = document.getElementsByTagName('menucomponent')[0];
    const leftSidebarComponent = document.getElementsByTagName('leftsidebar')[0];
    const rightSidebarComponent = document.getElementsByTagName('rightsidebar')[0];

    menuComponent.innerHTML = MenuComponent();
    leftSidebarComponent.innerHTML = LeftSidebarComponent();
    rightSidebarComponent.innerHTML = RightSidebarComponent();

    const newFruit = {
        'banana': {
            'name': 'banana',
            'description': "Chuối là trái cây nhiệt đới"
        }
    }

    fruitsArr.unshift(newFruit);
    localStorage.setItem('fruits', JSON.stringify(fruitsArr));
})

