import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getServices() {
  return await prisma.service.findMany({
    where: { isActive: true },
  });
}

export default async function ServiceSelection() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Select a Service
          </h1>
          <p className="text-lg text-gray-600">
            Choose the service you need from our professional optician services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(
            (service: {
              id: string;
              name: string;
              description: string | null;
              duration: number;
              price: number | null;
              isActive: boolean;
            }) => (
              <Link
                key={service.id}
                href={`/book/branch?serviceId=${service.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {service.duration} min
                  </span>
                  <span className="text-lg font-semibold text-blue-600">
                    ${service.price}
                  </span>
                </div>
              </Link>
            )
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
