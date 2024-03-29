import {useState, useEffect} from 'react'
import Error from './Error'

const Formulario = ({pacientes, setPacientes,paciente,setPaciente}) => {
    const [nombre,setNombre]=useState('')
    const [propietario,setPropietario]=useState('')
    const [email,setEmail]=useState('')
    const [fecha,setFecha]=useState('')
    const [sintomas,setSintomas]=useState('')

    const [error,setError]=useState(false)

    useEffect(() =>{
        if(Object.keys(pacientes).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }

        },[paciente])

    const generaId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);
        return fecha + random;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validacion
        if([nombre,propietario,email,fecha,sintomas].includes('')){
            setError(true)
            return
        }

        setError(false);

        //Objeto de Paciente
        const objetoPaciente={
            nombre,
            propietario,
            email,
            fecha,
            sintomas
            };

        if (paciente.id){
            //Editando
            objetoPaciente.id=paciente.id;
            const pacienteActualizados = pacientes.map( pacienteState => 
                pacienteState.id === paciente.id ? objetoPaciente : pacienteState
            )
            setPacientes(pacienteActualizados);
            setPaciente({});
        }else{
            //Nuevo registro
            objetoPaciente.id=generaId();
            setPacientes([...pacientes, objetoPaciente]);
        }
            
        

        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
    }



    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5" >
            <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Paciente y {" "}
                <span className="text-indigo-600 font-bold text-lg"> Administralos </span>
            </p>

            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                
                {error &&   <Error><p>Todos los campos son obligatorio</p></Error> 
                            
                    
                    
                }
                <div className="mb-5">

                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre de Mascota</label>
                    <input className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        value={nombre}
                        onChange={ (e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre de Propietario</label>
                    <input className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
                        id="propietario"
                        type="text"
                        placeholder="Nombre de Propietario"
                        value={propietario}
                        onChange={ (e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                    <input className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
                        id="email"
                        type="email"
                        placeholder="Email Contacto Propietario"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
                    <input className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
                        id="alta"
                        type="date"
                        value={fecha}
                        onChange={ (e) => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>
                    <textarea
                        className="border-2 w-full p-2 mt-2 placeholder-grey-400 rounded-md"
                        id="sintomas"
                        placeholder="Describe los síntomas"
                        value={sintomas}
                        onChange={ (e) => setSintomas(e.target.value)}
                    />
                </div>

                
                <input className="bg-indigo-600 w-full p-3 text-white uppercase font-bold
                    hover:bg-indigo-700 cursor-pointer transition-all"
                    type="submit"
                    value={paciente.id ? "Editar paciente" : "Agregar paciente" }
                />
                




            </form>



        </div>
    )
}

export default Formulario
