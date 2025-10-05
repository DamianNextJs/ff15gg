// import fs from "fs";
// import path from "path";
// import champions from "@/lib/data/championFull.json";

// const filteredChampions = Object.fromEntries(
//   Object.values(champions.data).map((champ) => [
//     champ.key,
//     {
//       id: champ.id,
//       name: champ.name,
//       spells: champ.spells.map((spell) => ({
//         id: spell.id,
//         name: spell.name,
//         description: spell.description,
//         cooldown: spell.cooldown,
//         image: spell.image.full,
//       })),
//       passive: {
//         name: champ.passive.name,
//         description: champ.passive.description,
//         image: champ.passive.image.full,
//       },
//     },
//   ])
// );

// const outPath = path.resolve("./src/lib/data/championFiltered.json");

// fs.writeFileSync(outPath, JSON.stringify(filteredChampions, null, 2));

// console.log("Filtered JSON written to src/lib/data/championFiltered.json");
