const btn = document.getElementById("submitBtn");
const texttype = document.getElementById("texttype");
const container = document.getElementById("container");

function getJapaneseName(names, fallback) {
    return names.find(item => item.language.name === "ja-Hrkt")?.name
        ?? names.find(item => item.language.name === "ja")?.name
        ?? fallback;
}

btn.addEventListener("click",async () => {
    const NameId = texttype.value.toLowerCase();
   document.getElementById("poke_name").innerHTML = "<p>読み込み中</p>";
   document.getElementById("poke_name").style.display = "";document.getElementById("poke_img").innerHTML = ``;
   
   document.getElementById("poke_types").textContent = "";
   document.getElementById("poke_height").textContent = "";
   document.getElementById("poke_weight").textContent = "";
   document.getElementById("poke_abilities").textContent = "";

   try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${NameId}`);
    const data = await response.json();
    const [speciesData, typeData, abilityData] = await Promise.all([
        fetch(data.species.url).then(response => response.json()),
        Promise.all(data.types.map(type => fetch(type.type.url).then(response => response.json()))),
        Promise.all(data.abilities.map(ability => fetch(ability.ability.url).then(response => response.json())))
    ]);
    const name = getJapaneseName(speciesData.names, data.name);
    const imageUrl = data.sprites.front_default;
    const weight = data.weight / 10;
    const height = data.height / 10;

   document.getElementById("poke_name").innerHTML = name;
   document.getElementById("poke_img").innerHTML = `<img src="${imageUrl}" alt="${name}">`;

   document.getElementById("poke_types").textContent = "タイプ: " + typeData.map(type => getJapaneseName(type.names, type.name)).join(", ");
   document.getElementById("poke_height").textContent = "高さ: " + height + "m";
   document.getElementById("poke_weight").textContent = "重さ: " + weight + "kg";
   document.getElementById("poke_abilities").textContent = "特性: " + abilityData.map(ability => getJapaneseName(ability.names, ability.name)).join(", ");

   }
catch (error) {
    document.getElementById("poke_name").innerHTML = "ポケモンがいません";
    document.getElementById("poke_img").innerHTML = "ポケモンがいません";
   }
});
   