// FUNCION PARA VALIDAR QUE EL ARCHIVO SEA UNA IMAGEN
export const fileFilter = (req:Request, file:Express.Multer.File, callback:Function )=> {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Solo se permiten imagenes'));
    }
    callback(null, true);
}