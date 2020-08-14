import Option from "./Option.js";
import Pokemon from "./Pokemon.js";

const baseUrl = "https://pokeapi.co/api/v2/";
const template = document.querySelector("#template");
const pokemonList = document.querySelector(".pokemon__cards-list");
const popup = document.querySelector(".pokemon__popup");
const popupName = popup.querySelector(".pokemon__popup_name");
const popupImage = popup.querySelector(".pokemon__popup_image");
const popupHeight = popup.querySelector(".pokemon__popup_height");
const popupWeight = popup.querySelector(".pokemon__popup_weight");

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

const pokemon = new Pokemon(template);

const dropDown = document.querySelector(".pokemon__dropdown_list");

pokemon.getPokemon().then((res) => {
  res.results.forEach((pokemon, index) => {
    const newOption = template.content.querySelector(".pokemon__option").cloneNode(true);
    const name = newOption.querySelector(".pokemon__name");
    name.innerHTML =  `#${index+1}&nbsp;&nbsp;${pokemon.name}`
    

    newOption.addEventListener("click", () => {
      console.log("clicked on " + name.textContent)
    })
    dropDown.append(newOption);

    // const newCard = new Card(
    //   cardTemplate,
    //   pokemon,
    //   pokemonList,
    //   handlePokemonPopup
    // );
    // newCard.generatePokemonCard();
  });
});


const button = document.querySelector(".pokemon__dropdown_button");
button.addEventListener("click", () => {
  dropDown.classList.toggle("visible")
})

document.addEventListener("click", (e) => {
  if (e.target !== button)
  dropDown.classList.remove("visible");
})