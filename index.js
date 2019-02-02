let MediaSplit = require('mp3-split');
/* let split = new MediaSplit({ input: 'test.mp3', sections: ['[01:30] My audio'] });
split.parse().then((sections) => {
  for (let section of sections) {
    console.log(section.name);      // filename
    console.log(section.start);     // section start
    console.log(section.end);       // section end
    console.log(section.trackName); // track name
  }
}); */

var fs = require('fs');
var path = require('path');
var filePath = path.resolve('E:/github/audio-split/sources');
var splits = [];
fs.readdir(filePath,function(err,files){
    if(err){
        console.warn(err)
    }else{
        //遍历读取到的文件列表
        files.forEach(function(filename){
            var fileInfo = path.parse(filename);
            splits.push((new MediaSplit({ input: path.join(filePath, filename), sections: ['[01:30] ' + fileInfo.name], output: 'converted' })).parse());
        });
        Promise.all(splits).then(() => {
            console.log('全部mp3裁剪完毕');
        })
    }
});