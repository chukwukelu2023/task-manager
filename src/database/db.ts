import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config()

const database = process.env.DATABASE as string
const username = process.env.DATABASE_USERNAME as string
const password = process.env.DB_PASSWORD as string
const host = process.env.HOST as string
const port = process.env.DB_PORT as string
const dialect = process.env.DIALECT as Dialect


  export const sequelize = new Sequelize({
    database: database,
    dialect: dialect,
    username: username,
    password: password,
    port: +port,
    logging:false,
    host:host,
    dialectOptions:{
      ssl:{
        require: true,
        rejectUnauthorized: false,
      },
    }
  });

export async function dbConnection(){
    try {
        await sequelize.sync({alter:true});
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

// export default dbConnection