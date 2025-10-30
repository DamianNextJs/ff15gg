// import fs from "fs";
// import path from "path";
// import runes from "@/lib/data/runesReforged.json";

// const filteredRunes = Object.fromEntries(
//   Object.values(runes).map((runeTree) => [
//     runeTree.id,
//     {
//       key: runeTree.key,
//       icon: runeTree.icon,
//       name: runeTree.name,
//       slots: runeTree.slots.map((slot) =>
//         slot.runes.map((rune) => ({
//           id: rune.id,
//           key: rune.key,
//           icon: rune.icon,
//           name: rune.name,
//           shortDesc: rune.shortDesc,
//           longDesc: rune.longDesc,
//         }))
//       ),
//     },
//   ])
// );

// const outPath = path.resolve("./src/lib/data/runeFiltered.json");

// fs.writeFileSync(outPath, JSON.stringify(filteredRunes, null, 2));

// console.log("Filtered JSON written to src/lib/data/runeFiltered.json");
