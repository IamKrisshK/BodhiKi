const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const register = async (req, res, next) => {
  try {
    const { name, username, phone, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number and special character"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      phone,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) =>{
  try{
    const {username , password} = req.body;
    const user = await User.findOne({username});
    if (!user){
      return ref.status(400).json({message: "User does not exist!"});
    }
    const pMatch = bcrypt.compare(password,user.password);
    if (!pMatch){
      return ref.status(400).json({message: "Incorrect password!"});
    }
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
    res.status(200).json({token,message: "Login Success!!","currentUser":user});
    
  }
  catch (error){next(error);}
};
module.exports = {register,login};