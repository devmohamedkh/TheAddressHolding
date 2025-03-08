import Image from 'next/image';
import LogInForm from './LoginForm';


const SignIn: React.FC = () => {
    return (
        <div className="flex h-screen w-full">
            <div className="flex w-full md:w-1/2 items-center justify-center  md:px-4">
                <LogInForm />
            </div>

            <div className="hidden md:block md:w-1/2 relative">
                <Image src={'/bg.jpg'} alt="Background" fill className="object-cover" />
            </div>
        </div>
    );
};

export default SignIn;
