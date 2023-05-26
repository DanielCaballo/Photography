import  React  from "react";
import {  useState ,useEffect}  from "react";
import {Button, makeStyles, Modal,Input} from "@material-ui/core";
import { db, auth } from "../firebase";
import 'firebase/compat/auth';
// import Posts from './Posts';
// import AddPost from './AddPost';
// import { Edit } from '@material-ui/icons';


//Estilo del pop up
function getModalStyle(){
    return{
        // top:'50%',
        // left:'50%',
        // transform: 'translate(-50%,-50%',
    };
}

const useStyles = makeStyles((theme) => ({
    paper:{
        // position:"absolute",
        // width:"400px",
        backgroundColor:"red",
        border:"2px solid #000",
        boxShadow: theme.shadows[5],
        padding:theme.spacing(2,4,3),
    },
}));
const Home =() =>{
    const classes= useStyles()
    const [modalStyle] = useState(getModalStyle)

    const [openEntrar, setOpenEntrar] = useState(false)
    const [openRegistrate, setopenRegistrate] = useState(false)

    const [username,setuserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [user,setuser] = useState(null)

    const registrarse =(e)=>{

        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                });
            })
            .catch((e) => alert(e.message));

        setOpenEntrar(false);
    }
    const entrar =(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .catch((e) => alert(e.message));

        setopenRegistrate(false);
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setuser(authUser);
            } else {
                setuser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [user, username]);

    return (
        <div className={'app'}>
            <Modal open={openEntrar} onClose={() => {setopenRegistrate(false)}}>
                <div style={modalStyle} className={""}>
                    <form action="">
                      <center>
                          <img className={'app__headerImage'}
                               src='https://w7.pngwing.com/pngs/973/11/png-transparent-logo-phoenix-illustration-phoenix-logo-design-phoenix-illustration-free-logo-design-template-photography-orange.png'
                               alt="logo"
                               width={'100'}
                               height={'100'}
                          />
                      </center>
                        <Input type="text"
                               value={username}
                               onChange={(e)=> {setuserName((e.target.value))}}
                               placeholder={"Nombre"}/>
                        <br/>
                        <Input type="text"
                               value={password}
                               onChange={(e)=> {setPassword((e.target.value))}}
                               placeholder={"Contraseña"}/>
                        <Button type='submit' onClick={setOpenEntrar}>Entrar</Button>
                    </form>
                </div>
            </Modal>

            <Modal open={openRegistrate} onClose={() => {setopenRegistrate(false)}}>
                <div style={modalStyle} className={""}>
                    <form action="">
                      <center>
                          <img className={'app__headerImage'}
                               src='https://w7.pngwing.com/pngs/973/11/png-transparent-logo-phoenix-illustration-phoenix-logo-design-phoenix-illustration-free-logo-design-template-photography-orange.png'
                               alt="logo"
                               width={'100'}
                               height={'100'}
                          />
                      </center>
                        <Input type="text"
                               value={username}
                               onChange={(e)=> {setuserName((e.target.value))}}
                               placeholder={"Nombre"}/>
                        <br/>
                        <Input type="text"
                               value={email}
                               onChange={(e)=> {setEmail((e.target.value))}}
                               placeholder={"Email"}/>
                        <br/>
                        <Input type="text"
                               value={password}
                               onChange={(e)=> {setPassword((e.target.value))}}
                               placeholder={"Contraseña"}/>
                        <Button type='submit' onClick={setopenRegistrate}>Registrarte</Button>
                    </form>
                </div>
            </Modal>

            <div className={'app__header'}>
                <img className={'app__headerImage'}
                     src='https://w7.pngwing.com/pngs/973/11/png-transparent-logo-phoenix-illustration-phoenix-logo-design-phoenix-illustration-free-logo-design-template-photography-orange.png'
                     alt="logo"
                     width={'100'}
                     height={'100'}
                />
            </div>



            <div>
                {user ? (
                    <Button variant="contained" color='primary' onClick={() => auth.signOut()}>Salir</Button>
                ) : (
                    <div>
                        <Button variant="contained" color='primary' disableElevation onClick={() => setOpenEntrar(true)}>Loguearte</Button>
                        <span>&nbsp;</span>
                        <Button variant="contained" color='primary' disableElevation onClick={() => setopenRegistrate(true)}>Registrate</Button>
                    </div>
                )}
                 </div>
        </div>
    );
}

export {Home};