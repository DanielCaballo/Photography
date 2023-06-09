import * as React from "react";
import PhotographyImage1 from "../images/Photography-sing.png";
import {useEffect, useState} from "react";
import {auth, provider} from "../../firebase";
import 'firebase/compat/auth';
import 'firebase/auth';
import 'firebase/firestore';

export const Inicio = () => {
    const [username] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    // Inicio de sesion con google
    //Inicio de sesion con google
    // function signInWithGoogle() {
    //     console.log("auth user....")
    //     auth.signInWithPopup(provider)
    //         .then((result) => {
    //             console.log("todo ok... bueno 200 al menos")
    //             // El inicio de sesión con Google se completó exitosamente
    //              const user = result.user;
    //             // Aquí puedes realizar acciones adicionales con el usuario, como guardar su información en tu base de datos
    //
    //         })
    //         .catch((error) => {
    //             // Ocurrió un error durante el inicio de sesión con Google
    //             console.error(error);
    //         })
    //         .finally(()=> {
    //             console.log("sacabo")
    //         })
    // };

    const signIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => {
                let errorMessage = "Ha ocurrido un error al iniciar sesión.";
                if (error.code === "auth/user-not-found") {
                    errorMessage = "El usuario no existe.";
                } else if (error.code === "auth/wrong-password") {
                    errorMessage = "Contraseña incorrecta.";
                }
                alert(errorMessage);
            });
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
                <div className={"botones"}>
            <button className={"button-style"} type="submit" onClick={signIn}>
                Entrar
            </button>
                </div>
        </form>
        </div>
    );
};
