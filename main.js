const path = require("path") // pour afficher le chemin du fichier 
const fs = require("fs") // pour lire dans un fichier 
const ini = require('data/parseIni') // on appelle le fichie

const args = process.argv.slice(2) // recupere les arguments
console.log(args)


// verifie si on a inscrit le bon nombre d'arguments
if (args.lenght !== 1) {
    console.log("Usage : node main.js <CONFIG_FILENAME>")
    process.exit(0) // valeur de retour pour quitter l'application
}
else {

    const filename = args[0];

    console.log(path.extraname(filename)); // affiche .xx du fichier 


    // step 1 : check if extension is .env or .ini  A FAIRE 
    if (fs.existsSync(filename)) {
        console.log("le fichier n'existe pas")
        process.exit(0)
    }

    // step 2 : lire le contenu 

    let content = fs.readFileSync(filename, 'utf-8')
    console.log(content);

    // step 3 : parcourir les caracteres ou faire un REGEX , utiliser le site REGEX

}


// RGEX : ^([\w]+) -> recupere les clefs dans env