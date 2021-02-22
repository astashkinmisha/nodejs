const fs = require('fs');
const path = require('path');

const timeDir18 = path.join(__dirname, '1800');
const timeDir20 = path.join(__dirname, '2000');


fs.readdir(timeDir18, (err, files) => {
    if(err){
        console.log(err)
        return;
    }
  // console.log(files);
    files.forEach(userName=> {
        fs.readFile(path.join(timeDir18 , userName), (err1, data) => {
            if(err1) {
                console.log(err1);
                return;
            }
                const person = JSON.parse(data.toString());
                if(person.gender === 'male'){
                    fs.rename(path.join(timeDir18 , userName), path.join(timeDir20, userName), err2 => {
                        if(err2){
                            console.log(err2)
                        }
                    })
                }
            })

        })
    })
fs.readdir(timeDir20, (err, files) =>  {
    if(err){
        console.log(err);
        return;
    }
    //console.log(files)
files.forEach(userName => {
    fs.readFile(path.join(timeDir20, userName), (err1, data) =>  {
        if (err1) {
            console.log(err1);
            return;}
        const person = JSON.parse(data.toString());
        if (person.gender === 'female') {
            fs.rename(path.join(timeDir20, userName), path.join(timeDir18, userName), err2 => {
                if (err2) {
                    console.log(err2);
                    }
                })
            }
        })
    })
})


