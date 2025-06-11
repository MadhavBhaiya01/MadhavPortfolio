const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, rating, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",         // <== Replace with your Gmail
      pass: "your-app-password"             // <== Use App Password, NOT regular password
    }
  });

  const mailOptions = {
    from: email,
    to: "your-email@gmail.com",             // <== Your receiving email
    subject: "Portfolio Contact Form Submission",
    text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Rating: ${rating}
Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ message: "There was an error sending the message." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
