const AWS = require('aws-sdk');
const dotenv = require("dotenv");
const sendGridMail = require("@sendgrid/mail");
const secretsManager = new AWS.SecretsManager();
const secretName = process.env.SENDGRID_API_KEY_SECRET_NAME;

dotenv.config();

//sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  const secretValue = await secretsManager.getSecretValue({ SecretId: secretName }).promise();

  let sendGridApiKey;

  if (secretValue.SecretString) {
    const secret = JSON.parse(secretValue.SecretString);
    sendGridApiKey = secret.api_key; // Assuming your secret has a key named "api_key"
  } else {
    const buff = Buffer.from(secretValue.SecretBinary, 'base64');
    sendGridApiKey = buff.toString('ascii');
  }

  // Set SendGrid API Key
  sendGridMail.setApiKey(sendGridApiKey);
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
