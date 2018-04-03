// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});


    // SHOW ADD USER FORM
    app.get('/dashboard', isLoggedIn,function(req, res, next){
        // render to views/user/add.ejs
        res.render('Dashboard/index', {
            title: 'Add New User',
            name: '',
            age: '',
            email: ''
        })
    })

    app.post('/category/store',function(req, res, next){
    // var name = req.body.data.name;
            req.getConnection(function(error, conn) {
                conn.query('INSERT INTO category SET ?', req.body.data, function(err, result) {
                    //if(err) throw err
                    if (err) {
                        res.json({ responseCode: 0,messages:err});
                    } else {
                        res.json({ responseCode: 1,messages:'Data added successfully!'});
                    }
                })
            })
    })
    // SHOW ADD USER FORM
    app.get('/category',function(req, res, next){
        // render to views/user/add.ejs
        res.render('Category/add', {
            title: 'Add New User',
            name: '',
            age: '',
            email: ''
        })
    })

    app.get('/category/list',function(req, res, next){
        req.getConnection(function(error, conn) {
            conn.query('SELECT * from category', function(err, result) {
                //if(err) throw err
                if (err) {
                    res.json({ responseCode: 0,messages:err});
                } else {
                    res.json({ responseCode: 1,data:result});
                }
            })
        })
    })

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
