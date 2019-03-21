ar spawn = require('child_process').spawn
  , sendcom   = spawn('sendcom', ['-e A']);

sendcom.stdout.on('data', function(data) {
  console.log('stdout: ' + data);
})

sendcom.stderr.on('data', function(data) {
  console.log('stderr: ' + data);
})

sendcom.on('exit', function(code) {
  console.log('exit code: ' + code);
})

// 出力は例えば以下のようになります。
// stdout: /Users/sakaida/codes/javascript/design-pattern-1
// 
// exit code: 0

