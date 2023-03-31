module.exports = (sequelize, Sequelize) => {
    const Feedback = sequelize.define("feedback", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      feedback: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
    },{
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    return Feedback;
  };