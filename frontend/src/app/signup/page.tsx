
import Image from 'next/image';
import SignupForm from './SignUpForm';

const Signup: React.FC = () => {

    return (
        <div className="flex h-screen w-full">
            {/* Left Side - Login Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center  md:px-4">
                <SignupForm />
            </div>

            {/* Right Side - Background Image */}
            <div className="hidden md:block md:w-1/2 relative">
                <Image src={'/bg.jpg'} alt="Background" fill className="object-cover" />
            </div>
        </div>
    );
};

export default Signup;
