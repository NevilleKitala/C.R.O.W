// app/models/user.js
var mongoose = require('mongoose');

// define the schema for our user model
var companySchema = mongoose.Schema({

    company : {
        name      : String,
        brand     : String,
        },
    }

});

// methods ======================
// generating a hash

// create the model for users and expose it to our app
module.exports = mongoose.model('Catalouge', catalougeSchema);
