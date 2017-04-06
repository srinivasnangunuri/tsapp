/*
 * GET User.
 */

exports.get = function(req, res){

  console.log("GET request received");
  var id = req.params.id;
  req.getConnection(function(err,connection){

     connection.query('SELECT * FROM user where id=?',id,function(err,data) {

        if(err) {
           console.log("Error Selecting : %s ",err );
         }
            res.json(data);

         });

    });

};

exports.save = function(req,res){

   console.log("POST request received");
    var input = req.body;
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            //state  : input.state,
            bio    : input.bio,
            phone : input.phone,
            slack_name   : input.slackName,
            email   : input.email
        };

        connection.query("UPDATE user set ? WHERE id = ? ",[data,id], function(err, rows)
        {

          if (err) {
              console.log("Error Updating : %s ",err );
              res.json({"status":"error"});
            }

          res.json({"status":"saved"});

        });

    });
  };
