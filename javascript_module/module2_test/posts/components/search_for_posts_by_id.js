import { allPosts } from "../index.js";
import { getUserName } from "./all_users.js";

function SearchForPostByIdForm() {
    return `
    <form id="search-for-post-by-id" class="d-flex justify-content-center">
        <input type="text" class="form-control" id="q_post" name="q_post" placeholder="Tìm theo Post id - Ví dụ: 1, 2, 3..." required>
        <button type="submit" class="btn btn-primary ms-3" id='search-by-post-id'>Tìm kiếm</button>
    </form>
    <p style="text-align: center;">
        <button type="button" class="btn btn-secondary mt-3" id='search-by-email'>Tìm kiếm bằng email</button>
    </p>
    `;
}

function SearchForPostResultById(id) {
    for (let post of allPosts) {
        if (post['id'] == id) {
            return `
            <div class="post-list box-shadow-wrapper mt-3">
                <div class="d-flex">
                    <p><strong>Id: </strong> ${ post['id'] }</p>
                    <p class="ms-3"><strong>Title: </strong> ${ post['title'] }</p>
                </div>
                <p><strong>Ngày tạo: </strong> ${ post['created_at'] }</p>
                <p><strong>Ngày cập nhật: </strong> ${ post['created_at'] }</p>
                <p><strong>Link ảnh: </strong> ${ post['image'] }</p>
                <p><strong>Người tạo: </strong> ${ getUserName(post['user_id']) }</p>
            </div>
            `
        }
    }
    return `
    <p style="text-align: center;">Không có kết quả</p>
    `;
}

export { SearchForPostByIdForm, SearchForPostResultById };