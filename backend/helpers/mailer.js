import nodemailer from "nodemailer";
import { google } from "googleapis";

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";

const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

export const sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook email verification",
    html: `<div style=" max-width: 700px; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; font-family: Roboto; font-weight: 600; color: #3b5998; " > <img src="../frontend/public/icons/fb.png" alt="" style="width: 30px" /> <span >Elit adipisicing eiusmod deserunt deserunt aliqua cillum fugiat mollit sunt culpa.</span > </div> <div style=" padding: 1rem 0; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; color: #141823; font-size: 17px; font-family: Roboto; " > <span>Hello ${name}</span> <div style="padding: 20px 0"> <span style="padding: 1.5rem 0"> You Recently Created an account on facebook . To complete your registration , Please confirm your account</span > </div> <a href=${url} style=" width: 200px; padding: 10px 15px; background: #4c649b; color: #fff; text-decoration: none; font-weight: 600px; " >Confirm your account</a > <br /> <div style="padding-top: 20px"> <span style="margin: 1.5rem; color: #898f9c" >Nostrud enim quis officia amet ex cupidatat irure. Consectetur excepteur cupidatat tempor fugiat reprehenderit in fugiat occaecat irure. Est laboris adipisicing laborum irure mollit non. Dolor sit nulla dolor in ullamco amet. Duis fugiat labore elit aute fugiat aute occaecat non duis laborum cupidatat. Nostrud id in consequat reprehenderit adipisicing enim voluptate enim ut nulla ullamco consectetur enim eu.</span > </div> </div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
