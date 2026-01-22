const { User, Roles } = require("../models/index");

class AuthRepo {


  async create(data) {
    try {
      const res = await User.create(data);
      return res;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Email is already present');
      }
      console.log("Something went wrong in Repo level (create) ");
      throw error;
    }
  }

  async Delete(data) {
    try {
      const res = await User.destroy({
        where: {
          email: data.email,
        },
      });

      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (delete) ");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const user = await User.update(
        { ...data },
        {
          where: {
            id,
          },
        }
      );
      return user;
    } catch (error) {
      console.log("Something went wrong in Repo level (update) ");
      throw error;
    }
  }

  async updatePassword(email, password) {
    try {
      const user = await User.update(
        { password },
        {
          where: {
            email
          },
        }
      );
      return user;
    } catch (error) {
      console.log("Something went wrong in Repo level (update password) ");
      throw error;
    }
  }

  async getByEmail(emaildata) {
    try {
      // console.log("repo => ", emaildata);

      const user = await User.findOne({
        where: {
          email: emaildata,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong in Repo level (get by email) ");
      throw error;
    }
  }

  async getByUserId(id) {
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong in Repo level (get by email) ");
      throw error;
    }
  }

  async getAllUserByRoleRepo(data) {
    try {
      
      const user = await User.findAll({
        where: {
          role: data,
        },
      });
      
      
      
      return user;

    } catch (error) {
      console.log("Something went wrong in Repo level (get by email) ");
      throw error;
    }
  }

  async checkRole(data) {
    try {
      const user = await User.findOne({
        where: {
          email: data.email,
        },
      });
      
      let res = user.dataValues;
      
      return res;

    } catch (error) {
      console.log("Something went wrong in Repo level (get by email) ");
      throw error;
    }
  }

  async addRole(data) {
    try {

      const response = await User.update(
        {
          role: data.role,
        },
        {
          where: {
            email: data.email,
          },
        }
      );

      console.log("from repo => ", response);


      return response;
    } catch (error) {
      console.log("Something went wrong in Repo level (get by email) ");
      throw error;
    }
  }


}

const authRepo = new AuthRepo();
module.exports = authRepo;

