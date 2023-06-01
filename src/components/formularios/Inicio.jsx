import * as React from "react";
import PhotographyImage1 from "../images/Photography-sing.png";
import {useEffect, useState} from "react";
import {auth, db, provider} from "../../firebase";
import 'firebase/compat/auth';

export const Inicio = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    // Inicio de sesion con google
    const signInWithGoogle = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                // El inicio de sesión con Google se completó exitosamente
                 const user = result.user;
                // Aquí puedes realizar acciones adicionales con el usuario, como guardar su información en tu base de datos
            })
            .catch((error) => {
                // Ocurrió un error durante el inicio de sesión con Google
                console.log(error);
            });
    };

    const signIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));

         //setOpensignin(false);
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
                placeholder="email?"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <input
                className={"tarjeta--form__input"}
                placeholder="Contraseña?"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <button className={"button--full"} type="submit" onClick={signIn}>
                Entrar
            </button>
            <button className={"button--full"} onClick={signInWithGoogle}>Iniciar sesión con Google</button>
        </form>
        </div>
    );
};
