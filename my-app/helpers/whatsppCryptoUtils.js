import { Fernet } from 'fernet-nodejs';

const key = process.env.FLASK_SECRET_KEY;

const decryptToken = (token) => {
    const cipher = new Fernet(key);
    const orignal_data = cipher.decrypt(token);
    return orignal_data
};

export default decryptToken;