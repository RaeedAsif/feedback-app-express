const db = require("../models");
const Feedback = db.feedback;

insertFeedback = async (id, body) => {
  const feedback = await Feedback.create({
    date: Date.now(),
    type: body.type,
    feedback: body.feedback,
    user_id: id
  })

  return feedback.id;
}

findFeedbacksByUser = async (id, page, type) => {
  let count;
  if (!type) {
    count = await Feedback.count({ where: { user_id: id } });
  } else {
    count = await Feedback.count({ where: { user_id: id, type: type } });
  }
  const perPage = 10;
  const offset = (page - 1) * perPage;

  let feedbacks;
  if (!type) {
    feedbacks = await Feedback.findAll({
      where: { user_id: id },
      order: [["date", "DESC"]],
      limit: perPage,
      offset: offset,
    });
  } else {
    feedbacks = await Feedback.findAll({
      where: { user_id: id, type: type },
      order: [["date", "DESC"]],
      limit: perPage,
      offset: offset,
    });

  }

  return {
    count: count,
    content: feedbacks,
  };
}

module.exports = {
  insertFeedback,
  findFeedbacksByUser
}