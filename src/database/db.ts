import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('taskmanager','','',{
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging:false
  });

export async function dbConnection(){
    try {
        await sequelize.sync({alter:false});
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

// export default dbConnection