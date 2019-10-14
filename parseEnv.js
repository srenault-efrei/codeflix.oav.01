const fs = require("fs");

module.exports = function parseEnv(content) {

    let object = {}
    let regex = /^([\w]+)=(.+)/g
    const lines = content.split("\n")


    for (const line of lines) {
        let matchLine = line.match(regex);
        if (matchLine != null) {
            let arraySeparator = matchLine[0].split('=')
            object[arraySeparator[0]] = arraySeparator[1]
        }
    }

    let date = new Date();
    let fullDate = '';
    if (date.getMonth() <= 9) {
        fullDate = date.getFullYear() + '' + '0' + date.getMonth() + '' + date.getDay() + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds();
    } else {
        fullDate = date.getFullYear() + '' + date.getMonth() + '' + date.getDay() + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds();
    }

    let data = JSON.stringify(object, null, 4)
    let newFile = "env." + fullDate + '.json'

    fs.writeFile(newFile, data, (err) => {
        if (err) throw err;
    });

    return 'File ' + newFile + ' has been successfully created'
}