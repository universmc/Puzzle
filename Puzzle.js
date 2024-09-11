const OpenAI = require("openai");
const fetch = require("node-fetch"); // Importer node-fetch pour télécharger l'image
const fs = require("fs"); // Importer fs pour écrire le fichier localement

const openai = new OpenAI();

async function main() {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: "Generate for me a programmable high-definition multidimensional programmable illustrating a map of the universe on a digital PUZZLE (grid display) Space & Time mappping process l'image doit etre en 16:9 au format .webp",
    n: 1,
    size: "1792x1024",
  });

  const imageUrl = response.data[0].url;
//  console.log(`Image URL: ${imageUrl}`);

  // Télécharger et sauvegarder l'image
  const dateStr = new Date().toISOString().replace(/[:.]/g, "-"); // Format de date sécurisé pour le nom de fichier
  const fileName = `output/file-name_${dateStr}.webp`;

  const responseFetch = await fetch(imageUrl);
  const buffer = await responseFetch.buffer();
  fs.writeFile(fileName, buffer, () => 
    console.log(`Image sauvegardée en tant que ${fileName}`)
  );
}

main();
