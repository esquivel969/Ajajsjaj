import React, { useState, useEffect } from 'react';
import { Star, Clock, Edit, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  getFeaturedOffer, 
  setFeaturedOffer, 
  removeFeaturedOffer,
  FeaturedOffer as FeaturedOfferType 
} from '../services/firebaseService';

const FeaturedOffer: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [offer, setOffer] = useState<FeaturedOfferType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadOffer();
  }, []);

  const loadOffer = async () => {
    setLoading(true);
    try {
      const fetchedOffer = await getFeaturedOffer();
      setOffer(fetchedOffer);
    } catch (error) {
      console.error('Error loading featured offer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOffer = async (offerData: Omit<FeaturedOfferType, 'id'>) => {
    setSaving(true);
    try {
      const success = await setFeaturedOffer(offerData);
      if (success) {
        await loadOffer();
        setShowForm(false);
        alert('Oferta destacada guardada exitosamente');
      } else {
        alert('Error al guardar la oferta');
      }
    } catch (error) {
      console.error('Error saving offer:', error);
      alert('Error al guardar la oferta');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveOffer = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar la oferta destacada?')) {
      return;
    }
    
    setSaving(true);
    try {
      const success = await removeFeaturedOffer();
      if (success) {
        setOffer(null);
        alert('Oferta eliminada exitosamente');
      } else {
        alert('Error al eliminar la oferta');
      }
    } catch (error) {
      console.error('Error removing offer:', error);
      alert('Error al eliminar la oferta');
    } finally {
      setSaving(false);
    }
  };

  const OfferForm: React.FC<{
    offer?: FeaturedOfferType;
    onSubmit: (offer: Omit<FeaturedOfferType, 'id'>) => void;
    onCancel: () => void;
  }> = ({ offer, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      title: offer?.title || '',
      description: offer?.description || '',
      image: offer?.image || '',
      originalPrice: offer?.originalPrice || '',
      discountedPrice: offer?.discountedPrice || '',
      discount: offer?.discount || '',
      validUntil: offer?.validUntil || '',
      isActive: offer?.isActive ?? true
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {offer ? 'Editar Oferta Destacada' : 'Crear Oferta Destacada'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Título *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Descripción *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL de Imagen *
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Precio Original
                </label>
                <input
                  type="text"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="$1,000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Precio con Descuento *
                </label>
                <input
                  type="text"
                  value={formData.discountedPrice}
                  onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="$850"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descuento
                </label>
                <input
                  type="text"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="15%"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Válido hasta
                </label>
                <input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="isActive" className="text-sm text-gray-700 dark:text-gray-300">
                Oferta activa
              </label>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg"
              >
                {saving ? 'Guardando...' : (offer ? 'Actualizar' : 'Crear')}
              </button>
              <button
                type="button"
                onClick={onCancel}
                disabled={saving}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!offer || !offer.isActive) {
    return isAuthenticated ? (
      <section className="py-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No hay oferta destacada activa
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Crea una oferta especial para destacar en la página principal
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Crear Oferta Destacada
            </button>
          </div>
        </div>
        
        {showForm && (
          <OfferForm
            onSubmit={handleSaveOffer}
            onCancel={() => setShowForm(false)}
          />
        )}
      </section>
    ) : null;
  }

  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                    🔥 OFERTA ESPECIAL
                  </span>
                  {offer.discount && (
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                      {offer.discount} OFF
                    </span>
                  )}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {offer.title}
                </h2>
                
                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                  {offer.description}
                </p>
                
                <div className="flex items-center gap-4 mb-6">
                  {offer.originalPrice && (
                    <span className="text-white/70 text-xl line-through">
                      {offer.originalPrice}
                    </span>
                  )}
                  <span className="text-white text-3xl font-bold">
                    {offer.discountedPrice}
                  </span>
                </div>
                
                {offer.validUntil && (
                  <div className="flex items-center text-white/80 mb-6">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Válido hasta: {new Date(offer.validUntil).toLocaleDateString()}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-white/80 ml-2">Calidad garantizada</span>
                </div>
                
                <a
                  href={`https://wa.me/541125192502?text=Hola,%20me%20interesa%20la%20oferta%20especial:%20${encodeURIComponent(offer.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-orange-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  ¡Aprovechar Oferta!
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Star className="ml-2 h-5 w-5" />
                  </motion.div>
                </a>
              </div>
              
              <div className="flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-80 h-80 object-cover rounded-xl shadow-2xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </motion.div>
              </div>
            </div>
            
            {isAuthenticated && (
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setShowForm(true)}
                  className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                  title="Editar oferta"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={handleRemoveOffer}
                  className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                  title="Eliminar oferta"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      {showForm && (
        <OfferForm
          offer={offer}
          onSubmit={handleSaveOffer}
          onCancel={() => setShowForm(false)}
        />
      )}
    </section>
  );
};

export default FeaturedOffer;