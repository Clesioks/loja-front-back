const notFound = (req, res, next) => {
    const error = new Error (`Não encontrado - ${req.originaUrl}`)
    res.status(404)
    next(error)
}


const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    //Check for Mongoose bad ObjectId

    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        message = `Recurso não encontrado`
        statusCode = 404
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? 'panqueca' : err.stack
    })
}

export { notFound, errorHandler }