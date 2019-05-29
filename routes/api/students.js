var express = require('express');
var request = require('request');
const DOMParser = require('xmldom').DOMParser;
var router = express.Router();

/* GET students listing. */
router.get('/', function(req, res, next) {
	var param = req.query.code;
	var url = "http://52.221.10.51/Express.asmx/GetPostMailListAll?code="+param;
	var result = [];
    request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var text = response.body;
	  	let parser = new DOMParser();
	    let xmlDoc = parser.parseFromString(text, "text/xml");
	    Array.from(xmlDoc.getElementsByTagName("Table")).forEach(function (item) {
	    	var createDate = item.childNodes[1].childNodes[0].data;
	    	var remark = item.childNodes[3].childNodes[0].data;
	    	var listCode = item.childNodes[5].childNodes[0].data;
	    	var createdBy = item.childNodes[7].childNodes[0].data;
	    	var resultItem = {
	    		"CreatedDate": createDate,
	    		"Remark": remark,
	    		"ListCode": listCode,
	    		"CreatedBy": createdBy
	    	}
	        result.push(resultItem);
	    });
	  	res.json(result);
	  }
	});
});

module.exports = router;
