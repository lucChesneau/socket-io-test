import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



function getCookie(cookie) {
        const jsonCookie = cookie.split("; ").find(row => row.startsWith("token="));
        const token = jsonCookie?.split("=")[1];
        
        let decoded = null;
        try {
                decoded = jwt.verify(token, process.env.SECRET);
        } catch (error) {
                console.log(error);
        }
        
        return decoded;
    }

function getUsername(cookie) {
        const decoded = getCookie(cookie);
        return decoded?.username || null;
    }

    
export { getCookie, getUsername };