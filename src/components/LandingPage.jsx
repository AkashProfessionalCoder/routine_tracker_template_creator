import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckSquare, BarChart3, Settings, ArrowRight, Sparkles } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

const LandingPage = () => {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden relative">
            {/* Particle Background */}
            <ParticleBackground />

            {/* Parallax Background Elements */}
            <div
                className="absolute inset-0 opacity-20"
                style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            >
                <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-40 right-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
                {/* Hero Section */}
                <div
                    className="text-center max-w-4xl mx-auto"
                    style={{ transform: `translateY(${scrollY * 0.2}px)` }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-8 border border-gray-200">
                        <Sparkles size={16} className="text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">Built with Antigravity AI</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        Routine Tracker
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Template Creator
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Track your daily habits, visualize your progress, and build better routines with a customizable tracker designed just for you.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mb-12">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">17+</div>
                            <div className="text-sm text-gray-600">Default Habits</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">∞</div>
                            <div className="text-sm text-gray-600">Custom Items</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-pink-600">~2.5h</div>
                            <div className="text-sm text-gray-600">Total Dev Time</div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={() => navigate('/tracker')}
                        className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                    >
                        Get Started
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Features Grid */}
                <div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-20"
                    style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                >
                    {[
                        {
                            icon: Calendar,
                            title: 'Monthly Tracking',
                            description: 'Track your habits across the entire month with an intuitive table view',
                            color: 'blue'
                        },
                        {
                            icon: CheckSquare,
                            title: 'Custom Habits',
                            description: 'Add, edit, and organize your own routine items with drag-and-drop',
                            color: 'purple'
                        },
                        {
                            icon: BarChart3,
                            title: 'Progress Graphs',
                            description: 'Visualize your daily completion with beautiful charts and statistics',
                            color: 'pink'
                        },
                        {
                            icon: Settings,
                            title: 'PDF Export',
                            description: 'Export your monthly reports as professional PDFs with one click',
                            color: 'indigo'
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                                <feature.icon className={`text-${feature.color}-600`} size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-20 text-center text-gray-500 text-sm">
                    <p>Made with ❤️ by Antigravity AI</p>
                    <p className="mt-2">© 2025 Routine Tracker Template Creator</p>
                </div>
            </div>

            {/* CSS for animations */}
            <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
};

export default LandingPage;
