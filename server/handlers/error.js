function errorHandler(err, request, response, next){
    return response.status(err.status || 500).json({
        error: {
            message: err.message || "Oops, something went wrong...please try again later.",
            status: err.status
        }
    });
}

module.exports = errorHandler;

