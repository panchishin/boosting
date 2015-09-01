[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Auto Test Status][travis-image]][travis-url] [![license][license-image]][license-url] [![Gitter chat][gitter-image]][gitter-url]

a generic boosting algorithm, useful for A.I. applications to improve performance of a crowd of algorithms

Section Links : [Construction](#construction) , [Execution](#execution) , [Examples](#example) , [Related](#related-ai-projects) , and [References](#references)

# Construction

### Boosting constructor
Create a Boost like so:
```js
var BoostingConstructor = require('boosting')
var boosting = BoostingConstructor( )
```
Or simply in one line like so:
```js
var boosting = require('boosting')( )
```
Here is the full configuration object and the constructor.
```js
var config = {
	known 		: [],  // a list of known objects (see below)
	classifiers : [],  // a list of classifier objects (see below)
}
var BoostingConstructor = require('boosting')
var boosting = BoostingConstructor( config )
```
You really don't need to send in the config.  Instead you can use the add functions.  All configuration options are optional.  If you want to make two different calculates you'll want to create two instances of Boosting each with its own configuration.

### boosting.config()
> Returns config

Want to retrieve or inspect the configurate?  No problem, do it like so:
```js
var theConfig = boosting.config()
```

### boosting.addData( data , binaryValue)
> Returns boosting

Don't want to mess around with the *known* object list in the config?  No problem, add known data using the addData function.  The data is whatever your classifier functions take as an argument and the binaryValue *must be* either -1 or +1.
```js
boosting.addData( "cupcake" , -1 )
```

### boosting.addClassifier( classifierFunction , handyName )
> Returns boosting

Don't want to mess around with the *classifiers* list in the config?  No problem, add your classifier functions using the addClassifier function.  Sound familar?  The classifierFunction takes the *data* you supplied in *.addData* and *must* return either -1 or +1.  Not 0.  Not 7.3.  -1 or +1.  The handy name is optional.  Use it like so:

```js
var myClassifier = function(data) { 
	/* do something and return -1 or +1 */
}
# add it
boosting.addClassifier( myClassifier )

# or add it with a nice name, useful for debugging
boosting.addClassifier( myClassifier , "win function")
```

# Execution

### boosting.optimizer( )
> Returns boosting

Review ALL the known points of data against ALL the classifiers and organize them according to the *Boost* algorithm.  If you provided a LOT of known points and classifiers then be prepared for this to take a really really long time.  For a few hundred or thousand combinations it should be lightening fast.

Call the boosting optimizer like so:
```js
boosting.optimizer( )
```
Wow, that was easy.  Okay, maybe you want to enforce an alphaThreshold.  If you do, then pass it as a parameter.  Don't know what an alphaThreshold is?  No problem.  Don't set it.
```js
boosting.optimizer( alphaThreshold )
```
Why would you enforce an alphaThreshold?  Well, maybe you don't want useless classifiers to be included in the optimization.  Of course that means you'll have to find out what alphaThreshold means.  Or not.

### boosting.classify( data )
> Returns +1 or -1

Test some data.  This is where it all comes together.  You've configured your boosting function, added your data and classifiers, and optimized it.  Now you have some data that you want classified.  Do it like so:
```js
var result = boosting.classify( data )
```


# Configuration
This is the specification of the configuration arrays you pass to boosting

### classifiers
```js
classifiers = [
	{ exec : classifierFunction1 , name : "name1" },
	{ exec : classifierFunction2 , name : "name2" },
	...	
]
```

### known
```js
known = [
	{ data : data1 , value : +1 },
	{ data : data2 , value : -1 },
	{ data : data3 , value : +1 },
	....
]
```


# Example
```js
var boosting = require('./boosting')()
boosting.addClassifier( function(x) { return x < 5 ? +1 : -1 } , "less than 5")
boosting.addClassifier( function(x) { return x % 2 ? +1 : -1 } , "odd")
boosting.addData( 0 , +1 )
boosting.addData( 2 , +1 )

boosting.optimize(0)
var config = boosting.config()

console.log( "Should use the classifier named 'less than 5' : " + (config.goodClassifiers[0].name == "less than 5") )
console.log( "Should only use the classifier named 'less than 5' : " + (config.goodClassifiers.length == 1) )
console.log( "classify(1) Should return '1' : " + boosting.classify( 1 ) )
console.log( "classify(6) Should return '-1' : " + boosting.classify( 6 ) )
```


# Related AI Projects
This is part of a set of related projects.

* [AlphaBeta](https://www.npmjs.com/package/alphabeta)
* [Boosting](https://www.npmjs.com/package/boosting)
* [GeneticAlgorithm](https://www.npmjs.com/package/geneticalgorithm)
* [NearestNeighbour](https://www.npmjs.com/package/nearestneighbour)
* [NeuralNet](https://www.npmjs.com/package/neuralnet)

# References

* [Instructor: Patrick Winston from MIT](https://www.youtube.com/watch?v=UHBmv7qCey4)


[npm-url]: https://npmjs.org/package/boosting
[npm-image]: http://img.shields.io/npm/v/boosting.svg

[gitter-url]: https://gitter.im/panchishin/boosting
[gitter-image]: https://badges.gitter.im/panchishin/boosting.png
[downloads-image]: http://img.shields.io/npm/dm/boosting.svg

[travis-url]: https://travis-ci.org/panchishin/boosting
[travis-image]: http://img.shields.io/travis/panchishin/boosting.svg

[license-image]: https://img.shields.io/badge/license-Unlicense-green.svg
[license-url]: https://tldrlegal.com/license/unlicense

