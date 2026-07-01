export const generateToken = (user, message, statuscode, res) => {
    const token = user.getJWTToken();
    const cookieName = user && user.role === "Admin" ? "admintoken" : "patienttoken";
    res.status(statuscode)
        .cookie(cookieName, token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "None",
        })
        .json({
            success: true,
            message,
            user,
            token,
        });
};

