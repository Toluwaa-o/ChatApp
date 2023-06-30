import AuthInputs from "../components/AuthInputs";

export const metadata = {
  title: 'Sign Up - ChatApp'
}

const Signup = () => {
  return <AuthInputs isSignIn={false} />;
};
export default Signup;