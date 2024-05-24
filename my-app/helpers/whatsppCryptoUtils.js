import { Fernet } from 'fernet-nodejs';

const key = process.env.FLASK_SECRET_KEY;

const decryptToken = (token) => {
    const cipher = new Fernet(key);

    const orignal_data = cipher.decrypt(token);
    console.log("original_data:", orignal_data);
    return orignal_data
};

export default decryptToken;