import { allUsers } from "../index.js";

function AllUserComponent() {
    let allUserComponent = ``;

    for (let user of allUsers) {
        allUserComponent += `
        <div class="user-list box-shadow-wrapper mt-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex">
                    <p class="mb-0"><strong>Id: </strong> ${ user['id'] }</p>
                    <p class="ms-3 mb-0"><strong>Họ và tên: </strong> ${ getUserName(user['id']) }</p>
                    <p class="ms-3 mb-0"><strong>Email: </strong> ${ user['email'] } </p>
                </div>
                <button type="button" class="btn btn-primary view-user me-2" data-user-id="${ user['id'] }">Xem chi tiết</button>
            </div>
        </div>
        `;
    }

    return allUserComponent;
}

function getUserName(id = 0) {
    let result = 'Không tìm thấy người dùng';

    for (let user of allUsers) {
        if (user['id'] == id) {
            result = `${ user['first_name'] } ${ user['last_name'] }`;
            return result;
        }
    }

    return result;
}

export { AllUserComponent, getUserName };