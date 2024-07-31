import mongoose from "mongoose"


//define user schema
const userSchema = new mongoose.Schema({

        studentNo:{
                type:String,
                required:true
        },
        name:{
                type:String,
                required : true
        },
        email:{
                type:String,
                required : true
        },
        currentGpa:{
                type:String,
                required : true
        },
        tranningPeriode:{
                type:String,
                required:true
        },
        companyName:{
                type:String,
                required:true
        }
})

export default mongoose.model("Users", userSchema)