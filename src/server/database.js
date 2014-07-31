var mongo = require('mongodb');
var databaseName = "checkin";
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/' + databaseName;

var database = {

  insert: function(collectionName, item) {
    mongo.Db.connect(mongoUri, function (err, db) {
      if (!err) {
        console.log("Connected to database: '" + databaseName + "'");
        db.collection(collectionName, function(er, collection) {
          collection.insert(item, {safe: true}, function(er,rs) {
            if (!er) {
              console.log("Inserted into " + db.name + ":" + collectionName + ": " + item);
            }
          });
        });
      }
      else {
        console.log(err);
      }
    });
  }

};

module.exports = database;
