const development = {
    name: 'development',
    db_uri: process.env.HUNGER_DOOR_MONGODB_URI,
    jwt_secret: process.env.HUNGER_DOOR_JWT_SECRET
}

const production = {
    name: 'production',
    db_uri: process.env.HUNGER_DOOR_MONGODB_URI,
    jwt_secret: process.env.HUNGER_DOOR_JWT_SECRET
}

module.exports = eval(process.env.HUNGER_DOOR_ENVIRONMENT) == undefined ? development:eval(process.env.HUNGER_DOOR_ENVIRONMENT);