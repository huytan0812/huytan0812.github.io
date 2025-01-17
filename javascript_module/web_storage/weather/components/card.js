function CardComponent(dt) {
    let newCardComponent = document.createElement('div');
    newCardComponent.className = 'weather-card';
    newCardComponent.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="..." alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">${dt.dt}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    </div>
    `;
    return newCardComponent;
}

export {CardComponent};