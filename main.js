const path = require("path");
const fs = require("fs");
const parseIni = require("./parseIni")
const parseEnv = require("./parseEnv")

const args = process.argv.slice(2);

if (args.length !== 1) {
    console.log("usage: node main.js <CONFIG_FILENAME>");
    process.exit(0)
}
else {

    const filename = args[0];

    if (!fs.existsSync(filename)) {
        console.log(`The file ${filename} does not exist.`);
        process.exit(-1)
    }
    else {
        let extension = path.extname(filename);
        const content = fs.readFileSync(filename, "utf-8");

        if (extension == '') {
            console.log(parseEnv(content))
        }
        else if (extension == '.ini') {
            console.log(parseIni(content))
        }
    }
}