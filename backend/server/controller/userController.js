var Userdb = require('../model/userModel');

exports.login = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new tag
    const user = new Userdb({
        email : req.body.email,
        password : req.body.password,
    })

    Userdb.findOne({ email: req.body.email })
    .then(data =>{
        if(!data){
            // res.status(404).send({ message : "Not found user with id"})

        }else{
            console.log('hi');

            res.send(data)
            console.log(data.email);
            if((data.email===user.email) && (data.password===user.password)){
                        console.log('hii')
            }

        }
    })
    .catch(err =>{
        // res.status(500).send({ message: "Erro retrieving user with id " })
    })
    // save tag in the database
    user
        .save(user)
        .then(data => {
            // console.log(data)
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new tag
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        permission: req.body.permission
    })
    

    // save tag in the database
    user
        .save(user)
        .then(data => {
            console.log(data)
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}