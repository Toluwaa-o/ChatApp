export default function checkAuthMode({isSignIn, signin, signup}){
    if(isSignIn) return signin
    else return signup
}