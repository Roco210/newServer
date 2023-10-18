import dotenv from "dotenv"
dotenv.config()

export default{

    port: process.env.PORT,
    mongoUrl:process.env.URI,
    jwtSecret:process.env.JWT_SECRET_KEY,
    sessionSecret:process.env.SESSION_SECRET,
    clientId:process.env.CLIENT_ID_GIT,
    clientSecret:process.env.CLIENT_SECRET_GIT,
    gmailUser:process.env.GMAIL_USER,
    gmailPass:process.env.GMAIL_PASS,

}


