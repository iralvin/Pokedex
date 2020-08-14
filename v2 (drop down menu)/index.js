import Option from "./Option.js";
import Pokemon from "./Pokemon.js";

const baseUrl = "https://pokeapi.co/api/v2/";
const template = document.querySelector("#template");
const popup = document.querySelector(".pokemon__popup");
const popupName = popup.querySelector(".pokemon__popup_name");
const popupImage = popup.querySelector(".pokemon__popup_image");
const popupHeight = popup.querySelector(".pokemon__popup_height");
const popupWeight = popup.querySelector(".pokemon__popup_weight");
const popupMoves1 = popup.querySelector(".pokemon__popup_move_1");
const popupMoves2 = popup.querySelector(".pokemon__popup_move_2");

const popupFlavorText = popup.querySelector(".pokemon__popup_flavor-text");

// const handlePokemonPopup = (name, image, height, weight) => {

//   popup.classList.add("popup_visible");
//   popupName.textContent = name;
//   popupImage.src = image;
//   popupHeight.textContent = height/10 + "m";
//   popupWeight.textContent = weight/10 + "kg";
// };

// popup.addEventListener("click", (e) => {
//   if (e.target === popup) {
//     popup.classList.remove("popup_visible");
//   }
// });

const handlePokemonClick = (pokemonName) => {
  pokemon.getPokemonData(pokemonName)
  .then(res => {
    console.log(res);
    const rand = Math.floor(Math.random() * 10);
    const randMove1 = Math.floor(Math.random() * res[0].moves.length);
    const randMove2 = Math.floor(Math.random() * res[0].moves.length);
    popup.classList.add("popup_visible");
    popupName.textContent = res[0].name;
    popupImage.src = res[0].sprites.front_default;
    popupHeight.textContent = "Height: " + res[0].height/10 + " m";
    popupWeight.textContent = "Weight: " + res[0].weight/10 + " kg";
    popupMoves1.textContent = res[0].moves[randMove1].move.name;
    popupMoves2.textContent = res[0].moves[randMove2].move.name;


    popupFlavorText.textContent = res[1].flavor_text_entries[rand].flavor_text;
  })
};






const pokemon = new Pokemon();

const pokemonDropdownList = document.querySelector(".pokemon__dropdown_list");

pokemon.getPokemon().then((res) => {
  res.results.forEach((pokemon, index) => {
    const newOption = new Option(
      template,
      pokemon,
      index,
      pokemonDropdownList,
      handlePokemonClick
    );

    newOption.generatePokemonOption();
  });
});

const button = document.querySelector(".pokemon__dropdown_button");
button.addEventListener("click", () => {
  pokemonDropdownList.classList.toggle("visible");
});

document.addEventListener("click", (e) => {
  if (e.target !== button) pokemonDropdownList.classList.remove("visible");
});
