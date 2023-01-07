import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



function getCookie(cookie) {
        const jsonCookie = cookie.split("; ").find(row => row.startsWith("token="));
        const token = jsonCookie?.split("=")[1];
        

       let decoded = jwt.decode(token, process.env.SECRET);
       
        
        return decoded;
    }

function getUsername(cookie) {
        const decoded = getCookie(cookie);
        return decoded?.username || null;
    }

    
export { getCookie, getUsername };