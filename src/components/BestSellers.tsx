import React, { useState, useEffect } from 'react';
import { Star, Edit, Trash2, Plus, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  getBestSellers, 
  addBestSeller, 
  updateBestSeller, 
  deleteBestSeller,
  BestSellerProduct 
} from '../services/firebaseService';

const BestSellers: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<BestSellerProduct[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<BestSellerProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadBestSellers();
  }, []);

  const loadBestSellers = async () => {
    setLoading(true);
    try {
      const fetchedProducts = await getBestSellers();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error loading best sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData: Omit<BestSellerProduct, 'id'>) => {
    setSaving(true);
    try {
      const newProductId = await addBestSeller(productData);
      if (newProductId) {
        await loadBestSellers();
        setShowForm(false);
        alert('Producto más vendido agregado exitosamente');
      } else {
        alert('Error al agregar el producto');
      }
    } catch (error) {
      console.error('Error adding best seller:', error);
      alert('Error al agregar el producto');
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduct = async (productData: BestSellerProduct) => {
    if (!productData.id) return;
    
    setSaving(true);
    try {
      const success = await updateBestSeller(productData.id, productData);
      if (success) {
        await loadBestSellers();
        setEditingProduct(null);
        alert('Producto actualizado exitosamente');
      } else {
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error updating best seller:', error);
      alert('Error al actualizar el producto');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto más vendido?')) {
      return;
    }
    
    setSaving(true);
    try {
      const success = await deleteBestSeller(id);
      if (success) {
        await loadBestSellers();
        alert('Producto eliminado exitosamente');
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error deleting best seller:', error);
      alert('Error al eliminar el producto');
    } finally {
      setSaving(false);
    }
  };

  const ProductForm: React.FC<{
    product?: BestSellerProduct;
    onSubmit: (product: BestSellerProduct | Omit<BestSellerProduct, 'id'>) => void;
    onCancel: () => void;
  }> = ({ product, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      name: product?.name || '',
      image: product?.image || '',
      price: product?.price || '',
      rating: product?.rating || 5,
      category: product?.category || '',
      isActive: product?.isActive ?? true,
      order: product?.order || 1
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!formData.name.trim() || !formData.image.trim() || !formData.category.trim()) {
        alert('Por favor completa todos los campos obligatorios');
        return;
      }

      if (product && product.id) {
        onSubmit({ ...product, ...formData });
      } else {
        onSubmit(formData);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {product ? 'Editar Producto Más Vendido' : 'Agregar Producto Más Vendido'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
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
              {formData.image && (
                <div className="mt-2">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Precio *
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="$850"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Categoría *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Puertas"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Calificación (1-5)
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} estrella{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Orden
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
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
                Producto activo
              </label>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg flex items-center justify-center"
              >
                {saving ? (
                  <>
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Guardando...
                  </>
                ) : (
                  product ? 'Actualizar' : 'Agregar'
                )}
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
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Cargando productos más vendidos...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Productos Más Vendidos
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Descubre nuestros productos más populares, elegidos por miles de clientes satisfechos.
          </p>
          
          {isAuthenticated && (
            <button
              onClick={() => setShowForm(true)}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg flex items-center mx-auto transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-8"
            >
              <Plus className="h-5 w-5 mr-2" />
              Agregar Producto Más Vendido
            </button>
          )}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group relative"
              >
                <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {product.category}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < product.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {product.price}
                  </p>
                </div>

                {isAuthenticated && (
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingProduct(product)}
                      disabled={saving}
                      className="p-2 bg-white/90 hover:bg-white text-blue-600 rounded-lg shadow-lg transition-colors disabled:opacity-50"
                      title="Editar producto"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => product.id && handleDeleteProduct(product.id)}
                      disabled={saving}
                      className="p-2 bg-white/90 hover:bg-white text-red-600 rounded-lg shadow-lg transition-colors disabled:opacity-50"
                      title="Eliminar producto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Star className="h-12 w-12 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              No hay productos más vendidos configurados
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {isAuthenticated 
                ? 'Agrega productos para mostrar en esta sección destacada.'
                : 'Esta sección está siendo actualizada con nuestros mejores productos.'
              }
            </p>
            {isAuthenticated && (
              <button
                onClick={() => setShowForm(true)}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Agregar Primer Producto
              </button>
            )}
          </div>
        )}

        {!isAuthenticated && products.length > 0 && (
          <div className="text-center mt-12">
            <a
              href="https://wa.me/541125192502"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Consultar Precios
            </a>
          </div>
        )}
      </div>

      {showForm && (
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleEditProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      {saving && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 flex items-center space-x-4 shadow-2xl">
            <Loader className="animate-spin h-8 w-8 text-blue-600" />
            <span className="text-gray-900 dark:text-white font-medium text-lg">Guardando...</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default BestSellers;