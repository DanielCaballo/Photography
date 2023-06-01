import React, { useState, useEffect } from 'react';
import PhotographyImage from "./images/Photography.png";
import PhotographyImage1 from "./images/Photography-sing.png";
import Eslogan from "./images/Eslogan.png";
import 'firebase/compat/auth';
import Posts from './Posts';
import AddPost from './AddPost';
import { db, auth, provider } from "../firebase";
import Footer from "./Footer";

import { useModal } from "../Modals/useModal";
import { withModal } from "../Modals/withModal";

const Home = () => {
    const [has_modal, toggleModal] = useModal();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [posts, setposts] = useState([]);
    const InfoFormUseWithModal = withModal(
        InfoFormUse,
        {},
        {
            has_modal,
            toggleModal,
        }
    );

    // Inicio de sesion con google
    const signInWithGoogle = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                // El inicio de sesión con Google se completó exitosamente
                // const user = result.user;
                // Aquí puedes realizar acciones adicionales con el usuario, como guardar su información en tu base de datos
            })
            .catch((error) => {
                // Ocurrió un error durante el inicio de sesión con Google
                console.log(error);
            });
    };

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

        setOpen(false);
        // window.location.reload(false);
    };

    const signIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));

        setOpensignin(false);
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

    useEffect(() => {
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setposts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                );
            });
    }, []);

    return (
        <div className="tarjeta">
                <div onClick={toggleModal}>
                    <form className="tarjeta--form">
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
                        <button className={"button"} type="submit" onClick={signUp}>
                            Registrarse
                        </button>
                    </form>
                </div>
                <div onClick={toggleModal}>
                    <form className="">
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
                        <br/>

                        <button className={"button--full"} onClick={signInWithGoogle}>Iniciar sesión con Google</button>

                    </form>
                </div>
            <div className="">
                <img
                    className="tarjeta--form__img"
                    src={PhotographyImage}
                    alt=""
                    width={'180'}
                    height={'60'}
                />
            </div>

            {user ? (
                <div className={"salir"}>
                    <button className={"button"} onClick={() => auth.signOut()}>Salir</button>
                </div>
            ) : (
                <div className={"salir"}>
                    <button className={"button"} disableElevation onClick={() => setOpensignin(true)}>Inicia Sesion</button>
                    <span>&nbsp;</span>
                    <button className={"button"} disableElevation onClick={() => setOpen(true)}>Registrate</button>
                </div>
            )}

            {user && user.displayName ? (
                <>
                    <AddPost username={user.displayName} />
                </>
            ) : (
                <div className='inicio'>
                    <div className={"inicio__frase"}>
                        Inicia sesión <b onClick={() => setOpensignin(true)} style={{ cursor: 'pointer', color: 'Red' }}>    aquí   </b> o <b onClick={() => setOpen(true)} style={{ cursor: 'pointer', color: 'Blue' }}>   regístrate   </b> para poder añadir o comentar fotos.
                    </div>
                    <div className={"inicio__img"}>
                        <img src={Eslogan}
                             alt="Eslogan"
                             width={'650'}
                             height={'650'}/>
                    </div>
                </div>
            )}

            <div className="">
                <div className="Post">
                    <br />
                    {posts.map(({ id, post }) => (
                        user && user.displayName ? (
                            <Posts
                                key={id}
                                postId={id}
                                user={user}
                                userName={post.userName}
                                caption={post.caption}
                                imageURL={post.imageURL}
                            />
                        ) : null
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
