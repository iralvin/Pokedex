import Option from "./Option.js";
import Pokemon from "./Pokemon.js";
import Card from "./Card.js";

const loadingAnimation = document.querySelector(".loading-animation-container");

const optionTemplate = document.querySelector("#template__dropdown_list-item");
const cardTemplate = document.querySelector("#template__grid_card");

const popupContainer = document.querySelector(".card-popup");




const popupCard = popupContainer.querySelector(".card-popup__container");
const popupEvolutionImage = popupContainer.querySelector(".card-popup__evolution");
const popupName = popupContainer.querySelector(".card-popup__name");
const popupImage = popupContainer.querySelector(".card-popup__image");
const popupHeight = popupContainer.querySelector(".card-popup__descriptors_height");
const popupWeight = popupContainer.querySelector(".card-popup__descriptors_weight");
const popupMoves1 = popupContainer.querySelector(".card-popup__move_1");
const popupMoves2 = popupContainer.querySelector(".card-popup__move_2");

const popupFlavorText = popupContainer.querySelector(".card-popup__flavor-text");

const pokemon = new Pokemon();

const genButtons = Array.from(
  document.querySelectorAll(".generation-selection__buttons_button")
);

const setGenButtonEventListener = () => {
  genButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      genButtons.forEach((button) => {
        button.classList.remove("button_active");
      });
    });

    button.addEventListener("click", () => {
      button.classList.add("button_active");
      createPokemonList(generationOffsets[index])
      createPokemonGrid(generationOffsets[index]);
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


popupContainer.addEventListener("click", (e) => {
  if (e.target === popupContainer){
    popupContainer.classList.remove("popup_visible");

  }
})

const handlePokemonClick = (pokemonName) => {
  loadingAnimation.classList.add("visible");
  pokemon.getPokemonData(pokemonName).then((res) => {
    // res data returned is an array
    // res[0] is related to the general pokemon stats
    // res[1] is related to to the pokemon species info
    console.log(res);

    //  Get general ht/wt info
    popupContainer.classList.add("popup_visible");
    popupName.textContent = res[0].name;
    popupImage.src = res[0].sprites.front_default
      ? res[0].sprites.front_default
      : "";
    popupHeight.textContent = "Height: " + res[0].height / 10 + " m";
    popupWeight.textContent = "Weight: " + res[0].weight / 10 + " kg";

    if (res[0].types.length > 0) {
      switch (res[0].types[0].type.name) {
        case "bug":
          popupCard.style.backgroundImage =
            "url('./blank-templates/grass-blank.png')";
          break;
        case "dark":
          popupCard.style.backgroundImage =
            "url('./blank-templates/dark-blank.png')";
          break;
        case "dragon":
          popupCard.style.backgroundImage =
            "url('./blank-templates/dragon-blank.png')";
          break;
        case "electric":
          popupCard.style.backgroundImage =
            "url('./blank-templates/electric-blank.png')";
          break;
        case "fairy":
          popupCard.style.backgroundImage =
            "url('./blank-templates/fairy-blank.png')";
          break;
        case "fighting":
          popupCard.style.backgroundImage =
            "url('./blank-templates/fighting-blank.png')";
          break;
        case "fire":
          popupCard.style.backgroundImage =
            "url('./blank-templates/fire-blank.png')";
          break;
        case "flying":
          popupCard.style.backgroundImage =
            "url('./blank-templates/normal-blank.png')";
          break;
        case "ghost":
          popupCard.style.backgroundImage =
            "url('./blank-templates/psychic-blank.png')";
          break;
        case "grass":
          popupCard.style.backgroundImage =
            "url('./blank-templates/grass-blank.png')";
          break;
        case "ground":
          popupCard.style.backgroundImage =
            "url('./blank-templates/fighting-blank.png')";
          break;
        case "ice":
          popupCard.style.backgroundImage =
            "url('./blank-templates/water-blank.png')";
          break;
        case "metal":
          popupCard.style.backgroundImage =
            "url('./blank-templates/metal-blank.png')";
          break;
        case "normal":
          popupCard.style.backgroundImage =
            "url('./blank-templates/normal-blank.png')";
          break;
        case "poison":
          popupCard.style.backgroundImage =
            "url('./blank-templates/psychic-blank.png')";
          break;
        case "psychic":
          popupCard.style.backgroundImage =
            "url('./blank-templates/psychic-blank.png')";
          break;
        case "rock":
          popupCard.style.backgroundImage =
            "url('./blank-templates/fighting-blank.png')";
          break;
        case "water":
          popupCard.style.backgroundImage =
            "url('./blank-templates/water-blank.png')";
          break;
        default:
          break;
      }
    }

    //  Get random moves to add to card
    if (res[0].moves.length > 0) {
      const randMove1 = Math.floor(Math.random() * res[0].moves.length);
      const randMove2 = Math.floor(Math.random() * res[0].moves.length);
      popupMoves1.textContent = res[0].moves[randMove1].move.name;
      popupMoves2.textContent = res[0].moves[randMove2].move.name;
    }

    //  Get random flavor text to add to card
    if (res[1].flavor_text_entries.length > 0) {
      const flavorTexts = res[1].flavor_text_entries.filter((flavorText) => {
        if (flavorText.language.name === "en") {
          return flavorText;
        }
      });
      console.log(flavorTexts);
      const rand = Math.floor(Math.random() * flavorTexts.length);
      popupFlavorText.textContent = flavorTexts[rand].flavor_text;
    }

    // Get evolved from res[1] dataset
    if (res[1].evolves_from_species !== null) {
      console.log(
        "has an evolves from form " + res[1].evolves_from_species.name
      );
      pokemon.getEvolvedFrom(res[1].evolves_from_species.name).then((res) => {
        console.log("asdfasfasdf");
        console.log(res);
        popupEvolutionImage.src = res.sprites.front_default;
      });
    } else {
      console.log("has no prior evolve form");
      popupEvolutionImage.src = "";
    }

    loadingAnimation.classList.remove("visible");
  });
};

const pokemonDropdownList = document.querySelector(".dropdown__list");

const createPokemonList = (generation) => {
  pokemonDropdownList.innerHTML = "";
  pokemon.getPokemon(generation).then((res) => {
    res.results.forEach((pokemon, index) => {
      const newOption = new Option(
        optionTemplate,
        pokemon,
        index,
        pokemonDropdownList,
        handlePokemonClick,
        dropdownButton
      );

      newOption.generatePokemonOption();
    });
  });
};

const dropdownButton = document.querySelector(".dropdown__button");
dropdownButton.addEventListener("click", () => {
  pokemonDropdownList.classList.toggle("visible");
});

document.addEventListener("click", (e) => {
  if (e.target !== dropdownButton) pokemonDropdownList.classList.remove("visible");
});

createPokemonList(generationOffsets[0]);
setGenButtonEventListener();

(function hola() {
  fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=999", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      localStorage.setItem("pokemon-data", JSON.stringify(res));
    });
})();

