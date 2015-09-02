var boosting = require('../boosting')()

console.log("Create two classifiers")
boosting.addClassifier( function(x) { return x < 5 } , "less than 5")
boosting.addClassifier( function(x) { return x % 2 } , "odd")

console.log("Adding some data")
boosting.addData( 0 , true )
boosting.addData( 2 , true )

console.log("Boosting...")
boosting.optimize(0)

console.log( "classify(1) Should return true : " + boosting.classify( 1 ) )
console.log( "classify(6) Should return false : " + boosting.classify( 6 ) )

var config = boosting.config()
console.log( "Boosing should use the classifier named 'less than 5' : " + (config.goodClassifiers[0].name == "less than 5") )
console.log( "Boosting should only use the classifier named 'less than 5' : " + (config.goodClassifiers.length == 1) )
