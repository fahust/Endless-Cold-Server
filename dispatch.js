const testFolder = './cities/';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    fs.readFile(testFolder+file, (err, data) => {
        if (err) throw err;
        country = JSON.parse(data);
        country.forEach(city => {delete city.name})
        fs.writeFile(testFolder+file, JSON.stringify(country), (err) => {
            if (err) throw err;
        });
    });
    //console.log(file);
  });
});