const decompress = require('decompress');
const path = require("path");

function getFilename(absolutePath) {
    const baseName = path.basename(absolutePath);
    const matched = baseName.match(/^(.*).plugin$/);
    return matched && matched.length == 2 ? matched[1] : undefined;
}

module.exports = (() => {
    var absolutePath = process.argv[2];
    if (!absolutePath) {
       return;
    }

    const fileName = getFilename(absolutePath);
    if (!fileName) {
        return;
    }
    
    decompress(
        absolutePath, 
        `plugins/${fileName}`
    )
    .then(files => {
        console.log('done!');
    })
})();