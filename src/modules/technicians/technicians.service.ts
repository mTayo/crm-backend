import * as TechniciansRepository from './technicians.repository';


export const getAllTechnicians = async () => {
    try {
        const technicians = await TechniciansRepository.findAll();
          
        return technicians;
    } catch (err) {
        throw err; 
    }
}

