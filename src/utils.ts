// Agreed for <700px for mobile
export const checkIfIsMobile = () => {
    const vw: number = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    return (vw < 700);
}
