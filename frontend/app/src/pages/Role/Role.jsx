import React from 'react';
import { useNavigate } from 'react-router';


const Role = () => {
    const navigate = useNavigate()
    return (
        <div>
            i am role page
            <button onClick={() =>navigate(-1) }>
                go back
            </button>
        </div>
    );
};

export default Role;