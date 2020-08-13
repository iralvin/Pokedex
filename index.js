import Card from "./Card.js";
import Pokemon from "./Pokemon.js";

const baseUrl = "https://pokeapi.co/api/v2/";
const cardTemplate = document.querySelector("#template");
const pokemonList = document.querySelector(".pokemon__cards-list");
const popup = document.querySelector(".pokemon__popup");
const popupName = popup.querySelector(".pokemon__popup_name");
const popupImage = popup.querySelector(".pokemon__popup_image");
const popupHeight = popup.querySelector(".pokemon__popup_height");
const popupWeight = popup.querySelector(".pokemon__popup_weight");

const handlePokemonPopup = (name, image, height, weight) => {

  popup.classList.add("popup_visible");
  popupName.textContent = name;
  popupImage.src = image;
  popupHeight.textContent = height/10 + "m";
  popupWeight.textContent = weight/10 + "kg";
};

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("popup_visible");
  }
});

const pokemon = new Pokemon(cardTemplate);
pokemon.getPokemon().then((res) => {
  res.results.forEach((pokemon) => {
    const newCard = new Card(
      cardTemplate,
      pokemon,
      pokemonList,
      handlePokemonPopup
    );
    newCard.generatePokemonCard();
  });
});
