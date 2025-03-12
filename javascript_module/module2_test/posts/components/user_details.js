import { allPosts } from "../index.js";
import { allUsers } from "../index.js";

function displayUser(id) {
    const user = getUser(id);

    if (Object.keys(user).length != 0) {
        return `
        <div class="user-details">
            <div class="d-flex">
                <p class="mb-0"><strong>Id: </strong> ${ user['id'] }</p>
                <p class="ms-3 mb-0"><strong>Họ và tên: </strong> ${ getUserName(user['id']) }</p>
                <p class="ms-3 mb-0"><strong>Email: </strong> ${ user['email'] } </p>
            </div>
            <div class="user-post">

            </div>
        </div>
        `
    }
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

function userPosts(id) {
    let posts;
}