const userModel = require("../models/user");
const otpModel = require("../models/otp");
const { userSignUpMsg, signUpOtp} = require("../utils/emails/auth.js");

const StatusCodes = require("../utils/StatusCode");
const { generateToken, generateOTP } = require("../utils/generateToken");
const bcrypt = require("bcrypt");

const getOTP = async (req, res, next) => {
    const { email } = req.body;

    const OTP = await generateOTP();
    console.log(OTP);

    //const user = await UserRepo.saveUser(data);

    await otpModel.create({
        email: email,
        code: OTP,
        type: "Signup",
        created_at: new Date(),
        otpExpiresAt: Date.now() +  5 * 60 * 1000, //5 mins 
    });

    /*
        send mail
    */

    await signUpOtp(email, OTP);

    return res.status(StatusCodes.CREATED).json({
        status: true,
        msg: "check email for otp sent",
    });
};

const resendOTP = async (req, res) => {
    const { email } = req.body;

    const otpExist = await otpModel.findOne({email});

    if(!otpExist){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Internal Server Error",
        });
    }

    await otpModel.deleteMany({email:otpExist?.email});

    const OTP = await generateOTP();

    await otpModel.create({
        email: email,
        code: OTP,
        type: "Signup",
        created_at: new Date(),
        otpExpiresAt: Date.now() + 5 * 60 * 1000, //5mins
    });

    /*
        send mail
    */

        await signUpOtp(email, OTP);
        return res.status(StatusCodes.OK).json({
            status: true,
            msg: "OTP resent to your email",
        });
}

const validateOTP = async (req, res) => {
    const { code, email } = req.body;

    const otp = await otpModel.findOne({code});

    if(!otp){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid or Expired OTP",
        });
    }

    if(otp.email != email){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Credentials",
        });
    }
   
    // delete otp from database
    await otpModel.deleteOne({code});

    return res.status(StatusCodes.OK).json({
        status: true,
        msg: "Otp successfully validated",
    });
}

const signUp = async (req,res, next) => {
    const {email, password } = req.body;

    const userExist = await userModel.findOne({ email: email});

    if(userExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "User already exists"
        });
    }

    const salt = await bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const saveUser = await userModel.create({
        email: email,
        password: hashedPassword,
    });

    await userSignUpMsg(email);

    return res.status(StatusCodes.CREATED).json({
        status: true,
        msg: "Account created successfully",
        data: saveUser,
    });
};

const signIn = async(req, res, next) => {
    const {email, password, name} = req.body;

    console.log(name, email, password);

    const userExist = await userModel.findOne({ email: email});

    if(!userExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "User account not found please signup",
        });
    }

    const passwordMatches = await bcrypt.compare(password);

    if(!passwordMatches){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Incorrect password",
        });
    }

    const token = await generateToken(userExist);

    return res.status(StatusCodes.CREATED).json({
        status: true,
        msg: "Welcome to Home Depot",
        data: {
            user: userExist,
            token,
        }
    });

}

module.exports = {getOTP, resendOTP, validateOTP, signUp, signIn}
 