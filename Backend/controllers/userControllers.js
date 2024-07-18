const asyncHandler = require('express-async-handler')
let User= require("../Models/userModel")
let generateToken= require("../config/generateToken.js")

let registerUser = asyncHandler(async(req,res)=>{
     let{name,email,password,pic}=req.body
     console.log(req.body)
     if(!name||!email||!password){
        res.status(400);
        throw new Error("please enter all details");
     }
     let existingUser = await User.findOne({email:email})
     if(existingUser){
        res.status(400);
        throw new Error("user already exist");
     }

     const user = await User.create({
        name,
        email,
        password,
        pic,
      });
    
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: generateToken(user._id),
        });
       
      } else {
        res.status(400);
        throw new Error("User not found");
      }
})

let authUser = asyncHandler(async(req,res) =>{
        let {password,email}=req.body;
        let user = await User.findOne({email})
        if(user && (await user.matchPassword(password))){
            res.status(201).json(
                {_id:user._id,
                 name:user.name,
                 password:user.password,
                 pic:user.pic,
                 token:generateToken(user._id)
                 
                }
        
            )
           
        }else{
            res.status(400);
            throw new Error("user not found");
        }
})

//search for all users
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });

module.exports={registerUser,authUser,allUsers}