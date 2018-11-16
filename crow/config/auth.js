// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '182924785910131', // your App ID
        'clientSecret'  : '46eb659408a5aa7b07799c11d98cdcbd', // your App Secret
        'callbackURL'   : 'https://localhost:3000/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'googleAuth' : {
        'clientID'      : '287345927343-2n90fc2335b4kk2fccekq16f7lvbckf5.apps.googleusercontent.com',
        'clientSecret'  : 'a0ea6F2uddM2KMXD2sRd5wQO',
        'callbackURL'   : 'https://localhost:3000/auth/google/callback'
    }


};
