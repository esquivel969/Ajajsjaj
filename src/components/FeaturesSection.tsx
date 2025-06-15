import React from 'react';
import { Shield, Award, Users, Clock } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Garantía de Calidad',
      description: 'Todos nuestros productos cuentan con garantía y están fabricados con los mejores materiales.',
    },
    {
      icon: Award,
      title: '20+ Años de Experiencia',
      description: 'Más de dos décadas perfeccionando nuestras técnicas y satisfaciendo a nuestros clientes.',
    },
    {
      icon: Users,
      title: 'Trabajo Personalizado',
      description: 'Diseñamos y fabricamos productos únicos adaptados a tus necesidades específicas.',
    },
    {
      icon: Clock,
      title: 'Entrega Puntual',
      description: 'Cumplimos con los tiempos de entrega acordados, tu proyecto es nuestra prioridad.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Por qué elegir Herrería Jaimes?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Somos líderes en el sector metalúrgico, ofreciendo productos de calidad superior 
            y un servicio excepcional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;