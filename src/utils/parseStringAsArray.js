module.exports = {
    stringAsArray(strings) {
        return strings.split(',').map(string => string.trim())
    },
}