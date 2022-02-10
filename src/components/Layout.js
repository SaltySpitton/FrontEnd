import React from 'react';
import { Link } from 'react-router-dom'
import Footer from './Footer';

import Navigation from './Navigation';

const Layout = ({ children }) => {

    return (
        <div className='container'>
            <Navigation />

            {children}

            <Footer />
        </div>
    )
}

export default Layout;
