import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// const authUser = async (req, res, next) => {
//     const { tok  en } = req.headers;

//     // Check if token is provided
//     if (!token) {
//         return res.status(403).json({ success: false, message: 'Not Authorized. Login Again' });
//     }

//     try {
//         // Verify token
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { id: token_decode.id }; // Set user ID in req.user
//         next(); // Move to the next middleware/route handler
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({ success: false, message: error.message });
//     }
// };

export default authUser;