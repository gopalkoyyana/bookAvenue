import SearchForm from "@/components/search/SearchForm";
import { PartyPopper, Landmark, Hotel, Compass } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image Layer */}
      <img
        src="/party-venues-linear.png"
        alt="Luxury Venue Background"
        className="absolute inset-0 w-full h-full object-fill z-0"
      />

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Main Content */}
          <div className="flex flex-col items-center justify-center pt-20 pb-10">
            {/* Search Form */}
            <div className="w-full mb-16 px-4">
              <SearchForm />
            </div>

            {/* Features */}
            <div className="w-full max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Feature 1 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                      <div className="w-6 h-6 text-red-500 font-bold flex items-center justify-center text-xl">💍</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Marriages</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">Plan your dream wedding with our curated selection of elegant banquet halls and grand mandapams.</p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors">
                      <div className="w-6 h-6 text-orange-500 font-bold flex items-center justify-center text-xl">🎂</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Birthdays & Events</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">Celebrate joyfully with vibrant venues perfect for birthday parties, reunions, and social gatherings.</p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                      <div className="w-6 h-6 text-blue-500 font-bold flex items-center justify-center text-xl">🏢</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Meetings & Resorts</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">Host professional corporate events and retreats at our premium hotels, resorts, and conference centers.</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
