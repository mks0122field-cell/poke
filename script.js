const btn = document.getElementById("submitBtn");
const texttype = document.getElementById("texttype");
const container = document.getElementById("container");


btn.addEventListener("click", async () => {
    const NameId = texttype.value.toLowerCase();
    document.getElementById("poke_name").innerHTML = "<p>読み込み中</p>";
    document.getElementById("poke_name").style.display = ""; document.getElementById("poke_img").innerHTML = ``;

    document.getElementById("poke_types").textContent = "";
    document.getElementById("poke_height").textContent = "";
    document.getElementById("poke_weight").textContent = "";
    document.getElementById("poke_abilities").textContent = "";

    try {
        const INPUTNAME = texttype.value.normalize("NFKC");
        const foundpokemon = pokelist.find(pokemon => pokemon.ja === INPUTNAME);
        const foundpokemon_en = foundpokemon ? foundpokemon.en.toLowerCase() : INPUTNAME.toLowerCase();


        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${foundpokemon_en}`);
        const data = await response.json();
        const name = data.name;
        const imageUrl = data.sprites.front_default;
        const weight = data.weight / 10;
        const height = data.height / 10;
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const jpName = speciesData.names.find(nameObj => nameObj.language.name === "ja");//ポケモンの日本語名を取得
        const JPN_NAME = jpName ? jpName.name : data.name;
        

        const abilityNames = await Promise.all(data.abilities.map(async (ability) => {
            const abilityResponse = await fetch(ability.ability.url);
            const abilityData = await abilityResponse.json();
            const abilityName = abilityData.names.find(nameObj => nameObj.language.name === "ja");
            return abilityName ? abilityName.name : ability.ability.name;

         
        }));
        const typeNames = await Promise.all(data.types.map(async (type) => {
            const typeResponse = await fetch(type.type.url);
            const typeData = await typeResponse.json();
            const typeName = typeData.names.find(nameObj => nameObj.language.name === "ja");
            return typeName ? typeName.name : type.type.name;
        }));

        document.getElementById("poke_name").innerHTML = JPN_NAME;
        document.getElementById("poke_img").innerHTML = `<img src="${imageUrl}" alt="${name}">`;

        document.getElementById("poke_types").textContent = "タイプ: " + typeNames.join(", ");
        document.getElementById("poke_height").textContent = "高さ: " + height + "m";
        document.getElementById("poke_weight").textContent = "重さ: " + weight + "kg";
        document.getElementById("poke_abilities").textContent = "特性: " + abilityNames;

    }
    catch (error) {
        document.getElementById("poke_name").innerHTML = "ポケモンがいません";
        document.getElementById("poke_img").innerHTML = "ポケモンがいません";
    }
});

