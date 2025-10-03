import { comparePassword, generateToken } from '../../utils';
import * as AuthRepository from './auth.repository';



export const loginUser = async (data:  { email: string; password: string } ) => {
    try {
        const findUser = await AuthRepository.findByEmail(data.email);

        if (!findUser || !(await comparePassword(data.password, (findUser.password|| '')))) {
            throw new Error('Invalid credentials');
        }
       
        const token = generateToken(findUser.id, findUser?.role);
        const {password, ...user} = findUser;
        return { user, token };
    } catch (err) {
        throw err; 
    }
    
};

export const userProfile = async (userId: string ) => {
    try {
        const findUser = await AuthRepository.findById(userId);
        if (!findUser) {
            throw new Error('User not found');
        }
      
        const {password, ...user} = findUser;
        
        return { user };
    } catch (err) {
        throw err; 
    }
    
};

