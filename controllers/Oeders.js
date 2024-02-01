const orderModel = require("../models/Orders");
const CreateOrder = (req, res) => {

    const {idWallet, typeWallet, paypalEmail, amount, image, author} = req.body;

    const newOrder = new orderModel({
        idWallet, typeWallet, paypalEmail, amount, image, author
    })

    newOrder.save().then((result)=>{
        res.status(201).json({
            success : true,
            message : "Order Create Successfully",
            data : result
        });
    }).catch((err)=>{
        res.status(500).json({
            success : false,
            message: `Server Error`,
            err : err
        });
    });
}

const deleteOrder = (req, res)=>{
    const idOrder = req.params.id;

    orderModel.findByIdAndDelete({_id : idOrder}).then((result)=>{
        res.status(201).json({
            success : true, 
            message : "Delete Post Successfully",
        });
    }).catch((err) =>{
        res.status(500).json({
            success : false,
            message : `Server Error`,
            err : err
        });
    });
}

const getOrderByAuthor = (req,res) =>{
    const author = req.params.userId;

    orderModel.find({author}).then((result)=>{
        res.status(201).json({
            success : true,
            message : "All Post By Author",
            data : result
        })
    }).catch((err)=>{
        res.status(500).json({
            success : false,
            message : "Server Error",
            erorr : err
        })
    })
}

const getAllOrder = (req,res)=>{
    orderModel.find({}).populate("User").then((result)=>{
        res.status(201).json({
            success : true,
            message : "All Post",
            data : result
        })
    }).catch((err)=>{
        res.status(500).json({
            success : false,
            message : "Server Error",
            err
        })
    })
}


module.exports = {
    CreateOrder,
    deleteOrder,
    getOrderByAuthor,
    getAllOrder
}