import { ReactTyped } from 'react-typed';

const Hero = () => {
    return (
        <div className="max-w-[960px] w-full h-[80vh] mx-auto text-center flex flex-col justify-center px-4">
            <p className="text-sky-500 dark:text-sky-400 font-bold p-2 uppercase">
                Aprende con nosotros
            </p>
            <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold my-6">
                Domina las tecnologías clave para tu carrera.
            </h1>
            <div className="flex justify-center items-center gap-x-2 flex-col md:flex-row">
                <p className="md:text-5xl sm:text-4xl text-xl font-bold">
                    Aprende:
                </p>
                <ReactTyped
                    className="md:text-5xl sm:text-4xl text-xl font-bold"
                    strings={[
                        'Linux',
                        'DevOps',
                        'Contenedores',
                        'Microservicios',
                    ]}
                    typeSpeed={100}
                    backSpeed={80}
                    loop
                />
            </div>
            <p className="md:text-2xl text-xl font-bold text-gray-500 dark:text-gray-400 mt-4">
                Aprende con ejemplos prácticos y guías claras para dominar
                Kubernetes y más.
            </p>
            <button className="bg-sky-500 dark:bg-sky-600 w-[250px] rounded-md font-medium my-6 mx-auto py-3 text-black dark:text-white">
                ¡Comenzar con Kubernetes!
            </button>
        </div>
    );
};

export default Hero;
