import { React, useState}  from "react";
import {Button, makeStyles, Modal} from "@material-ui/core";


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
    const [modalStyle] = useStyles(getModalStyle)

    const [openEntrar, setOpenEntrar] = useState(false)
    const [openRegistrate, setopenRegistrate] = useState(false)

    return (
        <div className={'app'}>

            <Modal>
                <div>
                    <form action="">

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
                <Button variant={'contained'} color='primary'>Registrate</Button>
            </div>
        </div>
    );
}

export {Home};