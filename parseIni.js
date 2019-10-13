const fs = require("fs");
module.exports = function parseIni(content) {
    // on lit un contenu ligne par ligne et on evite les commentaires
    // split pour couper
    const lines = content.split("\n")
    const regexContent = /^([\w]+[\s]*|[\w]+\.[\w]+[\s]*)=([\s]+".+|[\s]+\/.+|[\s]+-[0-9]|[\s]*[\w]+|([\s]$)+|[\w]+\.[\w]+|(?!.))|^(\[.+\])/g
     const reg = /^([\w]+[\s]*|[\w]+\.[\w]+[\s]*)=[\s](?!.)/g


    let tabObject = []

    // let object = {}
    let final = {}
    let category = ''
    // let tabObject = []

    // object['shirt'] = 'bla'


    for (const line of lines) {
        
        let matchLine = line.match(regexContent)
        if (matchLine != null) {
            // console.log(matchLine)
            // console.log(matchLine[0])
            if (matchLine[0].includes('[')) {
                category = matchLine[0].replace(/(^\[|\]$)/g, "")
                //    console.log(category)
                tabObject = []
                // tabObject.push(object);
                // final[category] = tabObject
            } else {
                
                let arraySeparator = matchLine[0].split('=')
                console.log(arraySeparator)
                let key = arraySeparator[0].trim()
                let value = arraySeparator[1].trim()
                let objectCategory = {}
                objectCategory[key] = value
                tabObject.push(objectCategory)
                //  arraySeparator.trim();
            }
            final[category] = tabObject
        }
    }

    let data = JSON.stringify(final,null,4)
    let newFile = 'phpParse.json'
    
    fs.writeFile(newFile, data, (err) => {
        if (err) throw err;
    });

    return 'File ' + newFile + ' has been successfully created'

    // objectCategory['engine'] = 'on'
    // object['shirt'] = 'bla'
    // tabObject.push(objectCategory);
    // tabObject.push(object);
    // final["php"] = tabObject 


    // console.log(JSON.stringify(final, null, 4))


}