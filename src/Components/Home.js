import React from "react";
import { Button } from "@material-ui/core";
import './App.css';

function App() {
    return (
        <div>
            <div className={'app__header'}>
                <img className={'app__headerImage'}
                     src='https://w7.pngwing.com/pngs/973/11/png-transparent-logo-phoenix-illustration-phoenix-logo-design-phoenix-illustration-free-logo-design-template-photography-orange.png'
                     alt="logo"
                     width={'100'}
                     height={'100'}
                />
            </div>

            <div>
                <Button variant>Entrar</Button>
                <Button>Registrate</Button>
            </div>
        </div>
    );
}

export default App;