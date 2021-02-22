//This program creates a pokemon object

//This is an array of pokemon objects
let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, types: ['Grass', 'Poison']},
    { name: 'Charmander', height: 0.6, types: ['Fire']},
    { name: 'Squirtle', height: 0.5, types: ['Water']}
  ];

//This loops through the Pokemon objects and writes them to the DOM
//The condition writes "Wow, that's big!" next to any over 0.6

for (let i=0; i <pokemonList.length; i++){
  document.write(pokemonList[i].name + "(height: " + pokemonList[i].height  + ")");
  if (pokemonList[i].height>0.6) {
    document.write("Wow, that's big!");
  };
  document.write("<br><br>");
}