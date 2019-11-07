module.exports = (app, router) => {

    const mongoose = app.get("mongoose")
          Movie = mongoose.model('Movie'),
          bodyParser = require('body-parser'), //parses information from POST
          methodOverride = require('method-override') //used to manipulate POST

    router.use(bodyParser.urlencoded({ extended: true }))
    router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
    }))

    router.route('/movies/')
        .get(function (req, res, next) {
            const skip = parseInt(req.query.skip);
            let options = {};
            if (req.query.term) {
                options = {
                    title: new RegExp(`.*${req.query.term}.*`)
                }
            }
            Movie.find(options, {_id: 1, title:1, poster: 1}).skip(skip).limit(20).sort({year: -1}).then(function (movies, err) {
                if (err) {
                    return res.status(400).send("Parameter error", err);
                }
                    res.status(200);
                    res.json(movies);
                    return res;
            });


        });

    router.route('/movie/:id')
        .get(function (req, res, next) {
            const movie_id = req.params.id;
            Movie.findById(movie_id).then(function (movie, err) {
                if (err) {
                    return res.status(400).send("Parameter error", err);
                }
                res.status(200);
                console.log(movie)
                res.json(movie);
            });


        });

    return router;


};