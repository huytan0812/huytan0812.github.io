import { MenuComponent } from "./components/menu_component.js";
import { LeftSidebarComponent } from "./components/left_sidebar_component.js";
import { RightSidebarComponent } from "./components/right_sidebar_component.js";
import { FruitFormComponent } from "./components/fruit_form.js";
import { FruitDetailComponent } from "./components/fruit_detail_component.js";

const fruitsArr = [
    {
        '1': {
            'name': "kiwi",
            'description': "Kiwi là trái cây màu xanh"
        }
    },
    {
        '2': {
            'name': "mango",
            'description': "Xoài là trái cây nhiệt đới"
        }
    },
    {
        '3': {
            'name': "dragon fruit",
            'description': "Thanh long là trái cây nhiệt đới"
        }
    }
]

let renderFruit;

const fruitNamesFn = () => {
    let fruitNames = [];
    let fruit;
    let fruitName;

    for (let i = 0; i < fruitsArr.length; i++) {
        fruit = fruitsArr[i];
        fruitName = Object.values(fruit)[0]['name'];
        fruitNames.push(fruitName);
    }

    return fruitNames;
}

document.addEventListener("DOMContentLoaded", function() {
    const menuComponent = document.getElementsByTagName('menucomponent')[0];
    const rightSidebarComponent = document.getElementsByTagName('rightsidebar')[0];

    renderLeftSidebar();
    menuComponent.innerHTML = MenuComponent();
    rightSidebarComponent.innerHTML = RightSidebarComponent();

    const newFruit = {
        '4': {
            'name': 'banana',
            'description': "Chuối là trái cây nhiệt đới"
        }
    }

    fruitsArr.unshift(newFruit);
    localStorage.setItem('fruits', JSON.stringify(fruitsArr));

    const fruitFormBtn = document.getElementById('fruit-form-btn');
    fruitFormBtn.addEventListener("click", () => renderFruitForm());

    let fruitNames = fruitNamesFn();
    
    const searchForm = document.forms['search-form'];
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const search = searchForm.getElementsByTagName('input')[0];
        const value = search.value;

        for (let i = 0; i < fruitNames.length; i++) {
            if (fruitNames[i] == value) {
                console.log(fruitNames[i]);
                break;
            }
        }
    })
})

function renderLeftSidebar() {
    const leftSidebarComponent = document.getElementsByTagName('leftsidebar')[0];
    leftSidebarComponent.innerHTML = LeftSidebarComponent();

    const fruitTitles = leftSidebarComponent.querySelectorAll('.left-sidebar-title');
    fruitTitles.forEach(
        (fruit) => {
            fruit.addEventListener("click", () => fruitDetail(fruit.dataset.fruitpk));
        }
    )
}

function renderFruitForm() {
    const rightSidebarComponent = document.getElementsByTagName('rightsidebar')[0];
    rightSidebarComponent.innerHTML = FruitFormComponent();

    const fruitForm = document.forms["fruit-form"];
    fruitForm.addEventListener("submit", addFruit);

    const cancelFruitForm = document.getElementById('cancel-fruit-form');
    cancelFruitForm.addEventListener("click", () => {
        rightSidebarComponent.innerHTML = RightSidebarComponent();
    }
    );
}

function addFruit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    console.log(form);
}

function fruitDetail(fruitPK) {
    const fruitsArr = JSON.parse(localStorage.getItem('fruits'));
    let fruit;
    let fruitKey;

    const rightSidebarComponent = document.getElementsByTagName('rightsidebar')[0];

    for (let i = 0; i < fruitsArr.length; i++) {
        fruit = fruitsArr[i];
        fruitKey = Object.keys(fruit)[0];

        if (fruitKey == fruitPK) {
            rightSidebarComponent.innerHTML = FruitDetailComponent(fruit[fruitPK]['name']);
        }
    }

}

export { fruitsArr };

