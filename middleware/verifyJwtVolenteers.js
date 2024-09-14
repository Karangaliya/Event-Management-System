import jwt from "jsonwebtoken"
import { ApiError } from "../utils/Error.js";
import { Volenteer } from "../models/volenteer.model.js";

const verifyJWTV = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(404, "Token doesn't found");
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(404).json({ message: 'Sesstion Expired', expiredAt: err.expiredAt });
                } else {
                    return res.status(404).json({ message: 'Unauthorized' });
                }
            }
            const user = await Volenteer.findById(decoded._id);

            if (!user) {
                throw new ApiError(400, "There is no user in this AccessToken")
            }
            req.user = user;
            next();

        });

    } catch (error) {
        console.log("Error accur in the catch part : ", error);
        next(error);
    }
}

export default verifyJWTV;