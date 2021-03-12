//This program creates a pokemon object

//This wraps the pokemon repository in an IIFE
let pokemonRepository = (function() {

  //Create empty array
  let pokemonList = []; 
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Log the name of pokemon to console
  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      showModal(pokemon);
      
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
          height: item.height,
          detailsUrl: item.url,
          imageUrl: item.imageUrl
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
   // listItem.classList.add('group-list-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('buttonClass');//Adds the class if it isn't present yet
    button.classList.add('btn');//Adds the class if it isn't present yet
    button.classList.add('btn-primary');//Adds the class if it isn't present yet
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
      $('#exampleModal').modal();
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

//Write show modal function
function showModal(pokemon){
  let modalBody = $(".modal-body");
  let modalTitle = $(".modal-title");
  let modalHeader = $(".modal-header");

  modalTitle.empty();
  modalBody.empty();

  //creating element for name in modal content
  let nameElement = $("<h1>" + pokemon.name + "</h1>");
  //creating img in modal content and dynamically assign src using JSON
 let pokemonImage = $('<img class="modal-img" id="pokemonImage" style="width:50%">');
 $(pokemonImage).attr('src', pokemon.imageUrl);
  //creating element for height in modal content
   let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");


  modalTitle.append(nameElement);
  modalBody.append(pokemonImage);
  modalBody.append(heightElement);
 
}