export const useAudio = () => {

    const reproducirSonido = (ruta) => {
        const audio = new Audio(ruta);
        audio.play();
    };

    return { reproducirSonido };
};
