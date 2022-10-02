import User from '../../models/User.js'
import jwt from 'jsonwebtoken';


// const jsonCookie = document.cookie.split("; ").find(row => row.startsWith("token="));
// const tokenCookie = jsonCookie.split("=")[1];

function getcookie(req) {
        var cookie = req.headers.cookie;
        
        const cookieArray = cookie.split(';');
        const tokenCookie = cookieArray.find((row) => { 
                const i = row.trim();
                return i.startsWith("token=");
              });
        const token = tokenCookie.trim().split("=")[1];
        return token;
    }

async function authToken(req, res, next) {
           
        const token = req.headers["authorization"]?.split(" ")[1] || getcookie(req);
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ where : {id : decoded.id }});
        if(user){
            res.status(200);
                next();
        } else {
            res.status(404).json({ error : "User does not exist" });
        }
}

export default authToken;