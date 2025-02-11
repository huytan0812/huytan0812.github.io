function PaginationComponent(studentCount) {
    const STUDENTS_PER_PAGE = 5;
    const pages = Math.floor(studentCount / STUDENTS_PER_PAGE) + 1;

    return `
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item disabled">
                <a class="page-link" href="#">Previous</a>
            </li>
            ${pageBtns(pages)}
            <li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
    `;
}

function pageBtns(pages) {
    for (let page = 1; page <= pages; page++) {
        `<li class="page-item active">
            <a class="page-link" href="#">${ page }</a>
        </li>`;
    }
}

export { PaginationComponent };