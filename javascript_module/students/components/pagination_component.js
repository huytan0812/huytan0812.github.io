function PaginationComponent(studentCount, page) {
    const STUDENTS_PER_PAGE = 5;
    const pages = (studentCount % STUDENTS_PER_PAGE != 0) ? Math.floor(studentCount / STUDENTS_PER_PAGE) + 1 : Math.floor(studentCount / STUDENTS_PER_PAGE);

    return `
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            ${renderPreviousBtn(page)}
            ${renderPageBtns(pages, page)}
            ${renderNextBtn(page, pages)}
        </ul>
    </nav>
    `;
}

function renderPreviousBtn(pageActive) {
    const prevBtn = (pageActive > 1) ? `<li class="page-item" id="prev-btn">
                <a class="page-link" href="#" role="button">Previous</a>
            </li>` : `<li class="page-item disabled" id="prev-btn">
                <a class="page-link" href="#" role="button">Previous</a>
            </li>`;
    return prevBtn;
}

function renderPageBtns(pages, pageActive) {
    let btns = ``;
    for (let page = 1; page <= pages; page++) {
        if (pageActive == page) {
            btns += `
            <li class="page-item page-btn active" data-page="${ page }">
                <a class="page-link" href="#" role="button">${ page }</a>
            </li>`;
        }
        else {
            btns += `
            <li class="page-item page-btn" data-page="${ page }">
                <a class="page-link" href="#" role="button">${ page }</a>
            </li>
            `;
        }
    }
    return btns;
}

function renderNextBtn(pageActive, pages) {
    const nextBtn = (pageActive < pages) ? ` <li class="page-item" id="next-btn">
                <a class="page-link" href="#" role="button">Next</a>
            </li>` : ` <li class="page-item disabled" id="next-btn">
                <a class="page-link" href="#" role="button">Next</a>
            </li>`;
    return nextBtn;
}

export { PaginationComponent };