export const showSuccessNotification = (title, message) => {
    return Swal.fire({
        title,
        html: message,
        icon: "success",
        confirmButtonColor: '#8EBE79',
    });
};

export const showDeleteConfirmation = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    return await swalWithBootstrapButtons.fire({
        title: `<small>Are you sure?<small>`,
        html: "<small>This action is irreversible.<small>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    });
};
