import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Link Opticians
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional eye care services across Zimbabwe. Book your
            appointment online in seconds.
          </p>
          <Link
            href="/book/service"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Book Appointment
          </Link>
        </div>

        {/* Services Preview */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Eye Examinations</h3>
            <p className="text-gray-600">
              Comprehensive eye health and vision assessment by our expert
              opticians.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Contact Lenses</h3>
            <p className="text-gray-600">
              Professional fitting and training for comfortable contact lens
              wear.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">
              Repairs & Adjustments
            </h3>
            <p className="text-gray-600">
              Quick and reliable eyewear repairs and frame adjustments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
