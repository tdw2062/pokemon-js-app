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