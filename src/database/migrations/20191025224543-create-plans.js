module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plans', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      symbol: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      total_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('plans');
  },
};
