import { CreateCustomerDto } from './customer.dto';
import * as CustomerRepository from './customer.repository';



export const createCustomer = async (data:  CreateCustomerDto) => {
    try {
        const findCustomer = await CustomerRepository.findByEmail(data.email);

        if (findCustomer) {
            throw new Error('Email already in use');
        }
       
        const newCustomer = await CustomerRepository.createCustomer(data);
        
        return newCustomer;
    } catch (err) {
        throw err; 
    }
    
};

export const getCustomer = async (customerIdId: string ) => {
    try {
        const findCustomer = await CustomerRepository.findById(customerIdId);
        if (!findCustomer) {
            throw new Error('Customer not found');
        }
        return findCustomer;
    } catch (err) {
        throw err; 
    }
    
};
export const getAllCustomer = async ( ) => {
    try {
        const findCustomer = await CustomerRepository.findAll();
        if (!findCustomer) {
            throw new Error('Customer not found');
        }
        return findCustomer;
    } catch (err) {
        throw err; 
    }
    
};


