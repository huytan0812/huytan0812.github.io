function FruitFormComponent() {
    return `
    <form action="" class="ps-3 mt-2" method="post" id="fruit-form">
        <p id="form-title">Thêm trái cây</p>
        <div class="form-group mt-2">
            <label for="fruit-name">Trái cây</label>
            <input type="text" class="form-control" id="fruit-name" placeholder="Trái cây" required>
        </div>
        <div class="form-group mt-2">
            <label for="fruit-description">Mô tả</label>
            <textarea class="form-control" id="fruit-description" placeholder="Mô tả" rows="3"></textarea>
        </div>
        <p class="mt-2">
            <button type="submit" class="btn btn-primary">Xác nhận</button>
            <button type="button" class="btn btn-secondary ms-2" id="cancel-fruit-form">Hủy</button>
        </p>
    </form>
    `;
}

export { FruitFormComponent };