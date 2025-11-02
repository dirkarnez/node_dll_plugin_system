const edge = require('edge-js');
const path = require('path');

// function check(path, methodName, input, callback) {
//     edge.func('./reflector/DllMethodReflector.dll')(path, function (error, result) {
//         if (error || !result) {
//             console.log('error');
//         } else {
//             var matched;
//             for (var item of result) {
//                 if(methodName === item) {
//                     matched = item;
//                     break;
//                 }
//             }

//             if (matched) {
//                 edge.func({
//                     assemblyFile: path,
//                     methodName: item // This must be Func<object,Task<object>>
//                 })(input, callback);
//             } else{
//                 callback(`no such method <${methodName}>`);
//             }
//         }
//     });
// }

// printInterface = {
//     metadata: {
//         name: "printer"
//     },
//     availableMethods: [
//         "Invoke"
//     ]
// }

// // check("C:\\Users\\alex.chan\\Desktop\\SunCRM\\SunCRM.Hardware\\SunCRM.Hardware.DocReader\\SunCRM.Hardware.DocReader\\bin\\Debug\\SunCRM.Hardware.DocReader.dll", "Invoke", {}, function (error, result) {
// //     if (error) {
// //         console.log(error);
// //     } else {
// //         console.log("result");
// //     }
// // });

// function checkIfisPrinterDLL(path, availableMethods) {
//     edge.func('./reflector/DllMethodReflector.dll')(path, function (error, result) {
//         if (error || !result) {
//             console.log('error');
//         } else {
//             var hasMethod = false;
//             for (var availableMethod of availableMethods) {
//                 hasMethod = false;
//                 for (var item of result) {
//                     if(availableMethod === item) {
//                         hasMethod = true;
//                         break;
//                     }
//                 }
//                 if (!hasMethod) {
//                     break;
//                 }
//             }

//             return hasMethod;
//         }
//     });
// }

// // callback to await
// if (checkIfisPrinterDLL("C:\\Users\\alex.chan\\Desktop\\SunCRM\\SunCRM.Hardware\\SunCRM.Hardware.DocReader\\SunCRM.Hardware.DocReader\\bin\\Debug\\SunCRM.Hardware.DocReader.dll", printInterface.availableMethods)) {
//     console.log(printInterface.metadata.name);
// }


// module.exports = (pluginInfo, input, callback) => {
//     const { directory, entry, method } = pluginInfo;
//     const absolutePath = path.join(__dirname, "plugins", directory, entry);
    
//     edge.func({
//         assemblyFile: absolutePath,
//         methodName: "Invoke" // This must be Func<object,Task<object>>
//     })(input, callback);
// };
const fs = require("fs");

module.exports = (() => {
    var pluginName = process.argv[2];
    if (!pluginName) {
       return;
    }

    const absolutePath = path.join(__dirname, "plugins", pluginName, "plugin.json");

    const content = JSON.parse(fs.readFileSync(absolutePath));

    const dllPath = path.join(__dirname, "plugins", pluginName, content.entry);

    edge.func({
        assemblyFile: dllPath,
        methodName: process.argv.length > 3 ? process.argv[3] : content.method[0]
    })({}, function (err, result)  {
        if (err) {
            console.log(err);
        }
    });
})();