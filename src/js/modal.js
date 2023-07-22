(() => {
    const refs = {
        openModalBtn: document.querySelector("[data-modal-open]"),
        closeModalBtn: document.querySelector("[data-modal-close]"),
        modal: document.querySelector("[data-modal]"),
    };

    // refs.openModalBtn.addEventListener("click", toggleModal); 
    // do uruchomienia po napisaniu otwierania okienek
    refs.closeModalBtn.addEventListener("click", toggleModal);

    function toggleModal() {
        refs.modal.classList.toggle("is-hidden");
    }
})();