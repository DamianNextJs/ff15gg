// import fs from "fs";
// import path from "path";
// import items from "@/lib/data/item.json";

// const filteredItems = Object.fromEntries(
//   Object.entries(items.data)
//     .filter(([_, item]) => item.maps["11"] || item.maps["12"])
//     .map(([key, item]) => [
//       key,
//       {
//         name: item.name,
//         description: item.description,
//         gold: item.gold.total,
//         plaintext: item.plaintext,
//       },
//     ])
// );

// const outPath = path.resolve("./src/lib/data/itemFiltered.json");

// fs.writeFileSync(outPath, JSON.stringify(filteredItems, null, 2));

// console.log("Filtered JSON written to src/lib/data/itemFiltered.json");
