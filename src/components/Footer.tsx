import React from 'react';

export default function Header(){
    return (
        <footer className="bg-black border-t border-gray-700 px-6 py-8">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
                <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition">About</a></li>
                        <li><a href="#" className="hover:text-white transition">For the Record</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-4">Communities</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition">For Artists</a></li>
                        <li><a href="#" className="hover:text-white transition">Advertising</a></li>
                        <li><a href="#" className="hover:text-white transition">Investors</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-4">Useful links</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Support</a></li>
                        <li><a href="#" className="hover:text-white transition">Popular by Country</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-4">Wave Plans</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Artists</a></li>
                        <li><a href="#" className="hover:text-white transition">Artists Pro</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-4">Go Mobile</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="flex items-center">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png"
                                alt="Google Play" className="h-8"/>
                        </a>
                        <a href="#" className="flex items-center">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
                                alt="App Store" className="h-8"/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-6 text-center text-xs text-gray-500">
                <p>Legal • Cookies • About Ads • Accessibility • Safety & Privacy Center • Privacy Policy</p>
                <p className="mt-2">© 2025 All rights reserved.</p>
            </div>
        </footer>
    );
}