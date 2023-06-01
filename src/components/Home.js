import React, { useState, useEffect } from 'react';
import PhotographyImage from "./images/Photography.png";
import Eslogan from "./images/Eslogan.png";
import 'firebase/compat/auth';
import Posts from './Posts';
import AddPost from './AddPost';
import { db, auth } from "../firebase";
import Footer from "./Footer";
import {Regist} from "./formularios/Registro";
import {useModal} from "../Modals/useModal";
import {withModal} from "../Modals/withModal";
import {Inicio} from "./formularios/Inicio";
//
// import { useModal } from "../Modals/useModal";
// import { withModal } from "../Modals/withModal";

const Home = () => {
    // const [has_modal, toggleModal] = useModal();
    const [user] = useState(null);
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
                        <button className={"button"} onClick={() => auth.signOut()}>Salir</button>
                    </div>
                ) : (
                    <div className={"salir"}>
                        <button className={"button"} onClick={toggleModal2}>Inicia Sesion</button>
                        <span>&nbsp;</span>
                        <button className={"button"} onClick={toggleModal} >Registrate</button>
                    </div>
                )}
                </div>
                {user && user.displayName ? (
                    <>
                        <AddPost username={user.displayName} />
                    </>

                ) : (

                        <div className={"inicio__img"}>
                            <img src={Eslogan}
                                 alt="Eslogan"
                                 width={'650'}
                                 height={'650'}/>
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
