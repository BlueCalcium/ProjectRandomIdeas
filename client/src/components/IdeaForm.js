import IdeasApi from '../services/ideasApi';
import IdeaList from './IdeaList';

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this._form.elements.text.value || !this._form.elements.tag.value || !this._form.elements.username.value) {
      alert('Please enter all fields');
      return;
    }

    // Save user to local storage.
    localStorage.setItem('username', this._form.elements.username.value);

    const idea = {
      // Note: The '.text' in _form.elements.text comes from the name of the input area/textarea in the HTML. Same for the '.tag' and '.username'.
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    // This adds idea to the server.
    const newIdea = await IdeasApi.createIdea(idea);

    // Adds idea to list and re-renders the list.
    // We pass in newIdea instead of idea since newIdea also has the ID and timestamp.
    this._ideaList.addIdeaToList(newIdea.data.data);

    // Clear fields.
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';

    this.render();

    // This essentially outputs a custom event. Since it's being sent out through document, all event listeners attached to the document will hear it and those listening for 'closemodal' will then trigger.
    document.dispatchEvent(new Event('closemodal'));
  }

  render() {
    this._formModal.innerHTML = `
      <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}" />
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>
    `;

    this._form = document.querySelector('#idea-form');
    this.addEventListeners();
  }
}

export default IdeaForm;