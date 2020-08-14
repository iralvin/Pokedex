import Option from "./Option.js";
import Pokemon from "./Pokemon.js";

const template = document.querySelector("#template");
const popup = document.querySelector(".pokemon__popup");
const popupName = popup.querySelector(".pokemon__popup_name");
const popupImage = popup.querySelector(".pokemon__popup_image");
const popupHeight = popup.querySelector(".pokemon__popup_height");
const popupWeight = popup.querySelector(".pokemon__popup_weight");
const popupMoves1 = popup.querySelector(".pokemon__popup_move_1");
const popupMoves2 = popup.querySelector(".pokemon__popup_move_2");

const popupFlavorText = popup.querySelector(".pokemon__popup_flavor-text");

const genButtons = Array.from(
  document.querySelectorAll(".pokemon__generation_button")
);

const setGenButtonEventListener = () => {
  genButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      createPokemonList(generationOffsets[index]);
    });
  });
};

const generationOffsets = [
  {
    offset: 0,
    limit: 151,
  },
  {
    offset: 151,
    limit: 100,
  },
  {
    offset: 251,
    limit: 135,
  },
  {
    offset: 386,
    limit: 107,
  },
  {
    offset: 493,
    limit: 156,
  },
  {
    offset: 649,
    limit: 72,
  },
  {
    offset: 721,
    limit: 88,
  },
  {
    offset: 809,
    limit: 87,
  },
];

const handlePokemonClick = (pokemonName) => {
  pokemon.getPokemonData(pokemonName).then((res) => {
    console.log(res);

    popup.classList.add("popup_visible");
    popupName.textContent = res[0].name;
    popupImage.src = res[0].sprites.front_default;
    popupHeight.textContent = "Height: " + res[0].height / 10 + " m";
    popupWeight.textContent = "Weight: " + res[0].weight / 10 + " kg";
    const randMove1 = Math.floor(Math.random() * res[0].moves.length);
    const randMove2 = Math.floor(Math.random() * res[0].moves.length);
    popupMoves1.textContent = res[0].moves[randMove1].move.name;
    popupMoves2.textContent = res[0].moves[randMove2].move.name;


    const flavorTexts = res[1].flavor_text_entries.filter((flavorText) => {
      if (flavorText.language.name === "en") {
        return flavorText;
      }
    });
    console.log(flavorTexts)
    const rand = Math.floor(Math.random() * flavorTexts.length);
    popupFlavorText.textContent = flavorTexts[rand].flavor_text;
  });
};

const pokemon = new Pokemon();

const pokemonDropdownList = document.querySelector(".pokemon__dropdown_list");

const createPokemonList = (generation) => {
  pokemonDropdownList.innerHTML = "";
  pokemon.getPokemon(generation).then((res) => {
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
};

const button = document.querySelector(".pokemon__dropdown_button");
button.addEventListener("click", () => {
  pokemonDropdownList.classList.toggle("visible");
});

document.addEventListener("click", (e) => {
  if (e.target !== button) pokemonDropdownList.classList.remove("visible");
});

createPokemonList(generationOffsets[0]);
setGenButtonEventListener();
