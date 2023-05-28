import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";

import 'firebase/compat/auth';
import Posts from './Posts';
import AddPost from './AddPost';
import {db, auth, provider } from "../firebase";


function getModalStyle() {
    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Home = () => {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = useState(false);
    const [openSignin, setOpensignin] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, setUser] = useState(null);

    const [posts, setposts] = useState([]);

    //Inicio de sesion con google
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
        <div className="app">
            <Modal open={open} onClose={() => setOpen(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center>
                            <img
                                className="app__headerImage"
                                src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
                                alt=""
                                width={'180'}
                                height={'60'}
                            />
                        </center>
                        <br></br>
                        <Input
                            placeholder="Nombre de Usuario"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br></br>
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br></br>
                        <Input
                            placeholder="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br></br>
                        <Button type="submit" onClick={signUp}>
                            Registrarse
                        </Button>
                    </form>
                </div>
            </Modal>

            <Modal open={openSignin} onClose={() => setOpensignin(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center>
                            <img
                                className="app__headerImage"
                                src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
                                alt=""
                                width={'180'}
                                height={'60'}
                            />
                        </center>
                        <br></br>
                        <Input
                            placeholder="email?"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br></br>
                        <Input
                            placeholder="Contraseña?"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br></br>
                        <Button type="submit" onClick={signIn}>
                            Entrar
                        </Button>

                        <Button onClick={signInWithGoogle}>Iniciar sesión con Google</Button>

                    </form>
                </div>
            </Modal>

            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
                    alt=""
                    width={'180'}
                    height={'60'}
                />
                {user ? (
                    <Button variant="contained" color='primary' onClick={() => auth.signOut()}>Salir</Button>
                ) : (
                    <div>
                        <Button variant="contained" color='primary' disableElevation onClick={() => setOpensignin(true)}>Inicia Sesion</Button>
                        <span>&nbsp;</span>
                        <Button variant="contained" color='primary' disableElevation onClick={() => setOpen(true)}>Registrate</Button>
                    </div>
                )}
            </div>


            {user && user.displayName ? (
                <>
                    <AddPost username={user.displayName} />
                </>
            ) : (
                <div className='unauth'>
                    Inicia sesión <b onClick={() => setOpensignin(true)} style={{ cursor: 'pointer', color: 'Red' }}>aquí</b> o <b onClick={() => setOpen(true)} style={{ cursor: 'pointer', color: 'Blue' }}>regístrate</b> para poder añadir o comentar fotos.
                </div>
            )}

            <div className="app__posts">
                <div className="app__postright">
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
        </div>
    )
}

export default Home