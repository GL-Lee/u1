exports.info = {
	video:{
		sites:[
			'youku',
			'tudou'
		],
		getData:function(){
			var fs=require('fs');
			var data = {};
			for(var i = 0; i < this.sites.length; i++){
				var site = this.sites[i];
				data[site] = JSON.parse(fs.readFileSync(dataDir+'/content/' + site+'.json', 'utf8'));
			}
			return data;
		}
	}
}
exports.getData = function(cat){
	return this.info[cat].getData();
}
exports.saveData = function(){
	var http = require('http');
	var fs = require('fs');
	var $ = require('jquery');
	var iconv = require('iconv-lite');
	var rules = {};
	rules.youku = require(rulesDir+'/youku.com').youku;
	rules.tudou = require(rulesDir+'/tudou.com').tudou;
	function saveSite(site){
		var s = rules[site];
		var content = new Buffer(1021*1024*8);
		http.get(s.url, function(res) {
		 	console.log("Now site: " + s.url);
		 	var contentFile = dataDir+'/content/'+site+'.json' ;
		  	var len =1;
			res.on('data', function (chunk) {
				chunk.copy(content ,len - 1);
				len += chunk.length;
			}).on('end', function(){
				console.log(s.charset);
				var html = iconv.fromEncoding(content , s.charset);
				var data = [];
				var $html = $(html);
				var charset = $html.find("meta[charset=]").attr("charset");
				var items = $html.find(s.wrapper).find(s.item).each(function(i,it){
					var $it = $(it);
					var a = $it.find(s.a);
					var img = $it.find(s.img);
					var d = {};
					d.title = a.attr('title');
					d.href = a.attr('href');
					d.img = img.attr('src');
					data.push(d);
				});
				data = JSON.stringify(data);
				fs.writeFile(contentFile, data, function (err) {
					 if (err) throw err;
					 console.log('It\'s saved!');
				});
			})
		}).on('error', function(e) {
		  console.log("Got error: " + e.message);
		});
	}

	for(var rule in rules){
		saveSite(rule);
	}
}
