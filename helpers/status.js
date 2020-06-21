const successMsg = { status: 'success', data: []};
const errorMsg = { status: 'error', error: '' };
const status = {
    success: 200,
    error: 500,
    notfound: 404,
    unauthorized: 401,
    conflict: 409,
    created: 201,
    bad: 400,
    nocontent: 204
};

module.exports = successMsg;
module.exports = errorMsg;
module.exports = status;