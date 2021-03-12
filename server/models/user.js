const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    cars: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
      }
    ]
});

// mongoose middleware: hash the password before saving to db
userSchema.pre("save", async function(next){
    try{
        if(!this.isModified('password')){
            return next(); // if the password has not been updated, directly proceed on to saving the user
        }
        let hashedPassword = await bcrypt.hashSync(this.password, 10);
        this.password = hashedPassword; // make sure to only save the hashed password in the db!!!
        return next();
    } catch(err){
        return next(err);
    }
});

// enable/expose password comparison functionality on a user document model
userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        let isMatch = await bcrypt.compareSync(candidatePassword, this.password);
        return isMatch;
    } catch(err){
        return next(err);
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;