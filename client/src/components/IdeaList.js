import IdeasApi from '../services/ideasApi';

class IdeaList {
  constructor() {
    this._ideaListElement = document.querySelector('#idea-list');
    this._ideas = [];
    this._validTags = new Set(['technology', 'software', 'business', 'education', 'health', 'inventions']);
    this.getIdeas();
  }

  addEventListeners() {
    this._ideaListElement.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation(); // Stops event bubbling.
        const ideaId = e.target.parentElement.parentElement.dataset.id; // My understanding is that you can get custom attributes by either doing the classic "getAttribute('data-ATTR')"" or by doing 'Element.dataset.ATTR'.
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data; 
      console.log(this._ideas);
      // With Axios, the content of the request is called 'data'. To access it, you do 'response.data'.
      // However, also recall that for our backend API, the response is an object with two keys. '
      // success', which tells you whether it was a success or not and 'data', the object containing the list of ideas.
      // So, we have to do 'res.data.data'.

      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      // Delete from the server.
      const res = await IdeasApi.deleteIdea(ideaId);
      this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas(); // @todo: Calling this here seems inefficient when all we basically want is to call render() again. Change this after tutorial.
    } catch (error) {
      alert('You cannot delete this resource.');
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);

    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    }
    else {
      tagClass = '';
    }
    return tagClass;
  }

  render() {
    // .map returns an array of HTML strings, which we then join together into one big HTML string.
    this._ideaListElement.innerHTML = this._ideas.map((idea) => {
      const tagClass = this.getTagClass(idea.tag);
      const deleteBtn = idea.username === localStorage.getItem('username') ? `<button class="delete"><i class="fas fa-times"></i></button>` : '';

      return `
        <div class="card" data-id="${idea._id}">
          ${deleteBtn}
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
      `;
    }).join('');

    this.addEventListeners();
  }
}

export default IdeaList;