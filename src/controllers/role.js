const model = require('../models/role')
const response = require('../helpers/response')

module.exports = {
    readRole: async (req, res) => {
        try {
            const result = await model.readRole()
            response.success(res, 200, result)
        } catch (err) {
            response.error(res, 404, 'Failed!')
        }
    }
}