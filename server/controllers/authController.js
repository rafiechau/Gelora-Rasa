const CryptoJS = require("crypto-js");
const { User } = require("../models");
const { validateJoi, schemaUser } = require("../helper/joiHelper");
const { handleServerError, handleResponse, handleSuccess } = require("../helper/handleResponseHelper");
const { hashPassword } = require("../utils/bycrpt");
const { handleSendMailVerifyOTP } = require("../helper/sendMailHelper");
const { createTokenVerifyEmail } = require("../utils/jwt");
exports.register = async(req, res) => {
    try{
        const newUser = req.body;

        
        const decryptedPassword = CryptoJS.AES.decrypt(
            newUser.password,
            process.env.CRYPTOJS_SECRET
          ).toString(CryptoJS.enc.Utf8);

        const decrypteConfirmPassword = CryptoJS.AES.decrypt(
            newUser.confirmPassword,
            process.env.CRYPTOJS_SECRET
          ).toString(CryptoJS.enc.Utf8);

          console.log(decrypteConfirmPassword)
          console.log(decryptedPassword)

        if (decryptedPassword !== decrypteConfirmPassword) {
            return res.status(400).json({
              message: "Password and Confirm Password do not match"
        });
        }

        

        newUser.password = await hashPassword(decryptedPassword)
        delete newUser.confirmPassword
        newUser.role = 1;

        const { error, handleRes } = validateJoi(res, newUser, schemaUser);
        if(error){
            return handleRes
        }

        const existingUser = await User.findOne({ where: { email: newUser.email}})
        if(existingUser){
            return res.status(400).json({
                message: "User with that email already exists"
            });
        }

        const createdUser = await User.create(newUser)

        return res.status(201).json({
            data: createdUser,
            message: "Registration successful for ${createdUser.fullName}"
        })
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.verifyEmail = async (req, res) => {
    try{
        const { email } = req.body
        const dataUser = await User.findOne({ where: { email: email }})

        if(dataUser){
            return handleResponse(res, 400, {
                message: "User with that email already existed"
            })
        }

        const OTP = Math.floor(Math.random() * 9000 + 1000)
        const status = handleSendMailVerifyOTP(OTP, email)
        if(status){
            return handleSuccess(res, {
                data: {
                    token: createTokenVerifyEmail(OTP, email),
                    expire: Date.now() + 2 * 60 * 1000,
                },
                message: "OTP sent to email",
            })
        }
        return handleSuccess(res, {
            message: "Email for OTP verify failed to sent",
        });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.checkOtpVerifyEmail = async (req, res) => {
    try {
      const { otp } = req.body;
      const { otpJWT, email } = req;
      const dataUser = await User.findOne({ where: { email: email } });
      if (dataUser) {
        return handleResponse(res, 400, {
          message: "user with that email already existed",
        });
      }
      if (otp != otpJWT) {
        return handleResponse(res, 404, { message: "OTP Invalid" });
      }
      return handleSuccess(res, { message: "success verify" });
    } catch (error) {
        console.log(error)
      return handleServerError(res);
    }
};