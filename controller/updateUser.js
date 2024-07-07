const User = require("../schema/schema");

const updatedUser =  async (req,res)=>{
    try{
        let updated = {...req.body}
        const {id} = req.params;
        const user  = await User.findOneAndUpdate({_id:id},updated,{new:true});
        return res.status(200).json({message:"user updated succesffully"})
    }
    catch(err){
        res.json({error:err})
    }
}

module.exports = updatedUser