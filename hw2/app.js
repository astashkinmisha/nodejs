//Вам потрібно реалізувати мінімум 5 строрінок.
//1) Реєстрація
//2) Логінація.
//3) Список всіх юзерів.
//4) Інформація про одного юзера
//5) Помилка

//Створити файл з юзерами, який буде виступати в ролі бази данних.

//При реєстрації юзер вводть мейл, нік та пороль і ви його данні дописуєте в файл. Але тільки якщо його немає ще. Якшо він є, то видаєте помилку. Після реєстрації переходите на сторінку зі всіма юзерми.

// логінації юзер так само ввоить мейл та пароль і вам необхідно знайти його мейлик в списку юзерів та якщо такий мейлик з таким паролем є, то віддати інформацію про юзера. В інакшому випадку сказати, що необхідно реєструватись.

//І відображення всіх юзерів це відповідно просто виведення списку вісх юзерів.

//При реєстрації мейли не можуть повторюватись


const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const app = express();
const filePath = path.join(__dirname, 'users', 'users.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));

app.set('views', path.join(__dirname, 'views'));


//===============================================================================================
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/registration', (req, res) => {
    res.render('registration');
});
app.get('/error', (req, res) => {
    res.render('error');
});
app.get('/users', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        const users = JSON.parse(data.toString());
        console.log(users);
        res.render('users', {users});
    })
});

app.get('/user', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const user = JSON.parse(data.toString());
        res.render('user', {user})
    })
})


app.get('/user/:id', (req, res) => {
    const {id} = req.body;
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const users = JSON.parse(data.toString());
        res.render('user', {user: users[id]});
    })
})
app.post('/login', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        //onst  = req.body;

        const usersData = JSON.parse(data.toString());
        if(usersData.some(user => user.email === req.body.email) && usersData.some(user => user.password === req.body.password)){
            let userIndex = usersData.findIndex(user => user.email === req.body.email);
            res.redirect(`user/${userIndex}`);
        }

        //console.log(usersData);
    })
})
app.post()
app.listen(5000, () => {
    console.log('App listen 5000');
})
