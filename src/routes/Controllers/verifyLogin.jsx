function VerifyLogin() {
    const usuario = localStorage.getItem('usuario');
    if(usuario === null){
        window.location.href = '/login';
    }
}

export default VerifyLogin;
