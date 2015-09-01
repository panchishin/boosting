(function(){


function configWithDefaults(config,defaults) {
    function F() { return config }
    F.prototype = defaults;
    return new F();
}

module.exports = configWithDefaults

})();
