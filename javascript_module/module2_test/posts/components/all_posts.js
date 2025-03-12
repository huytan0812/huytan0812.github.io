import { allPosts } from "../index.js";

function AllPostComponent() {
    let allPostComponent = ``;

    for (let post of allPosts) {
        console.log(post);
        allPostComponent += `
        <div class="post-list">
            <div class="d-flex">
                <p><strong>Id: </strong> ${ post['id'] }</p>
                <p><strong>Title: </strong> ${ post['title'] }</p>
            </div>
            <p><strong>Ngày tạo: </strong> ${ post['updated_at'] }</p>
            <p><strong>Họ và tên: </strong> ${ post['user_id'] }</p>
        </div>
        `
    }

    return allPostComponent;
}

export { AllPostComponent };