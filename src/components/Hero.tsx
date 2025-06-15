import React, { useState, useEffect } from 'react';
import { ArrowRight, Truck, CreditCard, Star, MapPin, X } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import ExitIntentPopup from './ExitIntentPopup';

const Hero: React.FC = () => {
  const [showTimePopup, setShowTimePopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimePopup(true);
    }, 10000); // Show popup after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <AnimatedBackground />
        
        {/* Parallax Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 1 }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 2 }}
          />
        </div>

        <div className="absolute inset-0 bg-black/20"></div>
        
        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 min-h-screen flex items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center w-full">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              Herrería{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Jaimes
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Especialistas en metalurgia con más de 20 años de experiencia. 
              Creamos productos de calidad superior para hogares y empresas con 
              diseños únicos y acabados perfectos.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-16"
              variants={itemVariants}
            >
              {[
                { icon: Truck, text: 'Envíos Internacionales', color: 'green' },
                { icon: CreditCard, text: 'Todos los Medios de Pago', color: 'blue' },
                { icon: Star, text: 'Calidad Garantizada', color: 'yellow' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className={`h-5 w-5 mr-3 text-${item.color}-400`} />
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              variants={itemVariants}
            >
              <motion.a
                href="https://wa.me/541125192502"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 flex items-center shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                WhatsApp
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="mailto:yolanamontiel130@gmail.com"
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 flex items-center shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Email
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            <motion.div
              className="flex items-center justify-center text-gray-300"
              variants={itemVariants}
            >
              <MapPin className="h-5 w-5 mr-2 text-red-400" />
              <span className="text-lg">Maipu 1270, Grand Bourg, Buenos Aires, Argentina</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>

      {/* Time-based Popup */}
      {showTimePopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                🔥 ¡Oferta Especial!
              </h3>
              <button
                onClick={() => setShowTimePopup(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Obtén un <strong>15% de descuento</strong> en tu primera compra. 
              ¡Válido solo por tiempo limitado!
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/541125192502?text=Hola,%20me%20interesa%20la%20oferta%20especial%20del%2015%25%20de%20descuento"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium text-center transition-colors"
                onClick={() => setShowTimePopup(false)}
              >
                ¡Quiero mi descuento!
              </a>
              <button
                onClick={() => setShowTimePopup(false)}
                className="px-4 py-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <ExitIntentPopup />
    </>
  );
};

export default Hero;