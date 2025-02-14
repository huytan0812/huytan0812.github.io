import { fruitsArr } from "../index.js";

function LeftSidebarComponent() {
    return `
    <div class="mt-2">
        <p style="text-align: center">
            <button type="button" class="btn btn-outline-dark" id="fruit-form-btn">Thêm</button>
        </p>
        ${ fruits(fruitsArr) }
    </div>
    `;
}

function fruits(fruitsArr) {
    let fruitRows = ``;
    let fruit;

    for (let i = 0; i < fruitsArr.length; i++) {
        fruit = fruitsArr[i];

        fruitRows += `
        <p class="left-sidebar-title pt-2 pb-2" data-fruitpk=${ Object.keys(fruit)[0] }>${ Object.values(fruit)[0]['name'] }</p>
        `;

    }

    return fruitRows;
}

export { LeftSidebarComponent };