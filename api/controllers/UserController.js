/**
 * UserController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var Puid = require('puid');

module.exports = {
  /*
  index: function(req, res){
    console.log(req.user);
    User.findOne(req.user.id).populate('files').exec(function( err, fileuser){

      console.log(err);
      console.log(fileuser);
      res.view({
        user : fileuser
      });

    });

  },
  */
  index: function(req, res){

      res.view({
        user : req.user
      });

  },

  update: function(req, res){

  },

  admin: function(req, res){

    User.find( function foundFiles(err, users) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        users: users
      });
    });
  },

  create: function(req, res){
    var params = req.params.all();
    User.create(params, function(err, user){
      if (err){ res.send(500, err); }else{
        if(sails.config.user.requireUserActivation){
          var emailTemplate = res.render('email/email.ejs', {user: user}, function(err, list){

            nodemailer.send({
              name:       user.firstName + ' ' + user.lastName,
              from:       sails.config.nodemailer.from,
              to:         user.email,
              subject:       'New Account Acivation Required',
              messageHtml: list
            }, function(err, response){
              sails.log.debug('nodemailer sent', err, response);
            });
            res.json({success:true});
          });
        }else{
          res.json({success:true});
        }
      }
    });
  },

/**
 * Activates a given user based on the
 * ID and activationToken provided
 */
  activate: function(req, res){
    var params = req.params.all();

    sails.log.debug('activation action');

    //Activate the user that was requested.
    User.update({
      id: params.id,
      activationToken: params.token
    },{
      activated: true
    }, function(err, user) {
      // Error handling
      if (err) {
        sails.log.debug(err);
        res.send(500, err);
      // Updated users successfully!
      } else {
        sails.log.debug("User activated:", user);
        res.redirect('/');
      }
    });

  },
  resetpass: function(req, res){
    puid = new Puid(true);

    var email = req.param('email'),
        newPass = puid.generate();

    User.findOneByEmail(email, function( err, user ){
      console.log(user);
      console.log(newPass);
      crypto.generate({saltComplexity: 10}, newPass, function(err, hash){
        if(err){
          return cb(err);
        }else{
          var emailTemplate = res.render('email/reset.ejs', function(err){

          nodemailer.send({
            name:       user.firstName + ' ' + user.lastName,
            from:       sails.config.nodemailer.from,
            to:         email,
            subject:    'Peices pass Reset',
            messageHtml: 'Your new password for peices.co ' + newPass
          }, function(err, response){
            sails.log.debug('nodemailer sent', err, response);
          });
          res.redirect('/login');

        });
        console.log(user.firstName + user.lastName);
        console.log(user.email);
        console.log('original user pass '+ user.password);
          newPass = hash;
        console.log('hashed pass: '+ newPass);
        // console.log(hash);
          User.update(
            {password: user.password}, {password: newPass}
          ).exec(function updateCB(err,updated){
            console.log('Updated user to have pass ' + newPass);
          });
          }
        });
      });
    }


};
