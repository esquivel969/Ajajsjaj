import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Edit, Trash2, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  getProductsByCategory, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  Product 
} from '../services/firebaseService';

const CategoryPage: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.slice(1); // Remove the leading slash
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load products from Firebase
  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      console.log('Loading products for category:', category);
      const fetchedProducts = await getProductsByCategory(category);
      console.log('Fetched products:', fetchedProducts);
      setProducts(fetchedProducts);
      
      // Extract unique subcategories
      const uniqueSubcategories = [...new Set(fetchedProducts.map(p => p.subcategory))];
      setSubcategories(uniqueSubcategories);
      console.log('Subcategories:', uniqueSubcategories);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryTitles: Record<string, string> = {
    puertas: 'Puertas',
    portones: 'Portones',
    gondolas: 'Góndolas',
    estanterias: 'Estanterías',
    rejas: 'Rejas',
    escaleras: 'Escaleras',
    muebles: 'Muebles',
    accesorios: 'Accesorios'
  };

  const categoryDescriptions: Record<string, string> = {
    puertas: 'Descubre nuestra amplia selección de puertas de hierro forjado, diseñadas para brindar seguridad y elegancia a tu hogar.',
    portones: 'Portones automáticos y manuales de alta calidad, perfectos para proteger tu propiedad con estilo y funcionalidad.',
    gondolas: 'Soluciones de exhibición profesionales para comercios, diseñadas para maximizar el espacio y la presentación de productos.',
    estanterias: 'Estanterías resistentes y versátiles para organizar espacios industriales, comerciales y residenciales.',
    rejas: 'Rejas de seguridad personalizadas que combinan protección efectiva con diseños atractivos.',
    escaleras: 'Escaleras de hierro forjado y acero, desde diseños clásicos hasta modernos, adaptadas a cualquier espacio.',
    muebles: 'Muebles de hierro únicos y duraderos que aportan carácter y funcionalidad a cualquier ambiente.',
    accesorios: 'Complementos y accesorios de herrería para completar y personalizar tus proyectos.'
  };

  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
    setSaving(true);
    try {
      console.log('Adding product:', productData);
      const newProductId = await addProduct({
        ...productData,
        category: category
      });
      
      if (newProductId) {
        console.log('Product added successfully with ID:', newProductId);
        // Reload products to get the updated list
        await loadProducts();
        setShowAddForm(false);
        alert('Producto agregado exitosamente');
      } else {
        console.error('Failed to add product - no ID returned');
        alert('Error al agregar el producto');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error al agregar el producto: ' + error);
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduct = async (productData: Product) => {
    if (!productData.id) return;
    
    setSaving(true);
    try {
      console.log('Updating product:', productData);
      const success = await updateProduct(productData.id, productData);
      
      if (success) {
        console.log('Product updated successfully');
        // Reload products to get the updated list
        await loadProducts();
        setEditingProduct(null);
        alert('Producto actualizado exitosamente');
      } else {
        console.error('Failed to update product');
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error al actualizar el producto: ' + error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }
    
    setSaving(true);
    try {
      console.log('Deleting product:', id);
      const success = await deleteProduct(id);
      
      if (success) {
        console.log('Product deleted successfully');
        // Reload products to get the updated list
        await loadProducts();
        alert('Producto eliminado exitosamente');
      } else {
        console.error('Failed to delete product');
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar el producto: ' + error);
    } finally {
      setSaving(false);
    }
  };

  const ProductForm: React.FC<{
    product?: Product;
    onSubmit: (product: Product | Omit<Product, 'id'>) => void;
    onCancel: () => void;
  }> = ({ product, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      name: product?.name || '',
      image: product?.image || '',
      subcategory: product?.subcategory || '',
      price: product?.price || '',
      description: product?.description || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!formData.name.trim() || !formData.image.trim() || !formData.subcategory.trim()) {
        alert('Por favor completa todos los campos obligatorios');
        return;
      }

      console.log('Form data:', formData);

      if (product && product.id) {
        onSubmit({ ...product, ...formData });
      } else {
        onSubmit({
          ...formData,
          category: category
        });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {product ? 'Editar Producto' : 'Agregar Producto'}
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre del producto"
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://ejemplo.com/imagen.jpg"
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subcategoría *
              </label>
              <input
                type="text"
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Puertas de Hierro"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Precio
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: $850"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descripción del producto"
                rows={3}
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center"
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
                className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {categoryTitles[category] || 'Categoría'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            {categoryDescriptions[category] || 'Explora nuestra selección de productos de alta calidad.'}
          </p>
          {isAuthenticated && (
            <button
              onClick={() => setShowAddForm(true)}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg flex items-center mx-auto transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Plus className="h-5 w-5 mr-2" />
              Agregar Producto
            </button>
          )}
        </div>

        {/* Debug info - solo visible en desarrollo */}
        {process.env.NODE_ENV === 'development' && isAuthenticated && (
          <div className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Debug: Categoría actual: {category} | Productos encontrados: {products.length} | Subcategorías: {subcategories.length}
            </p>
          </div>
        )}

        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <div key={subcategory} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  {subcategory}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {products
                  .filter(product => product.subcategory === subcategory)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                    >
                      <div className="relative overflow-hidden">
                        <div className="aspect-w-16 aspect-h-10">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800';
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {product.name}
                        </h3>
                        
                        {product.description && (
                          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            {product.description}
                          </p>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            {product.price && (
                              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                {product.price}
                              </span>
                            )}
                            <a
                              href={`https://wa.me/541125192502?text=Hola,%20me%20interesa%20el%20producto:%20${encodeURIComponent(product.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
                            >
                              Consultar por WhatsApp
                            </a>
                          </div>
                          
                          {isAuthenticated && (
                            <div className="flex flex-col space-y-2">
                              <button
                                onClick={() => setEditingProduct(product)}
                                disabled={saving}
                                className="p-3 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                title="Editar producto"
                              >
                                <Edit className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => product.id && handleDeleteProduct(product.id)}
                                disabled={saving}
                                className="p-3 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                title="Eliminar producto"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
                <Plus className="h-16 w-16 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No hay productos disponibles
              </h3>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                {isAuthenticated 
                  ? 'Comienza agregando tu primer producto a esta categoría para mostrar tu trabajo excepcional.'
                  : 'Esta categoría está siendo actualizada con nuevos productos increíbles. Vuelve pronto para descubrir nuestras últimas creaciones.'
                }
              </p>
              {isAuthenticated && (
                <button
                  onClick={() => setShowAddForm(true)}
                  disabled={saving}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-400 text-white px-8 py-4 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Agregar Primer Producto
                </button>
              )}
            </div>
          </div>
        )}

        {showAddForm && (
          <ProductForm
            onSubmit={handleAddProduct}
            onCancel={() => setShowAddForm(false)}
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 flex items-center space-x-4 shadow-2xl">
              <Loader className="animate-spin h-8 w-8 text-blue-600" />
              <span className="text-gray-900 dark:text-white font-medium text-lg">Guardando...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;