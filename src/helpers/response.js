module.exports = {
    success: (res, status, data, pagination) => {
        const result = {}
        const page = []

        if (pagination) {
            for (var i = 1; i <= pagination; i++) {
                page[i - 1] = i
            }
            result.totalPage = page
        }

        result.status = status || 200
        result.result = data

        return res.status(result.status).json(result)
    },
    error: (res, status, msg) => {
        const result = {}

        result.status = status || 400
        result.msg = msg

        return res.status(result.status).json(result)
    }
}  