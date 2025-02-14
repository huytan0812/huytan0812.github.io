function MenuComponent() {
    return `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand ms-3" href="#">Navbar</a>
        <div class="navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
            <form class="form-inline d-flex my-2 my-lg-0 w-50">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0 ms-3" type="submit">Search</button>
            </form>
        </div>
    </nav>
    `;
}

export { MenuComponent };