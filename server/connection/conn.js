const mongoose = require("mongoose");
const conn = async()=> {
    try{
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("connected");
    }catch(error){
        console.log('Not Connected');
    }
    
};
conn();