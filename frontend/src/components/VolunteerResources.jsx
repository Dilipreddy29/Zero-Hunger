import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';

const VolunteerResources = ({ faqs }) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">Volunteer Resources</h3>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-150 flex items-center justify-between text-left"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openFAQ === index ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {openFAQ === index && (
              <div className="px-4 py-3 bg-white border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerResources;
