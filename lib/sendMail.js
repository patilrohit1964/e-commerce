import nodemailer from "nodemailer";
export const sendMail = async (subject, reciver, html) => {
  var transporter = nodemailer.createTransport({
    // host: process.env.NODEMAILER_HOST,
    // port: process.env.NODEMAILER_PORT,
    // secure: false,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const options = {
    from: `"Developer Rp" <${process.env.NODEMAILER_EMAIL}>`,
    to: reciver,
    subject,
    html,
  };
  try {
    await transporter.sendMail(options);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: true, error: error?.message };
  }
};
