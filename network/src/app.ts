import dotenv  from 'dotenv';
import SequelizeClient from './frameworks/http/express';

dotenv.config();

const server = new SequelizeClient();

server.listen();