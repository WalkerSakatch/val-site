module.exports = function override (config, env) {
    let loaders = config.resolve
    loaders.fallback = {
        "https": false,
    }
    
    return config
}