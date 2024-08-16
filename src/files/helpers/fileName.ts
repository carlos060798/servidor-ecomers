
export  const fileName=  (req:Express.Request, file:Express.Multer.File, callback:Function )=> {

 
    if (!file) {
        throw new Error('No se ha enviado ningun archivo');
         
      }
    const fileExtension = file.mimetype.split('/')[1]; // se obtiene la extension del archivo
    const  filename = `${Date.now()}.${fileExtension}`; // se genera un nombre de archivo unico


   callback(null, filename);


}