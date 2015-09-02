[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Auto Test Status][travis-image]][travis-url] [![license][license-image]][license-url] [![Gitter chat][gitter-image]][gitter-url]

The *Boosting* package is a general boosting algorithm which make a group of classifiers act as one improved classifier.

What is a classifier?  A classifier is something (a function in this case) that determines if a thing is *one* kind of thing or *another* kind.  For example, suppose you have a few different functions that can scan images and detect if a persons face is in the image.  Either there is a face or there isn't.  Those functions are classifiers.  Independently they may not do all that well.  Boosting organizes and scales them so that together your functions do a better job than any one of them by themselves.  If there is a classifier that isn't important, redundant, or that is confusing the issue *Boosting* can detect that and exclude it.

Much like [Genetic Algorithm](https://www.npmjs.com/package/geneticalgorithm), [Nearest Neighbour](https://www.npmjs.com/package/nearestneighbour), and [Neural Nets](https://www.npmjs.com/package/neuralnet), Boosting requires a training set.  

To use Boosting you'll need some classifiers (that you write yourself or created from Neural Nets, Nearest Neighbours, or etc) and some data (such as voter turn out or hockey stats).

Section Links : [Construction](#construction) , [Execution](#execution) , [Example](#example) , [FAQ](#faq) , [Related](#related-ai-projects) , and [References](#references)

# Construction

### Boosting constructor
Boosting is created like so:
```js
var BoostingConstructor = require('boosting')
var boosting = BoostingConstructor( )
```

Here is the full configuration object and the constructor.
```js
var config = {
	known 		: [],  // a list of known objects
	classifiers : [],  // a list of classifier objects
}
var BoostingConstructor = require('boosting')
var boosting = BoostingConstructor( config )
```
Quick links to more information about the [config](#configuration) , [known](#known-list) , and [classifiers](#classifier-list).

You really don't need to use the config.  Instead you can use the add functions.  All configuration options are optional.

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

### boosting.optimize( )
> Returns boosting

Review ALL the known points of data against ALL the classifiers and organize them according to the *Boost* algorithm.  If you provided a LOT of known points and classifiers then be prepared for this to take a really really long time.  For a few hundred or thousand combinations it should be lightening fast.

Call boosting optimize like so:
```js
boosting.optimize( )
```
Wow, that was easy.  Okay, maybe you want to enforce an alphaThreshold.  If you do, then pass it as a parameter.  Don't know what an alphaThreshold is?  No problem.  Don't set it.
```js
boosting.optimize( alphaThreshold )
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

### Known List
```js
known = [
	{ data : data1 , value : +1 },
	{ data : data2 , value : -1 },
	{ data : data3 , value : +1 },
	....
]
```
### Classifiers List
```js
classifiers = [
	{ exec : classifierFunction1 , name : "name1" },
	{ exec : classifierFunction2 , name : "name2" },
	...	
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
console.log( "classify(1) Should return '1' : " + boosting.classify( 1 ) )
console.log( "classify(6) Should return '-1' : " + boosting.classify( 6 ) )

var config = boosting.config()
console.log( "Should use the classifier named 'less than 5' : " + (config.goodClassifiers[0].name == "less than 5") )
console.log( "Should only use the classifier named 'less than 5' : " + (config.goodClassifiers.length == 1) )
```

# FAQ

*Can I use Boosting on Boosting?*  Yes you can!  Will it do anything extra?  Maybe.  If you have a few classifiers and a boosting of some other classifiers then you could use boosting again to combine the whole lot.  Enjoy.

*What about over-fitting?*  Yes, over fitting is a problem with Neural Nets, Genetic Algorithms, and the like.  Boosting seems to not suffer from that problem.  Can you take a neural net that has been trained to overfit a problem and wrap it in Boosting to magically fix it?  No.  But if you had a few more neural nets and possibly a nearest neighbour and binomial classification all wrapped in boosting then, yes, over-fitting will be less of a problem.

# Related AI Projects
This is part of a set of related projects.

* [AlphaBeta](https://www.npmjs.com/package/alphabeta) - decision making vs an opponent
* [Boosting](https://www.npmjs.com/package/boosting) - grouping of classifiers
* [GeneticAlgorithm](https://www.npmjs.com/package/geneticalgorithm) - mimic evolution
* [NearestNeighbour](https://www.npmjs.com/package/nearestneighbour) - closest match to previous experience
* [NeuralNet](https://www.npmjs.com/package/neuralnet) - mimic brain cells

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

