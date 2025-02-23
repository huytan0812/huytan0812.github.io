function DeleteModalComponent() {
    const deleteModal = `
    <div id="delete-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-between">
                    <h5 class="modal-title">Xác nhận xoá học sinh</h5>
                    <button type="button" class="close px-3" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="dismiss-delete-modal">Close</button>
                    <button type="button" class="btn btn-primary" id="approve-delete-student">Save changes</button>
                </div>
                </div>
        </div>
    </div>
    `;

    return deleteModal;
}

export { DeleteModalComponent };