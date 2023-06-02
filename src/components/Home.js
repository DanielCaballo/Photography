import React, { useState, useEffect } from 'react';
import PhotographyImage from "./images/Photography.png";
import Eslogan from "./images/Eslogan.png";
import 'firebase/compat/auth';
import Posts from './Posts';
import AddPost from './AddPost';
import { db, auth, provider } from "../firebase";
import Footer from "./Footer";
import {Regist} from "./formularios/Registro";
import {useModal} from "../Modals/useModal";
import {withModal} from "../Modals/withModal";
import {Inicio} from "./formularios/Inicio";
const Home = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [posts, setposts] = useState([]);
    const [has_modal, toggleModal] = useModal();
    const [has_modal2, toggleModal2] = useModal();
    const RegistFormUseWithModal = withModal(
        Regist,
        {},
        {
            has_modal,
            toggleModal,
        }
    );
    const InicioFormUseWithModal = withModal(
        Inicio,
        {},
        {
            has_modal : has_modal2,
            toggleModal : toggleModal2,
        }
    );
    // Inicio de sesión con Google
    const signInWithGoogle = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                // El inicio de sesión con Google se completó exitosamente
                const user = result.user;
                // Aquí puedes realizar acciones adicionales con el usuario, como guardar su información en tu base de datos

                // Cerrar el modal después de iniciar sesión exitosamente
                toggleModal2(false);
            })
            .catch((error) => {
                // si ocurre un error
                console.log(error);
            });
    };

    const signIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                // Inicio de sesión con correo electrónico y contraseña exitoso

                // Cerrar el modal después de iniciar sesión exitosamente
                toggleModal2(false);
            })
            .catch((error) => alert(error.message));
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
        <>

            <div className="tarjeta">
                <div className={"nav"}>
                <img src={PhotographyImage} alt="Eslogan" width={'200'} height={'200'} />
                {has_modal && (
                    <RegistFormUseWithModal has_modal={has_modal} toggleModal={toggleModal} />
                )}
                {has_modal2 && (
                    <InicioFormUseWithModal has_modal={has_modal2} toggleModal={toggleModal2} />
                )}
                {user ? (
                    <div className={"salir"}>
                        <button className={"button-style"} onClick={() => auth.signOut()}>Salir</button>
                    </div>
                ) : (
                    <div className={"salir"}>
                        <button className={"button-style"} onClick={toggleModal2}>Inicia Sesion</button>
                        <button className={"button-style"} onClick={toggleModal} >Registrate</button>
                        <button className={"button-style"} onClick={signInWithGoogle}>Iniciar sesión con Google</button>
                    </div>
                )}
                </div>
                {user && user.displayName ? (
                    <>
                        <AddPost username={user.displayName} />
                    </>
                ) : (

                        <div className={"inicio__img"}>
                            <div  className={"inicio__styles"}>
                            <img
                                className={"imagen_100"}
                                src={Eslogan}
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
        </>

    );
}

export default Home;
