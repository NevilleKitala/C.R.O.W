// app/models/user.js
var mongoose = require('mongoose');

// define the schema for our user model
var catalougeSchema = mongoose.Schema({

    catalouge : {
        name      : String,
        brand     : String,
        gender    : String,
        colour    : String,
        size      : String,
        productType: String,
        exclusive : boolean,
        image     : String,
        },
    }

});

// methods ======================
// generating a hash

// create the model for users and expose it to our app
module.exports = mongoose.model('Catalouge', catalougeSchema);
