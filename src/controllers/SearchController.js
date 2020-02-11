const Developers = require('../models/Developers')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async findAll(req, res) {
        const { latitude, longitude, techs } = req.query

        const techsArray = parseStringAsArray.stringAsArray(techs)

        const developers = await Developers.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        })

        return res.json({ developers })
    }
}