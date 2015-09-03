[![Issues][issues-image]][issues-url] [![Downloads][downloads-image]][downloads-url] [![Auto Test Status][travis-image]][travis-url] [![license][license-image]][license-url] [![Gitter chat][gitter-image]][gitter-url]

The *Boosting* package is a general boosting algorithm which make a group of classifiers act as one improved classifier.

What is a classifier?  A classifier is something (a function in this case) that determines if a thing is *one* kind of thing or *another* kind.  For example, suppose you have a few different functions that can scan images and detect if a persons face is in the image.  Either there is a face or there isn't.  Those functions are classifiers.  Independently they may not do all that well.  Boosting organizes and scales them so that together your functions do a better job than any one of them by themselves.  If there is a classifier that isn't important, redundant, or that is confusing the issue *Boosting* can detect that and exclude it.

Much like [Genetic Algorithm](https://www.npmjs.com/package/geneticalgorithm), [Nearest Neighbour](https://www.npmjs.com/package/nearestneighbour), and [Neural Nets](https://www.npmjs.com/package/neuralnet), Boosting requires a training set.  

To use Boosting you'll need some classifiers (that you write yourself or created from Neural Nets, Nearest Neighbours, or etc) and some data (such as voter turn out or hockey stats).

Section Links : [Construction](#construction) , [Execution](#execution) , [Configuration](#configuration) , [Example](#example) , [FAQ](#faq) , [Related](#related-ai-projects) , and [References](#references)

# Construction

### require('boosting')
The Boosting Constructor is created like so:
```js
var BoostingConstructor = require('boosting')
var config = { /* config options */ }
var boosting = BoostingConstructor( config )
```
Or as a one liner with default config:
```js
var boosting = require('boosting')( )
```
That's it.  Of course there are more [configuration](#configuration) options, but they are all optional.


### boosting.addClassifier( classifierFunction , handyName )
> Returns boosting

Add your classifier functions using the addClassifier function.  Your classifierFunction takes training and actual data you supply.  Your classifier returns a boolean.  You can also give it a handy name, but that is optional.  Use it like so:

```js
var myClassifier = function(data) { 
	/* do something and return something truthy or falsy */
}
# add it
boosting.addClassifier( myClassifier )

# or add it with a nice name, useful for debugging
boosting.addClassifier( myClassifier , "win function")
```
Why add a name?  No real reason other than debugging and self-documentation.


### boosting.addData( data , boolean )
> Returns boosting

Add training data using the addData function.  The data is whatever your classifier functions take as an argument and the boolean value can be any javascript truthy or falsy value.
```js
boosting.addData( "cupcake" , false )
```
Because it returns the boosting object you can chain the calls like so:
```js
boosting.addData( "cupcake" , false ).addData( "bacon" , true )
```
You can do that with the addClassifier also, or mix it up and do one then the other.


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
Why would you enforce an alphaThreshold?  Well, maybe you don't want useless classifiers to be included in the optimization.  Of course that means you'll have to find out what alphaThreshold means.  Or not and try *0.1*.

Optimize moves some, none, or all of the classifiers out of its unused classifiers bin and into the *Good Classifier* bin.  If you run *.optimize* again, Boosting will check the unused classifiers (and any recently added classifiers) and see if they should be moved over to the other bin.

### boosting.classify( data )
> Returns boolean

Test some data.  This is where it all comes together.  You've configured your boosting function, added your data and classifiers, and optimized it.  Now you have some data that you want classified.  Do it like so:
```js
var result = boosting.classify( data )
```


# Configuration

### Config object
Here is the full configuration object and the constructor.
```js
var config = {
	known 		: [],  // a list of known objects
	classifiers : [],  // a list of classifier objects
}
var BoostingConstructor = require('boosting')
var boosting = BoostingConstructor( config )
```
Quick links to more information about the [known](#known-list) , and [classifiers](#classifier-list).

You really don't need to use the config.  Instead you can use the add functions.  All configuration options are optional.

### boosting.config()
> Returns config

Want to retrieve or inspect the configurate?  No problem, do it like so:
```js
var theConfig = boosting.config()
```

This is the specification of the configuration arrays you pass to boosting

### Known List
```js
known = [
	{ data : data1 , value : true },
	{ data : data2 , value : false },
	{ data : data3 , value : true },
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

If you have installed this as a npm dependency first change directory to *node_modules/boosting/*.

### Template
This is a simple boilerplate ready for you to add your code.  Run it like so:
```
node example/template.js
```

### Minimal
An absolute minimalist example of some classification.  Run it like so:
```
node example/minimalist.js
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


[issues-url]: https://github.com/panchishin/boosting/issues
[issues-image]: https://img.shields.io/github/issues/panchishin/boosting.svg

[gitter-url]: https://gitter.im/panchishin/boosting
[gitter-image]: https://badges.gitter.im/panchishin/boosting.png

[downloads-image]: http://img.shields.io/npm/dm/boosting.svg
[downloads-url]: https://www.npmjs.com/~panchishin

[travis-url]: https://travis-ci.org/panchishin/boosting
[travis-image]: http://img.shields.io/travis/panchishin/boosting.svg

[license-image]: https://img.shields.io/badge/license-Unlicense-green.svg
[license-url]: https://tldrlegal.com/license/unlicense

