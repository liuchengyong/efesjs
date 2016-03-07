"use strict";
(function() {

  let stream = process.stdout;
  let loadding = ['|', '/', '-', '\\'];
  let _i = 0;
  if (stream && stream.cursorTo) {
    stream.cursorTo(0);
    stream.write(loadding[_i]);
    stream.cursorTo(0);
    _i++;
    _i = _i % loadding.length;
  }
  global.timer = setInterval(function() {
    if (stream && stream.cursorTo) {
      stream.cursorTo(0);
      stream.write(loadding[_i]);
      stream.cursorTo(0);
      _i++;
      _i = _i % loadding.length;
    }
  }, 50);
  
  const fsp = require('../../utils/fs.js');
  const path = require('../../utils/path.js');
  
  const lServer = require('./utils/lServer.js');


  module.exports = function(options) {

    console.log('正在启动efes本地代理服务...');

    options.port = options.port || 7070;

    let dirname = process.cwd();

    let projects = fsp.readJSONSync(path.join(dirname,'efesproject.json'));

    if (!projects) {
      console.log(chalk.red("没有在当前目录找到efes项目配置文件：efesproject.json，请先按照下列步骤生成此文件（或者使用efes project 生成）"));
    } else {
      // todo efes project 生成 efesproject.json
    }
    
    lServer(options, projects);

  };

})();