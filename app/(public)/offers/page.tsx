// app/(public)/offers/page.tsx
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CURRENT_PROMOTIONS, UPCOMING_PROMOTIONS, PROMOTION_CATEGORIES, isPromotionValid } from "@/constants/offers";

export default function OffersPage() {
  const validPromotions = CURRENT_PROMOTIONS.filter(isPromotionValid);
  const featuredPromotions = validPromotions.filter(promo => promo.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-purple-900/30 to-dark-300">
        <div className="mx-auto max-w-7xl px-[5%] text-center">
          <h1 className="header mb-6">
            Special <span className="text-purple-500">Offers</span> & Promotions
          </h1>
          <p className="text-dark-700 text-lg max-w-3xl mx-auto mb-8">
            Exclusive eye care promotions and seasonal offers from Link Opticians. 
            Save on eye examinations, eyewear, and specialized services.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="shad-primary-btn" asChild>
              <Link href="#current-offers">
                View Current Offers
              </Link>
            </Button>
            <Button className="shad-gray-btn" asChild>
              <Link href="/book?promo=true">
                Book with Promotion
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Promotions */}
      {featuredPromotions.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-[5%]">
            <h2 className="sub-header text-center mb-12">Featured Offers</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPromotions.map((promo) => (
                <div 
                  key={promo.id}
                  className="relative rounded-2xl overflow-hidden border border-dark-500"
                  style={{ 
                    backgroundColor: promo.backgroundColor || '#1F2937',
                    color: promo.textColor || '#FFFFFF'
                  }}
                >
                  {/* Promo Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Image Side */}
                    <div className="h-64 md:h-auto relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 z-5"></div>
                      <Image
                        src={promo.image}
                        alt={promo.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Content Side */}
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl">🎯</span>
                          <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                            {promo.duration}
                          </span>
                        </div>
                        
                        <h3 className="text-24-bold mb-3">{promo.title}</h3>
                        <p className="mb-6 opacity-90">{promo.description}</p>
                        
                        {promo.discount && (
                          <div className="mb-6">
                            <p className="text-18-bold mb-2">Discount:</p>
                            <p className="text-32-bold">{promo.discount}</p>
                          </div>
                        )}
                        
                        <div className="mb-6">
                          <p className="text-sm font-medium mb-2">Conditions:</p>
                          <ul className="space-y-1 text-sm">
                            {promo.conditions.slice(0, 3).map((condition, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{condition}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Valid until: {promo.validUntil}</span>
                          {promo.bookingCode && (
                            <span className="font-mono font-bold">Code: {promo.bookingCode}</span>
                          )}
                        </div>
                        
                        <div className="flex gap-3">
                          <Button 
                            className="flex-1 bg-white hover:bg-gray-100 text-gray-900" 
                            asChild
                          >
                            <Link href={`/book?promo=${promo.bookingCode}`}>
                              Book Now
                            </Link>
                          </Button>
                          <Button 
                            className="flex-1 border-2 border-white hover:bg-white/20" 
                            variant="outline"
                            asChild
                          >
                            <Link href={`/offers/${promo.id}`}>
                              Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Current Offers */}
      <section id="current-offers" className="py-16 bg-dark-300">
        <div className="mx-auto max-w-7xl px-[5%]">
          <h2 className="sub-header text-center mb-12">Current Promotions</h2>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {PROMOTION_CATEGORIES.map((category) => (
              <button
                key={category.id}
                className="flex items-center gap-2 px-6 py-3 bg-dark-400 hover:bg-dark-500 border border-dark-500 rounded-full transition"
              >
                <span>{category.icon}</span>
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </div>
          
          {/* Promotions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {validPromotions.map((promo) => (
              <div 
                key={promo.id}
                className="bg-dark-400 border border-dark-500 rounded-xl overflow-hidden h-full flex flex-col"
              >
                {/* Promo Header */}
                <div 
                  className="h-48 relative"
                  style={{ backgroundColor: promo.backgroundColor || '#3B82F6' }}
                >
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                      {promo.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-18-bold text-white">{promo.title}</h3>
                  </div>
                </div>
                
                {/* Promo Content */}
                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-dark-600">{promo.duration}</span>
                    {promo.discount && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-semibold">
                        {promo.discount}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-dark-600 mb-6">{promo.description}</p>
                  
                  <div className="mb-6">
                    <p className="text-sm font-medium text-dark-700 mb-2">Available at:</p>
                    <div className="flex flex-wrap gap-2">
                      {promo.branchSpecific?.map((branch, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-dark-300 rounded text-xs"
                        >
                          {branch}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {promo.conditions.slice(0, 2).map((condition, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="mt-1 size-1.5 bg-dark-600 rounded-full"></span>
                        <span className="text-dark-600">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Promo Footer */}
                <div className="p-6 pt-0">
                  <div className="flex gap-3">
                    <Button className="shad-primary-btn flex-1" size="sm" asChild>
                      <Link href={`/book?promo=${promo.bookingCode}`}>
                        Use Offer
                      </Link>
                    </Button>
                    <Button className="shad-gray-btn flex-1" size="sm" asChild>
                      <Link href={`/offers/${promo.id}`}>
                        Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Promotions */}
      {UPCOMING_PROMOTIONS.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-[5%]">
            <h2 className="sub-header text-center mb-12">Upcoming Promotions</h2>
            
            <div className="bg-dark-400 border border-dark-500 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {UPCOMING_PROMOTIONS.map((promo) => (
                  <div key={promo.id} className="bg-dark-300 border border-dark-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <span className="text-lg">📅</span>
                      </div>
                      <div>
                        <h3 className="text-18-bold">{promo.title}</h3>
                        <p className="text-sm text-dark-600">{promo.duration}</p>
                      </div>
                    </div>
                    
                    <p className="text-dark-600 mb-4">{promo.description}</p>
                    
                    {promo.discount && (
                      <div className="p-3 bg-dark-400 rounded-lg mb-4">
                        <p className="text-sm font-medium text-dark-700">Offer:</p>
                        <p className="text-green-500 font-semibold">{promo.discount}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-dark-600">Starts soon</span>
                      <Button className="shad-gray-btn" size="sm" asChild>
                        <Link href={`/offers/${promo.id}`}>
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-[5%] text-center">
          <div className="bg-dark-400 border border-dark-500 rounded-2xl p-12">
            <h2 className="sub-header mb-6">How to Use Our Promotions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="size-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">1</span>
                </div>
                <h3 className="text-18-bold mb-2">Choose Offer</h3>
                <p className="text-dark-600">Select a promotion that suits your needs</p>
              </div>
              
              <div className="text-center">
                <div className="size-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">2</span>
                </div>
                <h3 className="text-18-bold mb-2">Book Appointment</h3>
                <p className="text-dark-600">Mention promotion code when booking</p>
              </div>
              
              <div className="text-center">
                <div className="size-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">3</span>
                </div>
                <h3 className="text-18-bold mb-2">Enjoy Benefits</h3>
                <p className="text-dark-600">Receive discounted services at appointment</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-dark-300 rounded-lg">
                <p className="text-sm text-dark-600">
                  <strong>Note:</strong> Most promotions require a consultation. Medical aid claims may affect discount applicability.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="shad-primary-btn px-8 py-6 text-lg" asChild>
                  <Link href="/book?promo=SPECIAL">
                    Book with Promotion
                  </Link>
                </Button>
                <Button className="shad-gray-btn px-8 py-6 text-lg" asChild>
                  <Link href="/contact?subject=promotion">
                    Ask About Promotions
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}