var passport = require("passport");


module.exports = function (app, db) {


	app.get("/secured-service", passport.authenticate('jwt', { session: false }), function(req, res){
	  res.json("secured info");
	});


    app.get('/test', function(req, res) {
        res.json(200, {'test': 'it works!'})
    })


	app.get('/prof/:profId', function(req, res) {

		db.collection('profs').find( {"profId": parseInt(req.params.profId)} ).toArray(function(err, docs) {

	    if (err) {
	    	console.log(err)
			return res.sendStatus(500)
	    }


	    res.json(200, docs)

      });

    });


	app.post('/prof/:profId', (req, res) => {
	  db.collection('profs').insert(req.body, (err, result) => {
	    if (err) {
	    	console.log(err)
			return res.sendStatus(500)
	    }

	    console.log('saved to database')
	    res.sendStatus(200)
	  })
	})    
}