import Link from "next/link";

const Home = () => {
    return (
        <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center" style={{backgroundImage: `url("/images/home3.png")`}}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 items-center">
                <div className="col-span-6 text-center">
                    <span className="uppercase text-white text-5xl font-bold mb-4 block" style={{ marginTop: '0.5rem' }}>WELCOME TO LMS</span>
                    <p className="text-xl text-gray-300 mt-6 max-w-lg">
                        Start studying from home. Arrange your space, tools, and
                        mindset. As experts in the field, we advocate providing
                        student-focused support, even when we have a lot of
                        work.
                    </p>
                    <div className="mt-12 flex gap-8">
                        <Link href={'/auth/login'}
                            className="text-white uppercase py-3 px-8 text-base font-semibold border border-white rounded-full bg-blue-700 hover:bg-blue-800 transition duration-300"
                        >
                            Login
                        </Link>
                        <Link href={'/auth/register'}
                            className="text-blue-700 uppercase py-3 px-8 text-base font-semibold border border-blue-700 rounded-full bg-white hover:bg-gray-100 transition duration-300"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
