const fs =  require('fs');

const mapping = {
    "SCANNER": [
        "Invoke"
    ]
};

module.exports = (() => {
    var plugins = {};
    
    fs.readdirSync('plugins').forEach(file => {
        if (fs.statSync(`./plugins/${file}`).isDirectory()) {
           var data = fs.readFileSync(`./plugins/${file}/plugin.json`, 'utf8');
           var pluginInfo = {directory: file, ...JSON.parse(data)};
           
           plugins = {
                ...plugins, 
                [pluginInfo.type]: plugins[pluginInfo.type] ? [...plugins[pluginInfo.type], pluginInfo] : [pluginInfo]
            };
        }
    })
    
    for (const pluginType in plugins) {
        for (const plugin of plugins[pluginType]) {
            console.log(plugin.name);
        }
    }
})();