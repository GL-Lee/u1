
/*
 * GET video page.
 */
exports.build = function(req, res){
	var data = require('../public/javascript/data');
	res.render("video",data.getData('video'));
};