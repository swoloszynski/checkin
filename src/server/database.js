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
  },

  get: function(collectionName, cb) {
    mongo.Db.connect(mongoUri, function (err, db) {
      if (!err) {
        console.log("Connected to database: '" + databaseName + "' to get things");
        db.collection(collectionName, function(er, collection) {
          collection.find().toArray(function(err, items) {
            if (!err) {
              cb(items);
            }
            else {
              console.log("Error retrieving collection: " + collectionName);
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
