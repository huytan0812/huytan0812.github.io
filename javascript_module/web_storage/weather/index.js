import { MenuComponent } from "./components/menu.js";
import { ContentComponent } from "./components/content.js";
import { CardComponent } from "./components/card.js";

document.addEventListener("DOMContentLoaded", function index() {
    const menuComponent = document.getElementsByTagName('menucomponent')[0];
    menuComponent.innerHTML = MenuComponent();

    buildContentComponent();

    const searchForm = document.getElementById('search-form');
    const search = document.getElementById('search');

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let city = search.value;

        // Reset ContentComponent
        const contentComponent = document.getElementById('content');
        contentComponent.innerHTML = '';

        buildContentComponent(city);
    })
})

async function getWeatherInfo(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=09a71427c59d38d6a34f89b47d75975c&units=metric`

    let response;

    try {
        response = await fetch(url);

        if (response.status == 404) {
            throw new Error(`Không tìm thấy thành phố ${city}`);
        }

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    }
    catch (error) {
        const cityTitle = document.getElementById('city-title');
        cityTitle.innerHTML = `Không tìm thấy thành phố ${city}`;

        console.log(error.message);
        return {
            'error': error.message
        };
    }

    let data;

    try {
        data = await response.json();
    }
    catch (error) {
        console.log(error.message);
        return {
            'error': error.message
        };
    }

    return data;
}

async function buildContentComponent(city = "Hanoi") {
    const contentComponent = document.getElementsByTagName('contentcomponent')[0];

    let data;

    try {
        data = await getWeatherInfo(city);

        if (data.error) {
            throw new Error(`Có lỗi xảy ra: ${data.error}`);
        }

        contentComponent.innerHTML = ContentComponent(data.city.name);

        const content = document.getElementById('content');
        let dtList = data.list;

        for (let dt of dtList) {
            content.append(CardComponent(dt));
        }

    }
    catch (error) {
        console.log(error.message);
        return error.message;
    }

}