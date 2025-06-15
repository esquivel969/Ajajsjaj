import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExitIntentPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setShowPopup(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
          >
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full mr-4">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      ¡Espera! 🎁
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No te vayas sin tu regalo
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Obtén un presupuesto GRATIS
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Antes de irte, déjanos ayudarte con un presupuesto personalizado 
                  sin compromiso. Nuestros expertos están listos para asesorarte.
                </p>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">✨</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Beneficios exclusivos:
                    </span>
                  </div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Consulta gratuita con nuestros expertos</li>
                    <li>• Diseño personalizado según tus necesidades</li>
                    <li>• Presupuesto detallado sin sorpresas</li>
                    <li>• Garantía de calidad en todos nuestros trabajos</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href="https://wa.me/541125192502?text=Hola,%20me%20gustaría%20obtener%20un%20presupuesto%20gratuito%20para%20mi%20proyecto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-lg font-medium text-center transition-all duration-200 transform hover:scale-105"
                  onClick={() => setShowPopup(false)}
                >
                  Obtener Presupuesto Gratis
                </a>
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-6 py-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
                >
                  No, gracias
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;