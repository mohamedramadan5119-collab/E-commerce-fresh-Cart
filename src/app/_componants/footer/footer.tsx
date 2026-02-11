import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 px-4 mt-20 border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary">
            Get The FreshCart App
          </h2>
          <p className="text-gray-500 mt-1">
            We will send you a link, Open it in your phone to download App
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <input
              type="email"
              placeholder="Email .."
              className="flex-grow p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-primary bg-white transition-all"
            />

            <button className="bg-primary text-white px-10 py-2.5 rounded-lg font-medium hover:opacity-90 transition-all">
              Share App Link
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 py-6 border-y border-gray-200">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700">
              Payment Partners
            </span>
            <div className="flex items-center gap-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                alt="Visa"
                className="h-4"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                className="h-5"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                className="h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.png"
                alt="Amex"
                className="h-6"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700">
              Get deliveries with FreshCart
            </span>
            <div className="flex gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="App Store"
                className="h-8 cursor-pointer hover:scale-105 transition-transform"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-8 cursor-pointer hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 FreshCart Ecommerce. All rights reserved.</p>
          <p>
            Designed by{" "}
            <span className="text-primary font-bold">
              Mohamed Ramadan saaed
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
