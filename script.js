const btn = document.getElementById("submitBtn");
const texttype = document.getElementById("texttype");
const container = document.getElementById("container");


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
    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();
    const name = speciesData.names.find(item => item.language.name === "ja-Hrkt")?.name
        ?? speciesData.names.find(item => item.language.name === "ja")?.name
        ?? data.name;
    const imageUrl = data.sprites.front_default;
    const weight = data.weight / 10;
    const height = data.height / 10;

   document.getElementById("poke_name").innerHTML = name;
   document.getElementById("poke_img").innerHTML = `<img src="${imageUrl}" alt="${name}">`;

   document.getElementById("poke_types").textContent = "タイプ: " + data.types.map(type => type.type.name).join(", ");
   document.getElementById("poke_height").textContent = "高さ: " + height + "m";
   document.getElementById("poke_weight").textContent = "重さ: " + weight + "kg";
   document.getElementById("poke_abilities").textContent = "特性: " + data.abilities.map(ability => ability.ability.name).join(", ");

   }
catch (error) {
    document.getElementById("poke_name").innerHTML = "ポケモンがいません";
    document.getElementById("poke_img").innerHTML = "ポケモンがいません";
   }
});
   