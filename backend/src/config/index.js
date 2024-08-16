
const ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET ?? "";
const REFRESHTOKEN_SECRET = process.env.REFRESHTOKEN_SECRET ?? "";
const DEV_MODE = process.env.NODE_ENV;

const constants = {
    ACCESSTOKEN_SECRET,
    REFRESHTOKEN_SECRET,
    DEV_MODE,
}

export default constants