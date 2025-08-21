"use client";
import { motion } from "framer-motion";
import { FaShippingFast, FaBoxes, FaShieldAlt, FaStore, FaBullhorn, FaLeaf } from "react-icons/fa";

const services = [
  { icon: <FaShippingFast size={40} />, title: "Shipment Release", desc: "Oversee clearance from FDA upon arrival." },
  { icon: <FaBoxes size={40} />, title: "Innovative Storage", desc: "Smart storage with real-time stock alerts." },
  { icon: <FaLeaf size={40} />, title: "Hygiene Assurance", desc: "Routine pest & hygiene inspections." },
  { icon: <FaShieldAlt size={40} />, title: "Protective Packaging", desc: "Secure wrapping for long-distance safety." },
  { icon: <FaStore size={40} />, title: "Parallel Distribution", desc: "Multiple channels to keep stock in market." },
  { icon: <FaBullhorn size={40} />, title: "Brand Awareness", desc: "Marketing to put your products in the spotlight." },
];

export default function Services() {
  return (
    <section id="services" className="relative py-15 overflow-hidden bg-white">
      <div
        className="absolute inset-0 z-[1] bg-repeat pointer-events-none opacity-20"
        style={{ backgroundImage: "url('/texture-bg.jpg')", backgroundSize: "300px" }}
      />

      <div className="relative z-2 max-w-6xl mx-auto px-4 text-center text-gray-800">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6"
        >
          Our Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Delivering excellence at every step of the supply chain.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg border border-gray-100 hover:border-yellow-400 transition-all duration-300"
            >
              <div className="flex justify-center items-center mb-4 text-yellow-500">
                {service.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
