//This program creates a pokemon object

//This is an array of pokemon objects
let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, types: ['Grass', 'Poison']},
    { name: 'Charmander', height: 0.6, types: ['Fire']},
    { name: 'Squirtle', height: 0.5, types: ['Water']}
  ];

//This loop uses the forEach to loop through the Pokemon objects and write them to the DOM
pokemonList.forEach(function(user){
  document.write(user.name + " is " + user.height + " tall and has types " + user.types + ".");
  document.write("<br><br>");

});