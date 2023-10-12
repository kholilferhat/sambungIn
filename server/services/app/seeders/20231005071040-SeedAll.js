'use strict';

const { hashPass } = require('../Helpers/bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const user = require('../../data/db.json').users.map(el => {
      delete el.id,
      el.password = hashPass(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    const job = require('../../data/db.json').jobs.map(el => {
      delete el.id,
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    const company = require('../../data/db.json').companies.map(el => {
      delete el.id,
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    const skill = require('../../data/db.json').skills.map(el => {
      delete el.id,
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Users', user)
    await queryInterface.bulkInsert('Companies', company)
    await queryInterface.bulkInsert('Jobs', job)
    await queryInterface.bulkInsert('Skills', skill)




  },
 
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Skills', null, {});
    await queryInterface.bulkDelete('Jobs', null, {});
    await queryInterface.bulkDelete('Companies', null, {});
    await queryInterface.bulkDelete('Users', null, {});


  }
};
