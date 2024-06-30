'use client'

import {useData} from '@/services/dataProvider/DataProvider';
import React, {ReactNode} from 'react';
import {LoadingCircle} from "@/components/LoadingCircle";


const Layout = ({children, params: {space}}: { children: ReactNode, params: { space: string } }) => {
    const {refreshSpace, spaceDetails} = useData();

    refreshSpace(space);

    return (
        <>
            {!spaceDetails[space] && <LoadingCircle/>}
            {spaceDetails[space] && 
                children
        
            }
        </>
    );
};

export default Layout;