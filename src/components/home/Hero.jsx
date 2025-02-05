import { ReactTyped } from 'react-typed';

const Hero = () => {
    return (
        <div className="max-w-[960px] w-full h-[80vh] md:h-[90vh] mx-auto text-center flex flex-col justify-center px-4 mt-5 md:mt-0">
            <ReactTyped
                strings={['Aprende con nosotros']}
                typeSpeed={80}
                backSpeed={80}
                loop={false}
                className="text-xl text-primary dark:text-dark-secondary font-bold p-2 uppercase h-[48px]"
            />
            <h1 className="md:text-7xl sm:text-6xl text-4xl font-semibold my-6 text-fourth dark:text-dark-secondary uppercase">
                Domina las tecnologías clave para tu carrera
            </h1>

            <p className="md:text-2xl text-xl font-bold text-five dark:text-gray-400 mt-4 hidden md:block">
                Aprende con ejemplos prácticos y guías claras para dominar
                Linux, Kubernetes y más.
            </p>
            <a
                href="/linux/fundamentals"
                className="bg-third/90 text-secondary hover:bg-third dark:bg-dark-fourth dark:hover:bg-dark-fourth/90 transition duration-300 ease-in-out w-[250px] rounded-md font-bold my-6 mx-auto py-3 mt-10"
            >
                ¡Comenzar con Linux!
            </a>
        </div>
    );
};

export default Hero;
