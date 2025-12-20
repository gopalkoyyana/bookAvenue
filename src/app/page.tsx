import SearchForm from "@/components/search/SearchForm";
import { PartyPopper, Landmark, Hotel, Compass, Mail, Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative font-sans selection:bg-brand-blue selection:text-white overflow-hidden bg-black">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px] opacity-40"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col min-h-screen">

        {/* Navbar */}
        <nav className="w-full px-6 py-5 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/30 text-white">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              BookPartyHall
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="px-4 py-2 text-white font-medium text-sm hover:text-blue-300 transition-colors">
              Home
            </a>
            <a href="#contact" className="px-4 py-2 text-white font-medium text-sm hover:text-blue-300 transition-colors">
              Contact
            </a>
            <a href="/add-venue" className="hidden sm:flex px-5 py-2.5 rounded-full bg-white/10 text-white border border-white/10 font-medium text-sm hover:bg-white/20 transition-all backdrop-blur-sm">
              List Your Venue
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 -mt-20">

          <div className="text-center max-w-4xl mx-auto mb-12 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/50 text-blue-200 text-sm font-medium mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              The #1 Platform for Venue Booking
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] pt-4">
              Find the Perfect <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500">
                Venue for Every Moment
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium">
              Discover and book premier party halls, resorts, and convention centers for weddings, birthdays, and corporate events.
            </p>
          </div>

          {/* Search Form Container */}
          <div className="w-full max-w-5xl mb-24 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-100">
            <SearchForm />
          </div>

          {/* Features Grid */}
          <div className="w-full max-w-6xl mx-auto pb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Feature 1 */}
              <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-lg shadow-blue-900/10 hover:shadow-blue-500/20 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors border border-gray-700 group-hover:border-blue-500/30">
                  <Landmark className="w-7 h-7 text-blue-400 group-hover:text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Marriages</h3>
                <p className="text-gray-300 leading-relaxed">Plan your dream wedding with our curated selection of elegant banquet halls and grand mandapams.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-lg shadow-blue-900/10 hover:shadow-blue-500/20 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors border border-gray-700 group-hover:border-blue-500/30">
                  <PartyPopper className="w-7 h-7 text-blue-400 group-hover:text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Celebrations</h3>
                <p className="text-gray-300 leading-relaxed">Celebrate joyfully with vibrant venues perfect for birthday parties, reunions, and social gatherings.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-lg shadow-blue-900/10 hover:shadow-blue-500/20 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors border border-gray-700 group-hover:border-blue-500/30">
                  <Hotel className="w-7 h-7 text-blue-400 group-hover:text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Corporate</h3>
                <p className="text-gray-300 leading-relaxed">Host professional corporate events and retreats at our premium hotels, resorts, and conference centers.</p>
              </div>


            </div>
          </div>

          {/* Contact Section */}
          <div id="contact" className="w-full max-w-6xl mx-auto pb-20">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 border border-gray-700 shadow-2xl shadow-blue-900/20">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
                <p className="text-gray-300 text-lg">Have questions? We'd love to hear from you.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {/* Email */}
                <div className="flex items-center gap-4 bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all group">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email Us</p>
                    <a href="mailto:contact@bookpartyhall.com" className="text-white font-medium hover:text-blue-300 transition-colors">
                      contact@bookpartyhall.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all group">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Call Us</p>
                    <a href="tel:+1234567890" className="text-white font-medium hover:text-blue-300 transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
