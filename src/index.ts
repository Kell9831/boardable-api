import {app} from "./app";

const port = 5500;
app.listen(port, ()=> {
    console.log(`escuchando el puerto ${port}`);
})