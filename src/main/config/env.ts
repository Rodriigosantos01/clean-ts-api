export default {
    mongoUrl: process.env.MONGO_URLDbAddAccount || 'mongodb://localhost:27017/clean-node-api',
    port: process.env.PORT || 5050,
    jwtSecret: process.env.JWT_SRCRET || 'tj670==5h'
}