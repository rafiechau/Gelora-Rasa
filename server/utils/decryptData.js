const CryptoJS = require('crypto-js')

const decryptData = (res, token) => {
  try {
    const bytes = CryptoJS.AES.decrypt(token, process.env.TOKEN_Data)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  } catch (error) {
    return errorHandler(res, 400, 'Bad request', 'Invalid token')
  }
}

module.exports = decryptPayload