const cacheData = localStorage.getItem("pokemon-data");
console.log(cacheData);






const pokemonGridList = document.querySelector(".cards-grid__list");
const createPokemonGrid = (generation) => {
  pokemonGridList.innerHTML = "";
  pokemon.getPokemon(generation).then((res) => {
    res.results.forEach((pokemon, index) => {
      const newCard = new Card(
        cardTemplate,
        pokemon,
        index,
        pokemonGridList,
        handlePokemonClick
      );
      newCard.generatePokemonCard();
    });
  });
}


const gridButton = document.querySelector(".change-view__button_grid");
const listButton = document.querySelector(".change-view__button_list");


const pokemonGrid = document.querySelector(".cards-grid");
const dropdown = document.querySelector(".dropdown")
gridButton.addEventListener("click", () => {
  // pokemonDropdownList.innerHTML = "";
  dropdown.classList.add("is-hidden");
  pokemonGrid.classList.remove("is-hidden");

});

listButton.addEventListener("click", () => {
  // pokemonCardsList.innerHTML = "";
  pokemonGrid.classList.add("is-hidden");
  dropdown.classList.remove("is-hidden");
})


createPokemonGrid(generationOffsets[0]);



// console.log("grid margin top " + pokemonGridList.style.marginTop)

// const header = document.querySelector(".header");
// console.log(header.offsetHeight)

const setContentMargin = () => {
  const header = document.querySelector(".header");
  const headerHeight = header.offsetHeight;
  console.log("header height " + headerHeight)


  console.log("grid margin top " + pokemonGrid.style.marginTop)
  pokemonGrid.style.margin = headerHeight + "px auto 0";

  dropdown.style.margin = headerHeight + "px auto 0";
}
window.onload = setContentMargin();
window.addEventListener("resize", setContentMargin);
