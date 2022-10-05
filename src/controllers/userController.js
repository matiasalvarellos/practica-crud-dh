const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

function findAll(){
    const jsonData = fs.readFileSync(path.join(__dirname, "../data/users.json"))
    const data = JSON.parse(jsonData);
    return data;
}

function writeFile(data){
    const stringData = JSON.stringify(data, null, 4);
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), stringData);
}

module.exports = {
    register: (req, res)=>{
        res.render("register");
    },
    processRegister: (req, res)=>{
        const error = validationResult(req)
        if(!error.isEmpty()){
            console.log(error.mapped())
            console.log(error.errors)
           return res.render("register", { errors: error.mapped(), old: req.body , milanesa: "123"})
        }
        const users = findAll();

        const newUser = {
            id: users.length + 1,
            name: req.body.name ,
            email: req.body.email ,
            password: bcryptjs.hashSync(req.body.password, 10 ) ,
        };

        users.push(newUser);

        writeFile(users);

        res.redirect("/users/login");

    }, 
    login: (req, res)=>{
        res.render("login");
    },
    processLogin: (req, res)=> {
        const error = validationResult(req);

        if(!error.isEmpty()){
          return res.render("login", { errors: error.mapped() })
        };

        const users = findAll();

        const userFound = users.find(function(user){
            return user.email == req.body.email && bcryptjs.compareSync(req.body.password, user.password)
        })

        if(!userFound){
            return res.render("login", { errorLogin: 'Credenciales invalidas!' });
        }else{
            req.session.usuarioLogueado = {
                id: userFound.id,
                name: userFound.name,
                email: userFound.email,
            };

            if(req.body.remember){
                res.cookie("recordame", userFound.id)
            }

            res.redirect("/prueba");
        }
    },
    logout: (req, res)=>{
        req.session.destroy();
        res.clearCookie("recordame");
        res.redirect("/");
    }
}