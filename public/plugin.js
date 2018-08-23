function plugin(options) {
    // Configure your plugin with options...
}

plugin.prototype.apply = function (compiler) {
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
        console.log('The compiler is starting a new compilation...');

        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
            'MyPlugin',
            (data, cb) => {
                data.html += 'The Magic Footer'
                console.log(data.html);
                cb(null, data)
            }
        )
    })
}


module.exports.plugin = plugin;