import React from 'react';
import { Hammer, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Hammer className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Herrería Jaimes</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Especialistas en herrería con más de 20 años de experiencia. 
              Creamos productos de calidad superior para hogares y empresas.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/541125192502"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                WhatsApp
              </a>
              <a
                href="mailto:yolanamontiel130@gmail.com"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Email
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                <span className="text-gray-400">
                  Maipu 1270, Grand Bourg<br />
                  Buenos Aires, Argentina
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <span className="text-gray-400">+54 11 2519-2502</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <span className="text-gray-400">yolanamontiel130@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Horarios</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-blue-400" />
                <div className="text-gray-400">
                  <p>Lun - Vie: 8:00 - 18:00</p>
                  <p>Sábados: 8:00 - 13:00</p>
                  <p>Domingos: Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Herrería Jaimes. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;