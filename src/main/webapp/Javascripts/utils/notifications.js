export const showSuccessNotification = (title, message) => {
    return Swal.fire({
        title,
        html: message,
        icon: "success",
        confirmButtonColor: '#8EBE79'
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
        title: "Are you sure?",
        text: "This action is irreversible.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    });
};
