const dotenv = require("dotenv");
const sendGridMail = require("@sendgrid/mail");

dotenv.config();

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  const { email, verification_token, verification_token_expiration } = JSON.parse(
    event.Records[0].Sns.Message
  );

  try {
    // Generate the verification link
    const verificationLink = `${process.env.WEB_APP_URL}/verify-email?token=${verification_token}`;

    // Send the verification email to the user
    const msg = {
      to: email,
      from: "matheshramesh98@gmail.com",
      subject: "Please verify your email",
      text: `Click the link to verify your email: ${verificationLink} This link expires at ${verification_token_expiration}.`,
    };

    await sendGridMail.send(msg);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error in Lambda function:", error);
    throw new Error("Error sending verification email");
  }
};
