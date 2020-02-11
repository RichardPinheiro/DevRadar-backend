const axios = require('axios')
const Developers = require('../models/Developers')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

module.exports = {
    async findAll(req, res) {
        const developers = await Developers.find()
        return res.json(developers)
    },

    async create(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let developer = await Developers.findOne({ github_username }) 

        if (!developer) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`)
        
            const { name = login, avatar_url, bio } = response.data
        
            const arrayTechs = parseStringAsArray.stringAsArray(techs)
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            developer = await Developers.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: arrayTechs,
                location,
            })

            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                arrayTechs,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', developer)
        }
    
        return res.json(developer)
    }
}