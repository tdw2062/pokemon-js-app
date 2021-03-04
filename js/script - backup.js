//This program creates a pokemon object

//This wraps the pokemon repository in an IIFE
let pokemonRepository = (function() {

  //Create empty array
  let pokemonList = []; 
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Log the name of pokemon to console
  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      console.log(pokemon);
    });
  }

  //Loadlist function
  function loadList() {
    return fetch(apiUrl).then(function (response){
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon= {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //Add list item function
  function addListItem(pokemon){
    selectElement = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('buttonClass');//Adds the class if it isn't present yet
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    selectElement.appendChild(listItem);
  }
  
  //Add pokemon
  function add(pokemon){
    pokemonList.push(pokemon);
  }

  //Get all pokemon on the array
  function getAll(){
    return pokemonList;
  }

  //function to load details of pokemon
  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details) {
      //Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

   // modalContainer.addEventListener('click', (e)=> {
      //since this is also triggered when clicking INSIDE the modal
      //We only want to close if the user clicks directly on the overlay
   //   let target = e.target;
  //  if (target === modalContainer){
  //    hideModal();
    //  }
 // });
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
    };

   
})();

pokemonRepository.loadList().then(function(){
  //Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

function showModal(title, text) {
  let modalContainer = document.querySelector('#modal-container');

  // Clear all existing modal content
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');

}

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');
});

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

