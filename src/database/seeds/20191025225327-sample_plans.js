module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'plans',
      [
        {
          title: 'Silver',
          duration: 1,
          price: 129.99,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Gold',
          duration: 3,
          price: 109.99,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Diamond',
          duration: 6,
          price: 89.99,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};