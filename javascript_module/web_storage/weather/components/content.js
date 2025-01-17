import { CardComponent } from "./card.js";

function ContentComponent(city) {
    const contentComponent = `
    <h1 id="city-title">${city}</h1>
    <div class="container d-flex justify-content-center align-items-center flex-wrap" id="content">
    </div>;
    `
    return contentComponent;
}

export {ContentComponent};