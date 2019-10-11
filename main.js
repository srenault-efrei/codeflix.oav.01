const path = require("path");// module des chemins
const fs = require("fs");// module du fichier
const parseIni = require("./parseIni")
const parseEnv = require("./parseEnv")

const args = process.argv.slice(2); // recupere les argss

//verifie le nombre arg

if (args.length !== 1) {
    console.log("usage: node main.js <CONFIG_FILENAME>");
    process.exit(0)
}
else {

    const filename = args[0];
    //Step1 : check if extension is .env or .ini

    if (!fs.existsSync(filename)) {
        console.log(`The file ${filename} does not exist.`);
        process.exit(-1)
    }

    else{
// faire un slice pour recupere le .extension et  pointe sur le fichier .extension
        let extension = path.extname(filename); // affiche .xx du fichier 
        const content = fs.readFileSync(filename, "utf-8");

        if(extension == ''){
            console.log(parseEnv(content))
        }
        else if (extension == '.ini'){
            parseIni(content)
        }
      
    }
    
}

