export default function ServicesPage() {
    const services = [
        {
            title: "Emergency Care",
            description: "24/7 emergency medical services with rapid response and expert care.",
            icon: "🚑",
        },
        {
            title: "Cardiology",
            description: "Advanced heart care and cardiovascular treatments by experienced specialists.",
            icon: "❤️",
        },
        {
            title: "Pediatrics",
            description: "Specialized care for infants, children, and adolescents.",
            icon: "👶",
        },
        {
            title: "Orthopedics",
            description: "Expert treatment for bone, joint, and muscle conditions.",
            icon: "🦴",
        },
        {
            title: "Neurology",
            description: "Comprehensive care for neurological disorders and brain health.",
            icon: "🧠",
        },
        {
            title: "General Surgery",
            description: "Advanced surgical procedures with experienced surgeons.",
            icon: "⚕️",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-4">Our Services</h1>
                    <p className="text-xl text-blue-100">
                        Comprehensive medical care across multiple specialties
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            >
                                <div className="text-6xl mb-4">{service.icon}</div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
