import { SetMetadata } from '@nestjs/common';
import { ValidRole } from '../interface/valid-role';

export  const META__ROLES = 'roles';

export const RoleProtected = (...args: ValidRole[]) =>{
    
    
    return SetMetadata(META__ROLES, args);


}
