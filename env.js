const vars = {
    development: {
        googleApiKey: 'AIzaSyA9VIpbHAuTdmNr-eUHvIOy_5Co6xUPRso'
    },
    production: {
        googleApiKey: ''
    }
};

const getEnvVariables = _ => {
    if (__DEV__) {
        return vars.development
    }
    return vars.production
}

export default getEnvVariables;

