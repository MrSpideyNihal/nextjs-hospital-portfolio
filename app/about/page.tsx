export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-xl text-blue-100">
                        Excellence in healthcare since 1995
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Mission */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            To provide exceptional healthcare services with compassion, excellence,
                            and innovation. We are committed to improving the health and well-being
                            of our community through quality medical care and patient-centered service.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Vision</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            To be the leading healthcare provider in the region, recognized for
                            clinical excellence, innovative treatments, and outstanding patient care.
                        </p>
                    </div>

                    {/* History */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Our History</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Established in 1995, our hospital has been serving the community for over
                            25 years. We have grown from a small clinic to a comprehensive medical
                            center with state-of-the-art facilities and a team of expert healthcare
                            professionals.
                        </p>
                    </div>

                    {/* Facilities */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Facilities</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-4">
                            Our modern medical center features:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 text-lg space-y-2">
                            <li>Advanced diagnostic imaging equipment</li>
                            <li>Modern operating theaters</li>
                            <li>24/7 emergency department</li>
                            <li>Intensive care units</li>
                            <li>Comfortable patient rooms</li>
                            <li>On-site pharmacy and laboratory</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
