import React, {useMemo} from 'react'
import { ServiceContext } from '../core/service';
import { createService } from './service';

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const service = useMemo(() => createService(),[]);
    return (
        <ServiceContext.Provider value={service}>
            {children}
        </ServiceContext.Provider>
    );
}