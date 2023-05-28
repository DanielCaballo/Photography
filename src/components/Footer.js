import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={"footer"}>
            <div className={"footer--left"}>
                <p>&copy; Daniel Caballo</p>
            </div>
            <div className={"footer--right"}>
                {currentYear}
            </div>
        </footer>
    );
};

export default Footer;