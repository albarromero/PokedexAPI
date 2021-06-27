const poke_container = document.getElementById("container");
const POKE_COUNT = 150;
const type_colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#F4E7DA",
    rock: "#D5D5D4",
    fairy: "#FCEAFF",
    poison: "#98D7A5",
    bug: "#F8D5A3",
    dragon: "#97B3E6",
    psychic: "#EAEDA1",
    flying: "#F5F5F5",
    flighting: "#E6E0D4",
    normal: "#F5F5F5"
}

const main_types = Object.keys(type_colors);

const fetchPokemon = async ()=>{
    for(let i = 1; i<=POKE_COUNT; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data);
}

const createPokemonCard = (pokemon)=> {
    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon");
    const pokemon_name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const pokemon_id = pokemon.id.toString().padStart(3,"0");
    const pokemon_types = pokemon.types.map(type=>type.type.name);
    const type = main_types.find(type => pokemon_types.indexOf(type) > -1);
    const color = type_colors[type];
    pokemonElement.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">
    </div>
    <div class="info">
        <span class="number">#${pokemon_id}</span>
        <h3 class="name">${pokemon_name}</h3>
        <h4 class="type">Type: <span>${type}</span></h4>
    </div>
    `;

    pokemonElement.innerHTML =pokemonInnerHTML;
    poke_container.appendChild(pokemonElement);
}

fetchPokemon();