import Link from "next/link";
import Button from "@/src/components/ui/Button";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Exceptional Healthcare Services
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Providing compassionate, expert medical care with state-of-the-art facilities
              and a team of dedicated healthcare professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
               <Button
  size="lg"
  className="bg-blue-600 text-white hover:bg-blue-700"
>
  Book Appointment
</Button>
              </Link>
              <Link href="/doctors">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Our Doctors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive medical services delivered by experienced professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Emergency Care",
                description: "24/7 emergency medical services with rapid response",
                icon: "🚑",
              },
              {
                title: "Cardiology",
                description: "Advanced heart care and cardiovascular treatments",
                icon: "❤️",
              },
              {
                title: "Pediatrics",
                description: "Specialized care for infants, children, and adolescents",
                icon: "👶",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Expert Doctors" },
              { number: "10,000+", label: "Patients Served" },
              { number: "25+", label: "Years of Service" },
              { number: "15+", label: "Specialties" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Need Medical Assistance?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Our team is here to help you 24/7. Contact us today.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Contact Us Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
