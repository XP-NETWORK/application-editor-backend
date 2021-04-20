import * as mongoose from 'mongoose';
import * as bcryptjs from 'bcryptjs'

export const hashString = async (str: string) => await bcryptjs.hash(str, 10)
