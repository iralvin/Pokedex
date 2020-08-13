import Card from "./Card.js";
import Pokemon from "./Pokemon.js";

const baseUrl = "https://pokeapi.co/api/v2/";
const cardTemplate = document.querySelector("#template");
const pokemonList = document.querySelector(".pokemon__cards-list");
const popup = document.querySelector(".pokemon__popup");
const popupImage = popup.querySelector(".pokemon__popup_image")
const popupName = popup.querySelector(".pokemon__popup_name")
const popupHeight = popup.querySelector(".pokemon__popup_height")
const popupWeight = popup.querySelector(".pokemon__popup_weight")

	// generatePokemonCards(){
	// 	this.setEventListeners();
	// 	this.getPokemon()
	// 	.then (res => {
	// 		console.log(res);

	// 		res.results.forEach(pokemon => {

	// 			const newCard = this._cardTemplate.content.querySelector(".pokemon__card").cloneNode(true);

	// 			fetch(`${baseUrl}pokemon/${pokemon.name}`, {
	// 				method: "GET"
	// 			})
	// 			.then (res => {
	// 				// if (res.ok){
	// 					return res.json();
	// 				// }
	// 			})
	// 			.then (res => {
	// 				newCard.querySelector(".pokemon__image").src = res.sprites["front_default"]
	// 				newCard.querySelector(".pokemon__name").textContent = pokemon.name;
	// 			})


	// 			newCard.addEventListener("click", () => {
	// 				popup.classList.add("popup_visible");
	// 				popupImage.src = newCard.querySelector(".pokemon__image").src;
	// 				popupName.textContent = pokemon.name
	// 				// popupHeight.textContent = res.height/10;
	// 				// popupWeight.textContent = '' + res.weight/10 + "kg";

	// 			})
  //       pokemonList.append(newCard);
        
	// 		})
	// 	})
	// }


const pokemon = new Pokemon(cardTemplate);

pokemon.getPokemon()
  .then(res => {
    // res.results is an array of objects for each pokemon
    // each object within this array contains the name and URL for each pokemon
    res.results.forEach(pokemon => {
      // console.log(pokemon);
      const newCard = new Card(cardTemplate, pokemon, pokemonList, popup);
      newCard.generatePokemonCard();
      // pokemonList.append(newCard);
    })
  });