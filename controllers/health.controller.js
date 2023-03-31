serverHealth = (req, res) => {
    res.status(200).send({ health: "good"});
};

module.exports = {
    serverHealth,
};
