const { insertFeedback, findFeedbacksByUser } = require('../services/feedback.service');

createFeedback = async (req, res) => {
    if (req.body.type == "") {
        res.status(400).send({ message: 'error', error: "type cannot be empty" });
    }

    if (req.body.feedback == "") {
        res.status(400).send({ message: 'error', error: "feedback cannot be empty" });
    }  

    try {
        const id = await insertFeedback(req.userId, req.body)
        res.status(200).send({ message: "success" , id: id});
    } catch(err){
        res.status(500).send({ message: "error", error: err.message });
    }
};

getFeedbacks = async (req, res) => {
    let { page, type } = req.query;

    if (isNaN(page))  {
        page = 1
    }

    try {
        const data = await findFeedbacksByUser(req.userId, page, type)
        res.status(200).send({ message: "success" , data: data});
    } catch (err) {
        res.status(500).send({ message: "error", error: err.message });
    }
};

module.exports = {
    createFeedback,
    getFeedbacks,
};
