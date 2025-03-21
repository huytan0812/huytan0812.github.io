import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

const Recipe = () => {
    const params = useParams();

    return (
        <React.Fragment>
            <p>
                <button type="button">
                    <NavLink to='/menu'>
                        Quay lại menu
                    </NavLink>
                </button>
            </p>
            <p>Đây là recipe { params.recipeId }</p>
        </React.Fragment>
    )
}

export default Recipe