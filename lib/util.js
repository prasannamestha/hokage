const required = msg => {
    throw new Error(msg)
}

module.exports = {
    required,
}
