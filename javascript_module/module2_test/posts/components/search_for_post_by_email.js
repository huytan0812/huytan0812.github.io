import { allUsers, allPosts } from "../index.js";
import { getUserName } from "./all_users.js";

function searchForPostByEmailForm() {
    return `
    <form id="search-for-post-by-email" class="d-flex justify-content-center">
        <input type="text" class="form-control" id="q_email" name="q_email" placeholder="Tìm theo User email id - Ví dụ: abc@example.com" required>
        <button type="submit" class="btn btn-primary ms-3" id='search-by-email'>Tìm kiếm</button>
    </form>
    <p style="text-align: center;">
        <button type="button" class="btn btn-secondary mt-3" id='search-by-id'>Tìm kiếm bằng Post id</button>
    </p>
    `;
}

function SearchForPostResultByEmail(email) {
    const userId = getUserIdByEmail(email);
    if (userId) {
        const { result, count } = renderPosts(userId);
        return `
        <p style="text-align: center;">Kết quả tìm kiếm <span class="user-posts-count">${ count }</span></p>
        ${ result }
        `
    }
    return `
    <p style="text-align: center;">Không có kết quả</p>
    `;
}

function getUserIdByEmail(email) {
    let result = '';

    for (let user of allUsers) {
        if (user['email'] == email) {
            result = user['id'];
            return result;
        }
    }

    return result;
}

function renderPosts(userId) {
    let result = ``;
    let count = 0;

    for (let post of allPosts) {
        if (post['user_id'] == userId) {
            result += `
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
            `;
            count++;
        }
    }

    return {
        'result': result,
        'count': count
    }
}

export { searchForPostByEmailForm, SearchForPostResultByEmail};