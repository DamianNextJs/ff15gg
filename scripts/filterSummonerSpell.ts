// import fs from "fs";
// import path from "path";
// import summonerSpells from "@/lib/data/summoner.json";

// const filteredSummonerSpells = Object.fromEntries(
//   Object.entries(summonerSpells.data)
//     .filter(
//       ([_, spell]) =>
//         spell.modes.includes("CLASSIC") || spell.modes.includes("ARAM")
//     )
//     .map(([_, spell]) => [
//       spell.key,
//       {
//         id: spell.id,
//         name: spell.name,
//         description: spell.description,
//         cooldown: spell.cooldown,
//         key: spell.key,
//         modes: spell.modes.filter(
//           (mode) => mode === "ARAM" || mode === "CLASSIC"
//         ),
//         image: spell.image.full,
//       },
//     ])
// );

// const outPath = path.resolve("./src/lib/data/summonerSpellFiltered.json");

// fs.writeFileSync(outPath, JSON.stringify(filteredSummonerSpells, null, 2));

// console.log("Filtered JSON written to src/lib/data/summonerSpellFiltered.json");
