import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";

const packagingFeatures = [
    "A.I.R – Waterproof Standard Packaging Unit",
    "Customized Alternative Safety Delivery Manager",
    "TFR.73 – Automated Standard Transit Trail",
    "Client Specific Technical Packaging Solutions",
    "Premium Compliant Multi-Order Packaging",
    "Reliable Packaging Design & Approval Process",
];

const OrderDelivery = () => {
    return (
        <div>
            {/* Hero banner */}
            <section className="relative bg-[#555] overflow-hidden" style={{ minHeight: "50vh" }}>
                <div className="absolute inset-0 bg-[#444]" />
                <Container className="relative flex items-end pb-10" style={{ minHeight: "50vh" }}>
                    <h1 className="font-heading text-3xl font-light uppercase tracking-widest text-white">
                        Order And Delivery
                    </h1>
                </Container>
            </section>

            {/* Delivery Section */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Delivery info card */}
                        <div className="border border-border p-8">
                            <h2 className="font-heading text-xl font-semibold uppercase tracking-wide mb-4 text-primary">
                                Delivery
                            </h2>
                            <p className="text-sm text-secondary leading-relaxed mb-6">
                                We offer factory-assured delivery of items, which means the items of
                                delivery within receiving delivery which can be able to ship your goods,
                                after we send these items. To safely manage orders, Happy always make
                                to ensure their make-up finish.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    { label: "Containers: usually made within", time: "15 to 30 days" },
                                    { label: "Showroom lead-time:", time: "60 to 75 days" },
                                    { label: "Furniture takes:", time: "45 to 65 days" },
                                ].map((item) => (
                                    <li key={item.label} className="flex items-start gap-2 text-sm text-secondary">
                                        <svg className="w-4 h-4 shrink-0 mt-0.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        <span>
                                            {item.label} <strong className="text-primary">{item.time}</strong>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Delivery image */}
                        <div className="bg-[#ccc] aspect-video" />
                    </div>
                </Container>
            </section>

            {/* Order Section */}
            <section className="py-16 bg-surface">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Order image */}
                        <div className="relative">
                            <div className="bg-[#555] aspect-[4/3]" />
                            <span className="absolute bottom-4 left-4 text-xs text-white/70">
                                There are approximately 500 designs!
                            </span>
                        </div>

                        {/* Order info */}
                        <div>
                            <h2 className="font-heading text-xl font-light uppercase tracking-widest mb-4 text-primary">
                                Order
                            </h2>
                            <p className="text-sm text-secondary leading-relaxed mb-6">
                                Our current and prior product ranges are displayed in our showroom for
                                your reference.
                                <br /><br />
                                Online ready for any of these products are subject to MOQ, which can
                                start MOQ in standard all for other products.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#333] h-32" />
                                <div className="bg-[#333] h-32" />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* OFM Section */}
            <section className="py-16 bg-white">
                <Container>
                    <SectionTitle
                        title="OFM"
                        subtitle="Our experienced and high-profile designers can assist items from product customizations from structure of furniture. Our team members have on real modification running 30 items to produce our choice and made modifications of up to 20 days."
                        align="center"
                        className="mb-10 max-w-3xl mx-auto"
                    />
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-[#333] aspect-video" />
                        <div className="bg-[#333] aspect-video" />
                        <div className="bg-[#333] aspect-video" />
                    </div>
                </Container>
            </section>

            {/* Packaging & Dispatch */}
            <section className="py-16 bg-dark">
                <Container>
                    <SectionTitle
                        title="Packaging And Dispatch"
                        subtitle="We are committed to giving clients international standards and our packaging rigidity disperse presents are often you in international standard exports safety."
                        align="center"
                        light
                        className="mb-10"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {packagingFeatures.map((feature) => (
                            <div
                                key={feature}
                                className="border border-white/20 px-6 py-4 text-sm text-white/80 hover:border-white/50 transition-colors duration-200"
                            >
                                {feature}
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default OrderDelivery;
