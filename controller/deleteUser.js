const User = require("../schema/schema");

const deleteUser =  async (req,res)=>{
    const {id}  = req.params
    try{
        const user  = await User.findByIdAndDelete(id);
        return res.status(200).json({message:"user has been  deleted"})
    }
    catch(err){
        res.json({ message: err })
    }
}

module.exports = deleteUser