const nodemailer = require("nodemailer");

exports.handleSendMailForgotPass = async (token, email) => {
  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.PASSWORD,
    },
  });
  const message = {
    user: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Reset Password Gelorasa",
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
          Gelorasa
        </p>
      </div>
      <p style="font-size: 1.1em">Hi,</p>
      <p>
        Thank you for choosing Gelorasa. Use the following
        reset password to login
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
          Click to Reset Password from Gelorasa
          <a
            href="${process.env.CLIENT_URL}${token}/reset-password/"
            id="sendPassword"
            target="_blank"
            >Reset Password</a
          >
        </p>
      </h2>
      <p style="font-size: 0.9em">Regards,<br />Gelorasa Team</p>
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
      subject: "Verify Email Gelorasa",
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
            Gelorasa
          </p>
        </div>
        <p style="font-size: 1.1em">Hi,</p>
        <p>
          Thank you for choosing Gelorasa. Use the following
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
        <p style="font-size: 0.9em">Regards,<br />Gelorasa</p>
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

exports.handlesendMeetingIdEmail = async (meetingId, email, eventName) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.PASSWORD,
    },
  });

  const message = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: `Your Meeting ID for ${eventName}`,
    html: `<body>
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; border-bottom: 2px solid #00a2ff;">
          <h1 style="margin: 0; color: #00a2ff;">YourEventPlatform</h1>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 1.1em">Hello,</p>
          <p>You are invited to join the event: <strong>${eventName}</strong>.</p>
          <p>Please use the following Meeting ID to join:</p>
          <h2 style="background: #00a2ff; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">
            <span>${meetingId}</span>
          </h2>
          <p style="font-size: 0.9em">Regards,<br />YourEventPlatform Team</p>
          <hr style="border: none; border-top: 1px solid #eee" />
        </div>
      </div>
    </body>`,
  };

  try {
    const info = await transport.sendMail(message);
    return info;
  } catch (error) {
    console.log('Error in sending email:', error);
    throw error;
  }
};

exports.handleSendOrderConfirmation = async (orderDetails, user) => {
  var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.PASSWORD,
      },
  });

  const message = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: "Konfirmasi Order - Gelorasa",
      html: `<body>
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; border-bottom: 2px solid #00a2ff;">
              <h1 style="margin: 0; color: #00a2ff;">Gelorasa</h1>
          </div>
          <div style="padding: 20px;">
              <p style="font-size: 1.1em">Hi, ${user.firstName},</p>
              <p>Terima kasih telah melakukan pemesanan di Gelorasa. Berikut adalah detail order Anda:</p>
              <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #00a2ff; margin-bottom: 20px;">
                  <p><strong>Nama Event:</strong> ${orderDetails.eventName}</p>
                  <p><strong>Jenis Tiket:</strong> ${orderDetails.ticketsTypes}</p>
                  <p><strong>Total Tiket:</strong> ${orderDetails.totalTickets}</p>
                  <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
                  <p><strong>Tanggal Pembelian:</strong> ${orderDetails.purchaseDate}</p>
              </div>
              <p style="font-size: 0.9em; text-align: center;">Regards,<br />Tim Gelorasat</p>
          </div>
      </div>
  </body>`
  };

  try {
      const info = await transport.sendMail(message);
      return info;
  } catch (error) {
      console.log(error);
  }
};
