import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmergencyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Red theme for urgency */}
      <section className="py-16 bg-gradient-to-b from-red-900/30 to-dark-300">
        <div className="mx-auto max-w-7xl px-[5%] text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-red-800 rounded-full">
              <Image
                src="/assets/icons/emergency.svg"
                width={32}
                height={32}
                alt="Emergency"
                className="size-8"
              />
            </div>
            <h1 className="header text-red-500">
              Emergency <span className="text-white">Eye Care</span>
            </h1>
          </div>
          <p className="text-dark-700 text-lg max-w-3xl mx-auto mb-8">
            Immediate action information for eye emergencies and urgent vision problems.
          </p>
        </div>
      </section>

      {/* Emergency Actions */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-[5%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Emergency Contact */}
            <div className="bg-dark-400 border border-red-800/50 rounded-2xl p-8">
              <h2 className="text-24-bold text-red-500 mb-6">Immediate Emergency Contact</h2>
              
              <div className="space-y-6 mb-8">
                <div className="p-6 bg-red-900/20 border border-red-800 rounded-xl">
                  <h3 className="text-18-bold text-white mb-3">24/7 Emergency Line</h3>
                  <p className="text-32-bold text-red-400 mb-2">+263 77 340 7464</p>
                  <p className="text-dark-600">For eye injuries, sudden vision loss, or severe eye pain</p>
                </div>

                <div className="p-6 bg-dark-300 border border-dark-500 rounded-xl">
                  <h3 className="text-18-bold text-white mb-3">Practice Emergency Contact</h3>
                  <p className="text-24-bold text-green-500 mb-2">+263 242 700 000</p>
                  <p className="text-dark-600">During practice hours: 8:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="bg-red-800 hover:bg-red-700 text-white w-full py-6 text-lg" asChild>
                  <Link href="tel:+263773407464">
                    <Image src="/assets/icons/phone.svg" width={24} height={24} alt="Call" className="mr-2" />
                    Call Emergency Line Now
                  </Link>
                </Button>
                
                <Button className="shad-gray-btn w-full py-6 text-lg" asChild>
                  <Link href="/book?type=emergency">
                    Request Emergency Appointment
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right - What Constitutes an Emergency */}
            <div>
              <h2 className="text-24-bold mb-8">When to Seek Immediate Care</h2>
              
              <div className="space-y-6">
                <div className="bg-dark-400 border border-dark-500 rounded-xl p-6">
                  <h3 className="text-18-bold text-red-500 mb-4">🚨 TRUE EYE EMERGENCIES</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 size-2 bg-red-500 rounded-full"></div>
                      <span className="text-white"><strong>Sudden vision loss</strong> or significant vision decrease</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 size-2 bg-red-500 rounded-full"></div>
                      <span className="text-white"><strong>Eye injury</strong> from trauma, chemical exposure, or foreign object</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 size-2 bg-red-500 rounded-full"></div>
                      <span className="text-white"><strong>Severe eye pain</strong> not relieved by over-the-counter medication</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 size-2 bg-red-500 rounded-full"></div>
                      <span className="text-white"><strong>Double vision</strong> that develops suddenly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 size-2 bg-red-500 rounded-full"></div>
                      <span className="text-white"><strong>Flashes of light</strong> or new floaters in vision</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-dark-400 border border-dark-500 rounded-xl p-6">
                  <h3 className="text-18-bold text-yellow-500 mb-4">⚠️ URGENT (SEEK CARE WITHIN 24 HOURS)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 size-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-white">Moderate eye pain or discomfort</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 size-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-white">Red eye with light sensitivity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 size-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-white">Eye discharge or crusting</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 size-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-white">Recent eye surgery complications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Aid Information */}
      <section className="py-16 bg-dark-300">
        <div className="mx-auto max-w-7xl px-[5%]">
          <h2 className="text-24-bold text-center mb-12">Emergency First Aid Steps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-dark-400 border border-dark-500 rounded-xl p-6 text-center">
              <div className="size-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-18-bold mb-3">Chemical Exposure</h3>
              <p className="text-dark-600 text-sm">
                Rinse eye with clean water for 15-20 minutes. DO NOT rub eye. Seek immediate medical attention.
              </p>
            </div>

            <div className="bg-dark-400 border border-dark-500 rounded-xl p-6 text-center">
              <div className="size-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔪</span>
              </div>
              <h3 className="text-18-bold mb-3">Foreign Object</h3>
              <p className="text-dark-600 text-sm">
                DO NOT attempt to remove. Cover eye with rigid protection (paper cup). Seek immediate care.
              </p>
            </div>

            <div className="bg-dark-400 border border-dark-500 rounded-xl p-6 text-center">
              <div className="size-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤕</span>
              </div>
              <h3 className="text-18-bold mb-3">Blunt Trauma</h3>
              <p className="text-dark-600 text-sm">
                Apply cold compress (NO pressure). Keep head elevated. Monitor for vision changes.
              </p>
            </div>

            <div className="bg-dark-400 border border-dark-500 rounded-xl p-6 text-center">
              <div className="size-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🩹</span>
              </div>
              <h3 className="text-18-bold mb-3">Penetrating Injury</h3>
              <p className="text-dark-600 text-sm">
                DO NOT remove object. Stabilize with rigid protection. Go to emergency room immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-[5%]">
          <div className="bg-dark-400 border border-dark-500 rounded-2xl p-12">
            <h2 className="text-24-bold text-center mb-8">What to Expect During Emergency Visit</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-dark-300 rounded-lg flex-shrink-0">
                  <span className="text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-18-bold mb-2">Immediate Triage</h3>
                  <p className="text-dark-600">Our staff will assess urgency and prioritize based on severity.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-dark-300 rounded-lg flex-shrink-0">
                  <span className="text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-18-bold mb-2">Comprehensive Examination</h3>
                  <p className="text-dark-600">Complete eye assessment using diagnostic equipment.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-dark-300 rounded-lg flex-shrink-0">
                  <span className="text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-18-bold mb-2">Immediate Treatment</h3>
                  <p className="text-dark-600">On-site treatment or stabilization as needed.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-dark-300 rounded-lg flex-shrink-0">
                  <span className="text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-18-bold mb-2">Referral if Needed</h3>
                  <p className="text-dark-600">Direct referral to ophthalmologist or hospital if specialized care required.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-dark-500">
              <p className="text-center text-dark-600">
                <strong>Important:</strong> For life-threatening emergencies, proceed directly to the nearest hospital emergency department.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-8 bg-red-900/20 border-y border-red-800">
        <div className="mx-auto max-w-7xl px-[5%]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-800 rounded-full">
                <Image
                  src="/assets/icons/emergency.svg"
                  width={24}
                  height={24}
                  alt="Emergency"
                  className="size-6"
                />
              </div>
              <div>
                <h3 className="text-18-bold text-white">Need Immediate Assistance?</h3>
                <p className="text-dark-600">Don&apos;t hesitate to call for emergency eye care.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-red-800 hover:bg-red-700 text-white px-8 py-6" asChild>
                <Link href="tel:+263773407464">
                  Emergency Call: +263 77 340 7464
                </Link>
              </Button>
              <Button className="shad-gray-btn px-8 py-6" asChild>
                <Link href="/contact">
                  View All Contact Options
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}