class Modal {
  constructor() {
    this._modal = document.querySelector('#modal');
    this._modalBtn = document.querySelector('#modal-btn');

    this.addEventListeners();
  }

  addEventListeners() {
    this._modalBtn.addEventListener('click', this.open.bind(this));
    window.addEventListener('click', this.outsideClick.bind(this));
    document.addEventListener('closemodal', () => this.close());
  }

  open() {
    this._modal.style.display = 'block';
  }
  
  close() {
    this._modal.style.display = 'none';
  }
  
  outsideClick(e) {
    // The modal encompasses the entire screen while the actual form is contained inside a modal-box. So, if you press outside the box to close it, it will register as having pressed on the modal.
    // This is why we're doing it like this.
    if (e.target === this._modal) {
      this.close();
    }
  }
}

export default Modal;