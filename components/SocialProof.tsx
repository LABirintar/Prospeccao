
import React from 'react';
import { TESTIMONIALS } from '../constants';

const SocialProof: React.FC = () => {
  return (
    <section className="py-20 bg-brand-bg-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Escolas como a sua já confiam na LABirintar</h2>
          <p className="text-lg text-brand-text-light max-w-2xl mx-auto">
            Veja o que nossos parceiros dizem sobre a jornada de transformação.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg flex flex-col">
              <div className="text-5xl text-lab-blue font-bold mb-4">“</div>
              <p className="text-brand-text-light mb-6 flex-grow italic">
                {testimonial.quote}
              </p>
              <div className="mt-auto">
                <p className="font-bold text-brand-text">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.school}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
