import * as React from "react";
import PhotographyImage1 from "../images/Photography-sing.png";
import {useEffect, useState} from "react";
import {auth} from "../../firebase";


export const Regist = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const signUp = (event) => {
        event.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                });
            })
            .catch((error) => alert(error.message));

        // setOpen(false);
        // window.location.reload(false);
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [user, username]);
    return (
        <div className="contenedor">
            <form className="formulario">
            <center>
                <img
                    className="tarjeta--form--img__sing"
                    src={PhotographyImage1}
                    alt=""
                    width={'180'}
                    height={'60'}
                />
            </center>
            <br></br>
            <input
                className={"tarjeta--form__input"}
                placeholder="Nombre de Usuario"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br></br>
            <input
                className={"tarjeta--form__input"}
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <input
                className={"tarjeta--form__input"}
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
                <div className={"botones"}>
            <button className={"button-style"} type="submit" onClick={signUp}>
                Registrarse
            </button>
                </div>
        </form>
        </div>
    );
};
