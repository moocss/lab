var fs = require('fs'), 
    page = require('webpage').create(),
    system = require('system'),
    address;

function isJs(url) {
   return /\.js$/.test(url);
}

function isCss(url) {
   return /\.css$/.test(url);
}

function isImg(url) {
   return /\.png|\.jpg|\.gif$/.test(url);
}

try{

if (system.args.length === 1 && /^http:\/\/|https:\/\/|\/\//.test(system.args[1]) ) {
    console.log('Usage: netlog.js <some URL>');
    phantom.exit(1);
} else {
    var requestedContent = '';
    address = system.args[1];
    page.onResourceRequested = function (req) {
        // console.log(JSON.parse(JSON.stringify(req, undefined, 4)).url);
        requestedContent = requestedContent + JSON.parse(JSON.stringify(req, undefined, 4)).url+'\n';
        // console.log('requested: ' + JSON.stringify(req, undefined, 4));
    };

    page.onResourceReceived = function (res) {
        // console.log(JSON.parse(JSON.stringify(res, undefined, 4)).url);
        // console.log('received: ' + JSON.stringify(res, undefined, 4));
    };

    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        }
        if(requestedContent){
            var output = {js: true,css: true,img: true,others: true  }
            var data = requestedContent;
            var dataArr = data.split('\n');

            var obj = {};
            obj[dataArr[0]] = {
               "js": '',
               "css": '',
               "img": [],
               "others": [],
               "summary": {
                   "total": 0,"js": 0,"css": 0,"img": 0,"others": 0
               }
            };

            for (var i = 0; i < dataArr.length; i++) {
               // if (/\?\?/.test(dataArr[i])) {
               //     var comboUrl = dataArr[i].split('??');
               //     var fileList = comboUrl[1].split(',');

               //     for (var j = 0; j < fileList.length; j++) {
               //         // console.log(comboUrl[0] + fileList[j])
               //         pushData(comboUrl[0] + fileList[j]);
               //     }

               // } else {
                   pushData(dataArr[i]);
               // }
            }

            function pushData(url) {
               var result = obj[dataArr[0]];
               var summary = result.summary;
               if (isJs(url) && output.js) {
                     // result.js.push(url);
                     //.replace('http://misc.360buyimg.com/','')
                    result.js = result.js + url + '$';
                    summary.js++;
               } else if (isCss(url) && output.css) {
                    //result.css.push(url);
                    //.replace('http://misc.360buyimg.com/','')
                    result.css = result.css + url + '$';
                    summary.css++;
               } else if (isImg(url) && output.img) {
                   // result.img.push(url);
                   summary.img++;
               } else if (output.others && !(isJs(url) || isCss(url) || isImg(url))) {
                   // result.others.push(url);
                   summary.others++;
               }
               summary.total = (summary.js + summary.css + summary.img + summary.others);
            }

            console.log(address);
            // fs.write('result.json', fs.read('result.json') + JSON.stringify(obj) +',' );
            fs.write('result.json', fs.read('result.json') + JSON.stringify(obj) +',\n');
        }

        phantom.exit();
    });
}

}catch(e){}
