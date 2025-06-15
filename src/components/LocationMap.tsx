import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const LocationMap: React.FC = () => {
  const address = "Maipu 1270, Grand Bourg, Buenos Aires, Argentina";
  const coordinates = "-34.4925,-58.7358"; // Coordenadas aproximadas de Grand Bourg
  
  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nuestra Ubicación
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Visítanos en nuestro taller en Grand Bourg. Estamos aquí para ayudarte con todos tus proyectos de herrería.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Información de contacto */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Información de Contacto
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Dirección
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Maipu 1270, Grand Bourg<br />
                      Buenos Aires, Argentina
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Teléfono
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      +54 11 2519-2502
                    </p>
                    <a
                      href="https://wa.me/541125192502"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 dark:text-green-400 hover:underline text-sm"
                    >
                      Contactar por WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Horarios de Atención
                    </h4>
                    <div className="text-gray-600 dark:text-gray-400 space-y-1">
                      <p>Lunes a Viernes: 8:00 - 18:00</p>
                      <p>Sábados: 8:00 - 13:00</p>
                      <p>Domingos: Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openInGoogleMaps}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center transform hover:scale-105"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Ver en Google Maps
                </button>
                <button
                  onClick={openDirections}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center transform hover:scale-105"
                >
                  <Navigation className="h-5 w-5 mr-2" />
                  Cómo Llegar
                </button>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-w-16 aspect-h-12">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.5234567890123!2d-58.7358!3d-34.4925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDI5JzMzLjAiUyA1OMKwNDQnMDguOSJX!5e0!3m2!1ses!2sar!4v1234567890123!5m2!1ses!2sar&q=${encodeURIComponent(address)}`}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-96 rounded-2xl"
                  title="Ubicación de Herrería Jaimes"
                />
              </div>
              
              {/* Overlay con información */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Herrería Jaimes
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Maipu 1270, Grand Bourg
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Fácil Acceso
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Ubicados en una zona de fácil acceso con estacionamiento disponible para nuestros clientes.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Consultas Inmediatas
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Contáctanos por WhatsApp para consultas rápidas o para coordinar tu visita al taller.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Horarios Flexibles
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Horarios amplios de lunes a sábado para adaptarnos a tu disponibilidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;