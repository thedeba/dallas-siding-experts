"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import siteData from "@/data/siteData.json";
import admin from "@/data/admin.json";
import { Phone } from "lucide-react";

export default function FAQSection() {
  const { faq } = siteData;

  return (
    <section id="faq" className="py-20 lg:py-28 bg-brand-gray border-t border-gray-100" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-brand-orange font-bold text-sm tracking-widest uppercase mb-3">
            {faq.badge}
          </span>
          <h2 id="faq-heading" className="section-heading mb-4">
            {faq.title}{" "}
            <span className="text-brand-orange">{faq.titleHighlight}</span>
          </h2>
          <p className="section-subheading max-w-xl mx-auto">
            {faq.subtitle}
          </p>
        </div>

        {/* Accordion with custom gold active border */}
        <Accordion className="space-y-3">
          {faq.items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm px-0 focus-within:border-brand-orange/30 open:border-brand-orange/30 open:shadow-md transition-all duration-200"
            >
              <AccordionTrigger className="px-6 py-5 text-left font-bold text-brand-blue text-base hover:text-brand-orange hover:no-underline transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom CTA Block with premium dark styling */}
        <div className="mt-14 text-center bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Subtle gold line accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange" />

          <h3 className="text-brand-blue font-extrabold text-xl mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 text-sm mb-6 max-w-lg mx-auto">
            Our siding experts are available {admin.hours}. Skip the queue and talk to a pro.
          </p>
          <div className="flex justify-center">
            <a
              href={admin.phoneRaw}
              id="faq-call-btn"
              className="btn-orange py-4 px-8 text-base shadow-lg shadow-brand-orange/20 rounded-xl"
            >
              <Phone className="w-5 h-5" />
              Call {admin.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
