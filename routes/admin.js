//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
//titik 2 kali untuk keluar dari folder
const model = require('../models/index');
const admin = model.admin

//endpoint menampilkan semua data admin. method : GET, function : findALL()
app.get("/", (req,res)=>{
    admin.findAll()
        .then(admin=>{
            res.json(admin)
        })   
        .catch(error => {
            res.json({
                message : error.message
            })
        })
})

//endpoint untuk menyimpan data admin, METHOD:POST, fuction:CREATE
app.post("/",(req,res) => {
    let data = {
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
    }
    
    //tidak ada data
    admin.create(data)
         .then(result => { 
             res.json({
                 message: "data has been inserted"
             })
         })
         .catch (error =>{
             message: error.message
         })
})

// Cendpoint untuk menugdate data admin method : PUT, function : UPDATE
// CPARAM : memberi value ID di WHERE (Id)
// UPDATE = MODEL 
// SET = BODY (field+value)
app.put("/:id", (req,res)=> {
    let param ={
        admin_id : req.params.id
        }
    let data = {
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
        }
        admin.update(data, {where:param})
             .then(result => {
                 res.json({
                     message: "data has been updated"
                 })
             })
             .catch(error => {
                 res.json({
                     message: error.message
                 })
             })
})

//endpoint menghapus data admin method: DELETE, function : DESTROY
app.delete("/:id", (req,res)=> {
    let param = {
        admin_id : req.params.id
    }
    admin.destroy({where : param})
        .then(result =>{
            res.json({
                message: "data has been deleted"
            })
        })
        .catch (error =>{
            res.json({
                message: error.message
            })
        })
})

module.exports = app