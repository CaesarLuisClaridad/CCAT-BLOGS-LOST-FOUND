const Item = require('../models/lostandfoundModel');
const {cloudinary} = require('../utils/lostandfoundUtils')

//create a item
const postItem = async (req, res) => {
    try{
        //getting the data
        const {what, itemName, description, where, facebook, phonenumber} = req.body;
        const fileStr = req.body.file;
        //checking if the response is okay
        if(!what || !itemName || !description || !where || !facebook || !phonenumber){
            return res.status(400).json({ error: "Please fill all fields!" });
        }

        //Remove non-digit characters
        if (phonenumber.length !== 11) {
            return res.status(400).json({ error: "Invalid phone number format!" });
        }

        //uploading to cloudinary
        const uploadItemResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "itemstorage",
        })

        //checking the result
        console.log("Uploaded Item Response:", uploadItemResponse);
        console.log("What:", what);
        console.log("Name:", itemName);
        console.log("Description:", description);
        console.log("Where:", where);
        console.log("Facebook:", facebook);
        console.log("Phone number:", phonenumber);
        console.log(uploadItemResponse)

        //saving to mongodb
        const item = new Item({
            what: what,
            name: itemName,
            description: description,
            where: where,
            facebook: facebook,
            phonenumber: phonenumber,
            image: uploadItemResponse.secure_url,
            user_id: req.user.id, //to get the user id
            profilePicture: req.user.body
        });

        const savedItem = await item.save();
        console.log("Item saved:", savedItem);
        res.json({mssg: "yesss"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "something went wrong"})
    }
}

//get all items that has been posted
const getAllItem = async (req, res) => {
   
    try{
        const product = await Item.find({}).sort({createdAt: -1}).populate("user_id")
        res.status(200).send(product)
    }
    catch(error){
        console.log(error)
        res.status(404).send(error)
    }
}

//get all items of the specific user post
const getAllUserPost = async (req, res) => {
    const user_id = req.user.id;
    try{
        const product = await Item.find({user_id}).sort({createdAt: -1}).populate("user_id");
        res.status(200).send(product)
    }
    catch(error){
        console.log(error)
        res.status(404).send(error)
    }
}

const deleteItem = async (req, res) => {
    const {id} = req.params;

    const item = await Item.findOneAndDelete({_id: id});

    if(!item){
        return res.status(404).json({mssg: "Error deleting"})
    }

    return res.status(200).json(item)
}

module.exports = {
    postItem,
    getAllUserPost,
    getAllItem,
    deleteItem
}