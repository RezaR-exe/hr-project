function LoginPage() {
return (
<div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-200">
    <div className="flex items-center justify-center bg-white p-8 rounded-lg shadow-lg w-96">
        <form className="w-full">
            <div className="flex flex-col space-y-4">
                <h1 className="text-2xl font-bold mb-4">Login Page</h1>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email" type="email" placeholder="Enter your email" required />
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="Enter your Password" required />
            </div>
            <div className="flex items-center justify-between mt-6 flex-col space-y-4">
                <div className="flex items-center">
                    <input type="checkbox" id="remember" className="mr-2 leading-tight" />
                    <label htmlFor="remember" className="text-sm text-gray-700">
                        Remember Me
                    </label>
                </div>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    type="submit">
                    Login
                </button>
            </div>
        </form>
    </div>
</div>
)
}

export default LoginPage;