//you can include all your controllers
const Sale = require('../app/controllers/sale');
module.exports = function(app) {
    app.get('/', function(req, res, nex) {
        res.json("Welcome to Segwitz API...!");
    });
    
    app.use('/api/sale', Sale);
    //catch 404 and forward to error handler
    app.use(function(req, res, next) {
        res.status(404).render('404', { title: "Sorry, page not found", session: req.sessionbo });
    });

    app.use(function(req, res, next) {
        res.status(404).send( "404 page not found" );
    });
}