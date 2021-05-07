import { ObjectId } from 'mongodb'
import * as jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import { SECRET_KEY } from '../../config/keys'
import User, { IUserDocument } from '../../models/user/user'
import RefreshToken, { IRefreshToken } from '../../models/user/refreshToken'
import { 
    USER_DOES_NOT_EXIST, 
    USER_LOGIN_INCORRECT_PASSWORD, 
    USER_SUCCESSFUL_LOGIN 
} from '../../models/user/interfaces/user'
import { UserAuthenticated } from './types'
export class AuthenticationService {
    /**
     * Created a JWT token
     * @param user - user document _id
     * @returns refresh token 
    */
    async createJWT(user: IUserDocument): Promise<UserAuthenticated> {
        const {  email, _id } = user
            const token = jwt.sign({
                    email,
                    _id,
                }, SECRET_KEY, { expiresIn: '15m' }
            )
            let refreshToken = await this.createRefreshToken(_id)
            while(!refreshToken) refreshToken = await this.createRefreshToken(_id)
            const result = {
                token,
                refreshToken,
            }
        return result
    }
    /**
     * Validates user login
     * @param userId - user document _id
     * @returns refresh token 
    */
    async createRefreshToken(userId: ObjectId): Promise<string | undefined> {
        const token = uuidv4()
        const d: IRefreshToken = { userId, token }
        const document = await RefreshToken.createNew(d)
        return document ? token : undefined
    }
    /**
     * Validates user login
     * @param email - User's email address
     * @param password - user's password
     * @returns JWT or error message
     */
    async login(email: string, password: string): Promise<string | UserAuthenticated> {
        const login = await User.login(email, password)
        if(login) {
            const { message } = login
            const failedLogin = message === USER_LOGIN_INCORRECT_PASSWORD || message === USER_DOES_NOT_EXIST
            if(message === USER_SUCCESSFUL_LOGIN) {
                return await this.createJWT(login.user)
            } else if(failedLogin) return message
        } 
    }
} 