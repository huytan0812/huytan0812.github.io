function StudentFormComponent() {
    return `
    <p class="form-title" id="student-form-title">
        Thêm học sinh
    </p>
    <div class="form-group">
        <label for="student-name">
            <strong>Tên học sinh</strong>
        </label>
        <input type="text" class="form-control" id="student-name" name="name" placeholder="Tên học sinh">
    </div>
    <div class="form-check mt-3">
        <p>
            <strong>Giới tính</strong>
        </p>
        <p>
            <input class="form-check-input" type="radio" name="gender" id="male" value="Nam">
            <label class="form-check-label ms-2" for="male">
            Nam
            </label>
        </p>
        <p>
            <input class="form-check-input" type="radio" name="gender" id="female" value="Nữ">
            <label class="form-check-label ms-2" for="female">
            Nữ
            </label>
        </p>
    </div>
    <div class="form-group mt-3">
        <label for="math-score">
            <strong>Điểm toán</strong>
        </label>
        <input type="number" class="form-control" id="math-score" name="math_score" placeholder="Điểm toán">
    </div>
    <div class="form-group mt-3">
        <label for="english-score">
            <strong>Điểm Anh</strong>
        </label>
        <input type="number" class="form-control" id="english-score" name="english_score" placeholder="Điểm Anh">
    </div>
    <div class="form-group mt-3">
        <label for="literature-score">
            <strong>Điểm văn</strong>
        </label>
        <input type="number" class="form-control" id="literature-score" name="literature_score" placeholder="Điểm văn">
    </div>
    <button type="submit" class="btn btn-primary mt-3" id="add-student-btn">Thêm học sinh</button>
    <p id="update-btns" class="mt-3">
        <button type="button" class="btn btn-primary" data-student-key="" id="update-student-btn">Cập nhật</button>
        <button type="button" class="btn btn-outline-secondary" id="cancel-btn">Huỷ</button>
    </p>
    `;
}

export { StudentFormComponent };