const mongoose = require('mongoose');

const errorHandler = (error, req, res, next) => {
    console.log('[ERROR]: ', error);

    if (error instanceof mongoose.Error.CastError)
    {
        return res.status(404).json({
            success: false,
            error: {
                message: error.message,
                valueGot: error.value
            }
        });
    }

    res.status(500).json({success: false, error: "Internal server error"});
}

module.exports = errorHandler;