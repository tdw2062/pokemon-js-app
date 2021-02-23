//This program creates a pokemon object

//This wraps the pokemon repository in an IIFE
let pokemonRepository = (function() {
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, types: ['Grass', 'Poison']},
    { name: 'Charmander', height: 0.6, types: ['Fire']},
    { name: 'Squirtle', height: 0.5, types: ['Water']}
  ]; 

  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function(){
      return pokemonList;
    }
  };
})();

//This loop uses the forEach to loop through the Pokemon objects and write them to the DOM
//First the function getAll from pokemonRepository is used to get the array
pokemonRepository.getAll().forEach(function(user){
  document.write(user.name + " is " + user.height + " tall and has types " + user.types + ".");
  document.write("<br><br>");

});