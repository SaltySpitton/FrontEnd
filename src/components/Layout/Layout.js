import React from 'react';
// import { Link } from 'react-router-dom'
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

import Navigation from './Navigation';

const Layout = ({ children }) => {
    
    const location = useLocation();

       
    return (
        <div>
           {(location.pathname !== "/") ? <Navigation /> : null}

            {children}

            <Footer />
        </div>
    )
}

export default Layout;
