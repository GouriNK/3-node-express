const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let users = require('../../Users');

// GET ALL USERS
// See result on browser at : http://localhost:5000/api/users
router.get('/', (req, res)=>{
    res.json(users)
});


// GET INDIVIDUAL USER
// See result on browser at : http://localhost:5000/api/users/3
router.get('/:id', (req, res)=>{
    const found = users.some(user => user.id === parseInt(req.params.id));
    if(found){
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        res.sendStatus(400)
    }
});

// ADD USER
// open Postman and POST to http://localhost:5000/api/users with body JSON
router.post('/', (req, res)=>{
    const newUser = {
        id : uuid.v4(),
        name: req.body.name,
        email : req.body.email
    }

    if(!newUser.name || !newUser.email) {
        return res.sendStatus(400);
    }

    users.push(newUser);
    res.json(users);
});

// EDIT/UPDATE USER
// open Postman and PUT to http://localhost:5000/api/users/3 with body JSON
router.put('/:id', (req, res)=>{
    const found = users.some(user => user.id === parseInt(req.params.id));

    if(found){
        const updatedUser = req.body;
        users.forEach(user => {
            if(user.id ===  parseInt(req.params.id)) {
                user.name = updatedUser.name ? updatedUser.name : user.name;
                user.email = updatedUser.email ? updatedUser.email : user.email;
                res.json({msg: 'User updated', user});
            }
        });
    } else {
        res.sendStatus(400)
    }
});

//DELETE USER
// open Postman and DELETE to http://localhost:5000/api/users/1
router.delete('/:id', (req, res)=> {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if(found) {
        users = users.filter(user => user.id !==parseInt(req.params.id))
        res.json({msg: 'User deleted', users});
    } else {
        res.sendStatus(400)
    }
})

module.exports = router;