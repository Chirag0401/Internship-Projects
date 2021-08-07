const express = require('express')
const router = express.Router();
const conn = require('../config/db');
var userModel = require('../models/user');

router.get('/',async(req,res,next)=>{
    let options = {
        serverSuccess:req.flash('server-success')
    }

    try {
        options.userList = await userModel.list(conn);
    } catch (error) {
        options.serverError = error.message
    }
    res.render("index",options);
})

router.get('/edit/:user_id',async(req,res,next)=>{
    let user_id = req.params.user_id;
    let options = {}
    try {
        let userResp = await userModel.list(conn,user_id)
        options.user = userResp[0];
    } catch (error) {
        options.serverError = error.message
    }
    res.render("edit",options);
});

router.get('/create',(req,res,next)=>{
    res.render("create",{
        serverError:req.flash('server-error')
    });
})

router.post('/create',async(req,res,next)=>{ 
/*    let data ={
     first_name = req.body.firstname,
        last_name = req.body.lastname,
        mobile = req.body.mobile,
        email = req.body.email

    };*/

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const mobile = req.body.mobile;
    const email = req.body.email;

    try {
        let resp = await userModel.insert(conn,first_name,last_name,mobile,email);
        req.flash('server-success',"User added successfully")
        return res.redirect('/')
    } catch (error) {
        req.flash('server-error',error.message)

        return res.redirect('/create')
    }
})

router.post("/edit/:user_id", async function(req, res, next) {
    let user_id = req.params.user_id;

    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        email: req.body.email
    };
    try {
        let resp = await userModel.update(conn, data,user_id);
        req.flash("server-success", "User Update successfully");
        return res.redirect("/");
    } catch (error) {
        
        req.flash("server-error", "error while creating user");
        return res.redirect("/edit/" + user_id);
    }
}); 

router.get("/delete/:user_id", async function(req, res, next) { 
    let user_id = req.params.user_id;
    try {
        let resp = await userModel.delete(conn,user_id);
        req.flash("server-success", "User Deleted Successfully");
        return res.redirect("/");
    } catch (error) {
        req.flash("server-error", "Error while deleting user");
        return res.redirect("/");
    }
})

module.exports = router;