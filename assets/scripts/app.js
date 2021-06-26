const pokeContainer = document.getElementById('pokeContainer');
const pokeBusqueda = document.getElementById('nombre');
const numberOfPokemons = 151;
let pokemone = [];

const colors = {
  fire: '#F05030',
  grass: '#78C850',
  electric: '#F8D030',
  water: '#3899F8',
  ground: '#E9D6A4',
  rock: '#B8A058',
  fairy: '#E79FE7',
  poison: '#B058A0',
  bug: '#A8B820',
  dragon: '#7860E0',
  psychic: '#F870A0',
  flying: '#98A8F0',
  fighting: '#A05038',
  normal: '#A8A090',
  steel: '#A8A8C0',
  ghost: '#6060B0',
  ice: '#58C8E0',
  dark: '#7A5848',
};

const fetchPokemons = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const result = await fetch(url);
  const pokemon = await result.json();
  return pokemon;
};

const init = async () => {
  const promises = [];
  for (let i = 1; i <= numberOfPokemons; i++) {
    promises.push(fetchPokemons(i));
  }
  pokemone = await Promise.all(promises);
  renderPokemone();
};

const renderPokemone = (name = '') => {
  name = name.toLowerCase();
  pokeContainer.innerHTML = null;
  pokemone
    .filter(pokemon => pokemon.name.includes(name))
    .forEach(pokemon => createCard(pokemon));
};

pokeBusqueda.addEventListener('keyup', event => {
  const searchTerm = event.target.value;
  renderPokemone(searchTerm);
});

//In order to use this function, uncomment getAllTypes()
// const createCard = (pokemon) => {
//   const pokeEl = document.createElement("div");
//   pokeEl.classList.add("pokemon");
//   pokeEl.innerHTML = `
//   <img src="${pokemon.sprites.front_default}" alt="${
//     pokemon.name
//   }" class='img-container'>
//   <p>#${pokemon.id}</p>
//   <h1>${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h1>
//   <p>Type: ${getAllTypes(pokemon.types)}<p>
//   <p>Type: ${pokemon.types.map((types) => types.type.name[0].toUpperCase() + types.type.name.slice(1)).join(", ")}<p>
//   `;
//   pokeContainer.appendChild(pokeEl);
// };

const createCard = pokemon => {
  const pokeEl = document.createElement('div');
  pokeEl.classList.add('pokemon');
  const elementalTypes = pokemon.types.map(types => types.type.name);
  const backgroundColour = `linear-gradient(315deg, ${
    colors[elementalTypes[elementalTypes.length - 1]]
  } 0%, ${colors[elementalTypes[0]]} 75%)`;
  pokeEl.style.backgroundImage = backgroundColour;
  pokeEl.innerHTML = `
  <img src="https://pokeres.bastionbot.org/images/pokemon/${
    pokemon.id
  }.png" alt="${pokemon.name}" class='img-container'>

  <p>#${pokemon.id}</p>
  <h1>${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h1>
  <p>Type: ${elementalTypes
    .map(type => type[0].toUpperCase() + type.slice(1))
    .join(', ')}</p>
  `;
  pokeContainer.appendChild(pokeEl);
};

// <p>Type: ${pokemon.types.map(types => types.type.name[0].toUpperCase() + types.type.name.slice(1)).join(", ")}<p>

//getAllTypes() needs and array as argument
// const getAllTypes = (types) => {
//   let allTypes = "";
//   for (let i = 0; i < types.length; i++) {
//     allTypes +=
//     i == types.length - 1 ? types[i].type.name : `${types[i].type.name}, `;
//   }
//   return allTypes;
// };

init();
