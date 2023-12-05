const nodemailer = require("nodemailer");

exports.handleSendMailVerifyOTP = async (OTP, email) => {
    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.PASSWORD,
      },
    });
    const message = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Verify Email CommuniCast",
      html: `<body>
    <div
      style="
        font-family: Helvetica, Arial, sans-serif;
        min-width: 1000px;
        overflow: auto;
        line-height: 2;
      "
    >
      <div style="margin: 50px auto; width: 70%; padding: 20px 0">
        <div style="border-bottom: 1px solid #eee">
          <p
            style="
              font-size: 1.4em;
              color: rgb(163 230 53);
              text-decoration: none;
              font-weight: 600;
            "
          >
            CommuniCast
          </p>
        </div>
        <p style="font-size: 1.1em">Hi,</p>
        <p>
          Thank you for choosing CommuniCast. Use the following
          verify Email
        </p>
        <h2
          style="
            background: rgb(163 230 53);
            margin: 0 auto;
            width: max-content;
            padding: 0 10px;
            color: #fff;
            border-radius: 4px;
          "
        >
          <p>
            This your OTP Number <b>${OTP}</b>
          </p>
        </h2>
        <p style="font-size: 0.9em">Regards,<br />CommuniCast</p>
        <hr style="border: none; border-top: 1px solid #eee" />
      </div>
    </div>
  </body>
  `,
    };
    try {
      const info = await transport.sendMail(message);
      return info;
    } catch (error) {
      console.log(error);
    }
};