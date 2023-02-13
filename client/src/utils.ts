const a: string = 'Hello function!';

const setTaskColorState = (time: number): string => {
    return time < 1 ? 'red' : 'white';
}
export default setTaskColorState;
