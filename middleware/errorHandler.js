const errorHandler = (err, req, res, next) => {
    if (err.status && err.msg)
        return res.status(err.status).json({success: false, error: err.msg});

    console.log('[ERROR]: ', err);
    res.status(500).json({success: false, error: "Internal server error"});
}

module.exports = errorHandler;