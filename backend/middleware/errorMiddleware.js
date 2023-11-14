// error handlers we are creating two middleware handler 
// first one to catch any route error if any route dosen't exist then it will fire off
// second one is catchAll error handler to catch any error that occurs

const notFound = (req, res , next) => {
    const error = new Error (`Not Found - ${req.originlaUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // here statusCode is the variable we are defining to check if 200 is the status code and if it is not then set it to 500 and respond with the status code 
    let message = err.message;
    // here message will share whatever the error message is

    if(err.name == 'CastError' && err.kind === 'ObjectId'){

        statusCode == 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({ 
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
     });
    // the cast error is a specific type of error that mongoose throws
// here err.kind === 'ObjectId' it checks if we are looking for any object ID which does not exists then it will throw an error
}

export { notFound, errorHandler };  