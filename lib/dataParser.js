const helper = require('./helpers');

module.exports = (data, headers) => {
    switch (headers['Content-Type']) {
        case 'application/json':  {
            return helper.parseJsonToObject(data);
        }
        // SOME OTHER HEADER
        // case ''
    }
}