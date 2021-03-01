//This program creates a pokemon object

//This wraps the pokemon repository in an IIFE
let pokemonRepository = (function() {
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, types: ['Grass', 'Poison']},
    { name: 'Charmander', height: 0.6, types: ['Fire']},
    { name: 'Squirtle', height: 0.5, types: ['Water']}
  ]; 

  function showDetails(pokemon){
    console.log(pokemon);
  }

  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function(){
      return pokemonList;
    },

    addListItem: function(pokemon){
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
    },

  };
})();

//This loop uses the forEach to loop through the Pokemon objects and write them to the DOM
//First the function getAll from pokemonRepository is used to get the array
pokemonRepository.getAll().forEach(function(user){

    pokemonRepository.addListItem(user);



});