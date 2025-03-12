import { allPosts } from "../index.js";
import { getUserName } from "./all_users.js";

function displayPost(id) {
    const post = getPost(id);

    if (Object.keys(post).length != 0) {
        return `
        <div class="post-detail">
            <div class="d-flex">
                <p><strong>Id: </strong> ${ post['id'] }</p>
                <p class="ms-3"><strong>Title: </strong> ${ post['title'] }</p>
            </div>
            <p><strong>Người tạo: </strong> ${ getUserName(post['user_id']) }</p>
            <p><strong>Ngày tạo: </strong> ${ post['created_at'] }</p>
            <p><strong>Ngày cập nhật: </strong> ${ post['updated_at'] }</p>
            <hr>
            <p style="text-align: justify;">
                ${ post['content'] }
            </p>
            <p style="text-align: center;">
                <img src="${ post['image'] }">
            </p>
        </div>
        `;
    }
    
    return `
    <p>
        Post này không tồn tại
    </p>
    `;
}

function getPost(id) {
    let result = {};

    for (let post of allPosts) {
        if (post['id'] == id) {
            result = post;
            return result;
        }
    }

    return result;
}

export { displayPost };