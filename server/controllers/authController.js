const CryptoJS = require("crypto-js");
const { User, DetailEventOrganizer } = require("../models");
const { validateJoi, schemaUser, schemaLogin, schemaProfile } = require("../helper/joiHelper");
const { handleServerError, handleResponse, handleSuccess, handleClientError, handleNotFound } = require("../helper/handleResponseHelper");
const { hashPassword, comparePassword } = require("../utils/bycrpt");
const { handleSendMailVerifyOTP, handleSendMailForgotPass } = require("../helper/sendMailHelper");

const { createTokenVerifyEmail, createToken, createTokenForForgetPassword } = require("../utils/jwt");

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

        if (decryptedPassword !== decrypteConfirmPassword) {
            return res.status(400).json({
              message: "Password and Confirm Password do not match"
        });
        }

        

        newUser.password = await hashPassword(decryptedPassword)
        delete newUser.confirmPassword
        // newUser.role = 1;
        newUser.role = req.body.role || 1; //ini untuk test

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
            message: `Registration successful for ${createdUser.firstName}`
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

exports.login = async (req, res) => {
    try{
        const { email, password } = req.body

        const plainPassword = CryptoJS.AES.decrypt(
            password,
            process.env.CRYPTOJS_SECRET
          ).toString(CryptoJS.enc.Utf8);

          const { error, handleRes } = validateJoi(res, { email, password: plainPassword }, schemaLogin);
          if (error) {
              return handleRes;
          }

        const dataUser = await User.findOne({
            where: { email: email }
        })


        if (!dataUser || !(await comparePassword(plainPassword, dataUser.password))) {
          return handleResponse(res, 400, { message: "invalid email or password" });
        }
        const token = createToken(dataUser);
        if (!token) {
            throw new Error("Token Created failed");
        }
        return handleSuccess(res, {
            token: token,
            message: "Login success",
        });
    }catch(error){
        console.log(error)
        return handleServerError(res);
    }
}

exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const isUserExist = await User.findOne({ where: { email: email } });
      if (!isUserExist) {
        return handleNotFound(res);
      }
      const token = createTokenForForgetPassword(email);
      const resp = await handleSendMailForgotPass(token, email);
      if (resp.accepted.length > 0) {
        return handleSuccess(res, {
          message: "Check your email for forgot password",
        });
      } else {
        return handleSuccess(res, {
          message: "Email for forgot password failed to sent",
        });
      }
    } catch (error) {
      return handleServerError(res);
    }
};
  
exports.setResetPassword = async (req, res) => {
    try {
      const { email } = req;
      const { new_password } = req.body;
  
      const plainPassword = CryptoJS.AES.decrypt(
        new_password,
        process.env.CRYPTOJS_SECRET
      ).toString(CryptoJS.enc.Utf8);
  
      const isUserExist = await User.findOne({ where: { email: email } });
      if (!isUserExist) {
        return handleNotFound(res);
      }
      const hashedPassword = await hashPassword(plainPassword);

      await User.update(
        { password: hashedPassword },
        { where: { email: email } }
      );
      return handleSuccess(res, {
        message: "Success reset password",
      });
    } catch (error) {
      console.log(error)
      return handleServerError(res);
    }
};

exports.editProfile = async (req, res) => {
  try{
      const { id } = req;
      const newDataUser = req.body;
      if(newDataUser?.new_password){
        const plainPassword = CryptoJS.AES.decrypt(
          newDataUser.new_password,
          process.env.CRYPTOJS_SECRET
        ).toString(CryptoJS.enc.Utf8);
        newDataUser.password = await hashPassword(plainPassword);
        delete newDataUser.new_password;
      }

      const fieldtoEdit = Object.keys(newDataUser);
      const { error, handleRes } = validateJoi(
        res,
        newDataUser,
        schemaProfile,
        fieldtoEdit
      );
      const isExist = await User.findOne({ where: { id: id } });
      if (!isExist) {
        return handleNotFound(res);
      }
      if (error) {
        return handleRes;
      }
      const response = await isExist.update(newDataUser);

      return handleSuccess(res, {
        data: response,
        message: "success edit profile",
      });
  }catch(error){
    console.log(error)
    return handleServerError(res);
  }
}

exports.editPhotoProfile = async (req, res) => {
  try{
    const { id } = req;
    const image = req?.file?.path
    console.log(id)
    console.log(image)
    if(!image){
      return handleClientError(res, 404, "Image Not Found")
    }
    const isExist = await User.findOne({ where: {id: id }})
    if(!isExist){
      return handleNotFound(res)
    }
    if (isExist.imagePath && isExist.imagePath !== "uploads/default.jpg") {
      unlink(isExist.imagePath, (err) => {});
    }
    const response = await isExist.update({ imagePath: image });

    return handleSuccess(res, {
      data: response,
      message: "success edit photo profile",
    });
  }catch(error){
    console.log(error)
    return handleServerError(res);
  }
}

exports.getProfile = async (req, res) => {
  try{
      const { id } = req;
      const response = await User.findByPk(id)
      if(!response){
        return handleNotFound(res)
      }
      delete response.password
      return handleSuccess(res, { data: response, message: "success" });
  }catch(error){
    return handleServerError(res, error)
  }
}

exports.getAllUsers = async(req, res) => {
  try{
    const page = parseInt(req.query.page, 10) || 1; 
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;

    const users = await User.findAndCountAll({
      include: [{
        model:DetailEventOrganizer,
        as: 'detailEventOrganizer',
        required: false 
      }],
      attributes: { exclude: ['password'] },
      limit: pageSize,
      offset: offset,
      order: [['createdAt', 'ASC']],
    })
    return handleSuccess(res, {
      message: 'success',
      data: users.rows,
      totalPages: Math.ceil(users.count / pageSize),
      currentPage: page,
  });
  }catch(error){
    console.log(error)
    return handleServerError(res, error)
  }
}

exports.deleteUserByAdmin = async(req, res) => {
  try{
      const { userId } = req.params
      const userToDelete = await User.findOne({ where: { id: userId} });
      if (!userToDelete) {
          return res.status(404).json({ message: "User not found or you're not authorized to delete this event" });
      }

      await userToDelete.destroy()
      return handleSuccess(res, { message: "User successfully deleted." });
  }catch(error){
    console.log(error)
    return handleServerError(res)
  }
}

exports.deleteUser = async(req, res) => {
  try{
    const userId = req.id;

    const userToDelete = await User.findOne({ where: {id: userId }});
    if(!userToDelete){
      return res.status(404).json({ message: "Your account has been deleted" });
    }
    await userToDelete.destroy()
    return handleSuccess(res, { message: "User successfully deleted." });
  }catch(error){
    console.log(error)
    return handleServerError(res, error)
  }
}

