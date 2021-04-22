import User, { IUserDocument } from '../../models/user/user'
import { 
    USER_DOES_NOT_EXIST, 
    USER_LOGIN_INCORRECT_PASSWORD, 
    USER_SUCCESSFUL_LOGIN 
} from '../../models/user/interfaces/user'
export class AuthenticationService {

    async login(email: string, password: string) {
        const login = await User.login(email, password)
        if(login) {
            const { message } = login
            const failedLogin = message === USER_LOGIN_INCORRECT_PASSWORD || message === USER_DOES_NOT_EXIST
            if(message === USER_SUCCESSFUL_LOGIN) {
                // create jwt
            } else if(failedLogin) return message
        } 
    }
} 