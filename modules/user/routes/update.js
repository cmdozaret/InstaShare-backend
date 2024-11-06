const { sequelize } = require('../../../common/db');
const { models } = sequelize;

const bcrypt = require('bcryptjs');

module.exports = async function (req, res) {
    try {
        let user = req.user;
        if (user.id !== req.loggedUser.id) {
            const error = new Error();
            error.status = 403;
            error.message = 'You can only update your own profile';
            throw error;
        }
        for (const attribute in req.body) {
            user[attribute] = req.body[attribute];
        }
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user.password = hashedPassword;
        }
        await user.save();
        return res.status(200).json(user);
    }
    catch (e) {
        responseObj.success = false;
        responseObj.message = e.message;
        responseObj.status = e.status;
        const messages = {};
        if (e instanceof ValidationError) {
            responseObj.status = 400;
            e.errors.forEach((error) => {
                let message;
                switch (error.validatorKey) {
                    case 'isEmail':
                        message = 'Please enter a valid email';
                        break;
                    case 'isDate':
                        message = 'Please enter a valid date';
                        break;
                    case 'len':
                        if (error.validatorArgs[0] === error.validatorArgs[1]) {
                            message = 'Use ' + error.validatorArgs[0] + ' characters';
                        } else {
                            message = 'Use between ' + error.validatorArgs[0] + ' and ' + error.validatorArgs[1] + ' characters';
                        }
                        break;
                    case 'min':
                        message = 'Use a number greater or equal to ' + error.validatorArgs[0];
                        break;
                    case 'max':
                        message = 'Use a number less or equal to ' + error.validatorArgs[0];
                        break;
                    case 'isInt':
                        message = 'Please use an integer number';
                        break;
                    case 'is_null':
                        message = 'Please complete this field';
                        break;
                    case 'not_unique':
                        message = error.value + ' is taken. Please choose another one';
                        error.path = error.path.replace("_UNIQUE", "");
                }
                messages[error.path] = message;
                responseObj.message = `${error.path}: ${message}`;
            });
            // responseObj.message = messages;
            return res.status(e.status || 500).json(responseObj)
        }
        return res.status(e.status || 500).json({
            message: e.message || 'Error creating new user',
        })
    }
}
