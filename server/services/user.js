const User = require("../models/user");
bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({ error : "All fields are required!" });
        }
        if(username.length < 5){
            return res.status(400).json({ error : "Username must have 5 characters" });
        }
        if(password.length < 6){
            return res.status(400).json({ error : "Password must have 6 characters" });
        }
        const checkUsers = await User.findOne({ $or: [{ email }, { username }] });
        if(checkUsers){
            return res.status(400).json({ error : "Username or Email already exists!" });
        }else{
            const hashPass = await bcrypt.hash(password, 10);
            const newUser = new User({username, email, password: hashPass });
            await newUser.save();
            return res.status(200).json({ success : "Registeration successfull" });
        }
    } catch(error){
        return res.status(404).json({ error : "Internal server error!" });
    }
};

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({ error : "All fields are required!" });
        }
        const checkUser = await User.findOne({ email });
        if(checkUser){
            bcrypt.compare(password, checkUser.password, (err, data) => {
                if(data){
                    const token = jwt.sign({id: checkUser.id, email:checkUser.email}, process.env.JWT_SECRET, {expiresIn: "30d" }
                        
                    );
                    res.cookie("taskifyUserToken", token, {
                        httpOnly : true,
                        maxAge: 30*24*60*60*1000,
                        secure: false,  // Set to false for local development
                        sameSite: "Lax", // Use Lax instead of None
                        //secure: process.env.NODE_ENV === "production",
                       // sameSite: "None",
                    });
                    return res.status(200).json({success:"Login Success!"});
                }else{
                    return res.status(400).json({error: "Invalid Credentials"});
                }
            });
        }
    }catch(error){
        return res.status(404).json({ error : "Internal server error!" });
    }
};

const logout = async (req, res) => {
    try{
    res.clearCookie("taskifyUserToken",
        {
            httpOnly : true,
        }
    );
        res.json({ message : "Logout successfull" });
    }catch(error){
        return res.status(404).json({ error : "Internal server error!" });
    }
};

const userDetails = async (req, res) => {
    try{
        const { user } = req;
        const getDetails = await User.findById(user._id).populate("tasks")
        .select("-password");
        if(getDetails){
            const allTasks = getDetails.tasks;
            let pending = [];
            let completed = [];
            allTasks.map((item) => {
                if(item.status === "pending"){
                    pending.push(item);
                }else{
                    completed.push(item);
                }
            });
            return res.status(200).json({success: "success", tasks:[{pending}, {completed}]});
        }
    }catch(error){
        return res.status(404).json({ error : "Internal server error!" });
    }
};

module.exports = { register, login, logout, userDetails };