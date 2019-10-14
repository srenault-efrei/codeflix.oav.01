module.exports = function nameFile (str){
    let date = new Date();
    let character = ''

    if (date.getMonth() <= 9) {
        character = '0'
    }
    return fullDate = str + date.getFullYear() + '' + character + date.getMonth() + '' + date.getDay() + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds()+'.json';
}