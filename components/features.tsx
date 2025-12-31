import { Car, Package, Compass, ArrowRight } from "lucide-react"
import { ServiceModal } from "./service-modal"

const services = [
  {
    title: "The Mobility App",
    description: "Our all-in-one platform for secure package delivery, real-time tracking, and vehicle management.",
    icon: Car,
    color: "from-brand-green to-emerald-500",
    image: "/mobility-app.jpg",
    modalContent: {
      description: "Experience the future of urban mobility with CarConnect's comprehensive mobility app. Designed specifically for Rwanda's growing transportation needs, our platform seamlessly connects drivers, vehicle owners, and customers.",
      features: [
        "Real-time GPS tracking for all deliveries",
        "Secure payment processing",
        "Driver and vehicle verification system",
        "Multi-language support (English, Kinyarwanda, French)",
        "Emergency assistance features",
        "Route optimization for efficiency"
      ],
      benefits: [
        "Increased safety for all users",
        "Transparent pricing and tracking",
        "Reduced delivery times",
        "Better income opportunities for drivers",
        "Environmental impact through optimized routes"
      ]
    }
  },
  {
    title: "Delivery & Tracking",
    description: "End-to-end transparency for logistics with real-time tracking for senders and drivers alike.",
    icon: Package,
    color: "from-brand-blue to-cyan-500",
    image: "/delivery-tracking.jpg",
    modalContent: {
      description: "Our advanced delivery and tracking system provides complete visibility throughout the entire logistics chain. From pickup to final delivery, every step is monitored and communicated in real-time.",
      features: [
        "Live GPS tracking with ETA updates",
        "Automated delivery notifications",
        "Proof of delivery with signatures",
        "Package condition monitoring",
        "Customer communication portal",
        "Delivery scheduling and rescheduling"
      ],
      benefits: [
        "Complete peace of mind for senders",
        "Improved customer satisfaction",
        "Reduced lost or damaged packages",
        "Better inventory management",
        "Enhanced customer service capabilities"
      ]
    }
  },
  {
    title: "Enterprise Solutions",
    description: "Digital tools for fleet management and mobility innovation in urban transportation.",
    icon: Compass,
    color: "from-brand-green to-brand-blue",
    image: "/enterprise-solutions.jpg",
    modalContent: {
      description: "Transform your business operations with our enterprise-grade solutions. Designed for fleet operators, logistics companies, and transportation businesses looking to modernize their operations.",
      features: [
        "Fleet management dashboard",
        "Advanced analytics and reporting",
        "API integration capabilities",
        "Custom branding options",
        "Multi-vehicle type support",
        "24/7 technical support"
      ],
      benefits: [
        "Reduced operational costs",
        "Improved fleet utilization",
        "Better decision-making with data",
        "Scalable solutions for growth",
        "Competitive advantage in the market",
        "Streamlined compliance and reporting"
      ]
    }
  },
]

export function Features() {
  return (
    <section id="features" className="py-32 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 uppercase tracking-tight">
              Our <span className="text-brand-green">Services</span>
            </h2>
            <div className="w-20 h-1.5 bg-brand-green rounded-full" />
            <p className="text-slate-500 text-lg max-w-xl">
              Building trusted digital platforms that connect car owners, drivers, and customers across Rwanda.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((item, i) => (
            <div
              key={i}
              id={item.title.toLowerCase().replace(/\s+/g, '-').replace('the-', '').replace('&', 'and')}
              className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-brand-green transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200 relative overflow-hidden"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-8 text-white shadow-lg transition-transform group-hover:scale-110 duration-500`}
              >
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-10 text-lg">{item.description}</p>

              <ServiceModal
                trigger={
                  <div className="flex items-center gap-3 text-brand-green font-bold text-sm cursor-pointer hover:gap-4 transition-all uppercase tracking-widest">
                    Learn More <ArrowRight size={20} />
                  </div>
                }
                title={item.title}
                description={item.modalContent.description}
                image={item.image}
                features={item.modalContent.features}
                benefits={item.modalContent.benefits}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
