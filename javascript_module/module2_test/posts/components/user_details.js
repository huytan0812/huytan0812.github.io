import { allPosts } from "../index.js";
import { allUsers } from "../index.js";

function displayUser(id) {
    const user = getUser(id);

    // Apply destructuring
    const { result, postCount: count } = getUserPosts(id);

    if (Object.keys(user).length != 0) {
        return `
        <div class="user-details">
            <div class="d-flex">
                <p class="mb-0"><strong>Id: </strong> ${ user['id'] }</p>
                <p class="ms-3 mb-0"><strong>Họ và tên: </strong> ${ user['first_name'] } ${ user['last_name'] }</p>
                <p class="ms-3 mb-0"><strong>Email: </strong> ${ user['email'] } </p>
            </div>
            <hr>
            <h3 style="text-align: center;">Bài đăng của người dùng <span class="user-posts-count">${ count }</span></h3>
            <div class="user-post">
                ${ result }
            </div>
        </div>
        `
    }

    return `
    <p>Không tồn tại người dùng</p>
    `;
}

function getUserByEmail(email) {
    let result = {};

    for (let user of allUsers) {
        if (user['email'] == email) {
            result = user;
            return result;
        }
    }

    return result;
}

function getUser(id) {
    let result = {};

    for (let user of allUsers) {
        if (user['id'] == id) {
            result = user;
            return result;
        }
    }

    return result;
}

function getUserPosts(id) {
    let result = ``;
    let count = 0;

    for (let post of allPosts) {
        if (post['user_id'] == id) {
            result += `
            <div class="post-detail box-shadow-wrapper mt-3">
                <div class="d-flex">
                    <p><strong>Id: </strong> ${ post['id'] }</p>
                    <p class="ms-3"><strong>Title: </strong> ${ post['title'] }</p>
                </div>
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
            count++;
        }
    }

    return {
        'result': result,
        'postCount': count
    };
}

export { displayUser, getUserByEmail };