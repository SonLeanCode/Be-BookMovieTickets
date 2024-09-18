const CHECKTEXT = {
    validator: function (value) {
        return !/[`!@#$%^&*()=[\]{};':"\\|<>/?~]/.test(value);
    },
    message: props => 'Please enter format a-zA-Z0-9 and +_.-'
}

const CHECKNUMBER = {
    validator: function (value) {
        return /^[0-9]*$/.test(value);

    },
    message: props => 'Please enter number'

}
module.exports = {
    CHECKTEXT, CHECKNUMBER
}
