import { allPosts } from "../index.js";
import { getUserName } from "./all_users.js";
import { SearchForPostByIdForm } from "./search_for_posts_by_id.js";

function AllPostComponent() {
    let allPostComponent = `
    <div id="search-for-post">
        ${ SearchForPostByIdForm() }
    </div>
    `;

    for (let post of allPosts) {
        allPostComponent += `
        <div class="post-list box-shadow-wrapper mt-3">
            <div class="d-flex">
                <p><strong>Id: </strong> ${ post['id'] }</p>
                <p class="ms-3"><strong>Title: </strong> ${ post['title'] }</p>
            </div>
            <p><strong>Ngày tạo: </strong> ${ post['created_at'] }</p>
            <div class="d-flex justify-content-between">
                <p><strong>Người tạo: </strong> ${ getUserName(post['user_id']) }</p>
                <p class="me-2">
                    <button type="button" class="btn btn-primary view-post" data-post-id="${ post['id'] }">Xem chi tiết</button>
                </p>
            </div>

        </div>
        `;
    }

    return allPostComponent;
}

export { AllPostComponent };