import jwt from "jsonwebtoken";


export const generateToken = (userId, secret, expiresIn) => {
    const token = jwt.sign({userId}, secret, {expiresIn: expiresIn});
    return token;
}