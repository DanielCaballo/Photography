import { React, useState}  from "react";
import {Button, makeStyles, Modal,Input} from "@material-ui/core";


//Estilo del pop up
function getModalStyle(){
    return{
        top:'50%',
        left:'50%',
        transform: 'translate(-50%,-50%',
    };
}

const useStyles = makeStyles((theme) => ({
    paper:{
        position:"absolute",
        width:"400px",
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
    return (
        <div className={'app'}>
            <Modal open={openEntrar} onClose={()=>{setOpenEntrar(false)}}></Modal>
            <Modal open={openEntrar} onClose={() => {openRegistrate(false)}}>
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
                        <Button type='submit' onClick={setOpenEntrar}>Entrar</Button>
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
                <Button variant={'contained'} color='primary'>Entrar</Button>
                <br/> <br/>
                <Button variant={'contained'} color='primary' onClick={()=>setopenRegistrate(true)}>Registrate</Button>
            </div>
        </div>
    );
}

export {Home};