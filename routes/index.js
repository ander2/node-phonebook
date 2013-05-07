
/*
 * GET home page.
 */
var redis = require('redis');
var client = redis.createClient();

exports.index = function(req, res){
    var call = client.hkeys('phonebook', function(err, reply){
        console.log(reply);
        res.render('index', {entries: reply});
    });  
};

exports.entry = function(req, res){
    var call = client.hget('phonebook', req.params.name, function(err, reply){
        res.json(reply);
    });
}

exports.add_entry = function(req, res){
    var call = client.hset('phonebook', req.body.name, req.body.phone, function(err, reply){
        res.json({status:'ok'});
    })
}