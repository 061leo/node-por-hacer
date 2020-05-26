const fs=require('fs');
//arreglo
let listadoPorHacer=[];

const guardarDB=()=>{
	let data=JSON.stringify(listadoPorHacer);

	fs.writeFile('db/data.json',data,(err)=>{
		if(err) throw new Error('No se pudo grabar', err);
	});
}

const cargaDB=()=>{
	try{
		listadoPorHacer=require('../db/data.json');
	}catch(err){
		listadoPorHacer=[];

	}
	

}

const crear=(descripcion)=>{
	cargaDB();
	let porHacer={
		descripcion,
		completado:false
	};
//al arreglo le enviamos el objeto con el metodo push
	listadoPorHacer.push(porHacer);
	guardarDB();
	
	return porHacer;

}

const getListado=()=>{
	cargaDB();
	return listadoPorHacer;
}



const actualizar=(descripcion,completado=true)=>{
	cargaDB();
	let index=listadoPorHacer.findIndex(tarea=> tarea.descripcion===descripcion);
	if(index>=0){
		listadoPorHacer[index].completado=completado;
		guardarDB();
	}else{
		return false;
	}

}
const borrar=(descripcion)=>{
	cargaDB();
	let nuevoListado=listadoPorHacer.filter(tarea=> tarea.descripcion!==descripcion);
	if(listadoPorHacer.length===nuevoListado.length){
		return false;
		

	}else{
		listadoPorHacer=nuevoListado;
		guardarDB();
		return true;
	}


}


module.exports={
	crear,
	getListado,
	actualizar,
	borrar
}