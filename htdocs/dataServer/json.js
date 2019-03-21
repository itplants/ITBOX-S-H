// 例外処理を行った書き方 引数にcallbackが無い場合にも対処するより堅牢な書き方

var fs = require('fs');

    var dataset = [];                                   // 空配列の初期化
    // 動的ランダム dataset                                               
    var numDataPoints = 50;                             // 生成するデータ数
                                                                                   
    var xRange = Math.random() * 1000;  // 生成する x の最大値                     
    var yRange = Math.random() * 1000;  // 生成する y の最大値                     

    for (var i = 0; i < numDataPoints; i++) {                                   // numDataPoint
        var newNumber1 = i;     // 新しいランダム整数                                 DataPoint
        var newNumber2 = Math.round(Math.random() * yRange);    // 新しいランダム整数 DataPoint
        dataset.push([newNumber1, newNumber2]);                                 // 生成したoint
    }

function readJSON (path, callback) {
  if (!callback || typeof(callback) !== 'function') {
    throw new Error("callback not defined");
  }

  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      return callback(err);
    }

    try {
      callback(null, JSON.parse(data));
    } catch (e) {
      callback(e);
    }
  });
}

var path = "./data.json";

// 正常に動作する例

readJSON(path, function(err, result) {
  if (err) {
    return console.log(err);
  }

  console.log(result);

  console.log("len="+result.length);
  console.log("x1="+result[0]);

  dataset = result;
  dataset.push([result[0], result[1]]);                                 // 生成したoint
  console.log(dataset);
});

