import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  Timestamp,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Product {
  id?: string;
  name: string;
  image: string;
  category: string;
  subcategory: string;
  price?: string;
  description?: string;
  createdAt?: Timestamp;
}

export interface FeaturedOffer {
  id?: string;
  title: string;
  description: string;
  image: string;
  originalPrice?: string;
  discountedPrice: string;
  discount?: string;
  validUntil?: string;
  isActive: boolean;
  createdAt?: Timestamp;
}

export interface BestSellerProduct {
  id?: string;
  name: string;
  image: string;
  price: string;
  rating: number;
  category: string;
  isActive: boolean;
  order: number;
  createdAt?: Timestamp;
}

const COLLECTION_NAME = 'products';
const FEATURED_OFFER_DOC = 'featured-offer';
const BEST_SELLERS_COLLECTION = 'best-sellers';

// Obtener todos los productos de una categoría
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    // Removemos temporalmente el orderBy para evitar el error del índice
    // Una vez que crees el índice en Firebase, puedes descomentar la línea orderBy
    const q = query(
      collection(db, COLLECTION_NAME),
      where('category', '==', category)
      // orderBy('createdAt', 'desc') // Descomenta esta línea después de crear el índice
    );
    
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        // Asegurar que createdAt sea un Timestamp válido
        createdAt: data.createdAt || Timestamp.now()
      } as Product);
    });
    
    // Ordenamos manualmente por ahora
    products.sort((a, b) => {
      const aTime = a.createdAt?.toMillis() || 0;
      const bTime = b.createdAt?.toMillis() || 0;
      return bTime - aTime; // Orden descendente (más reciente primero)
    });
    
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

// Agregar un nuevo producto
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string | null> => {
  try {
    const productData = {
      ...product,
      createdAt: Timestamp.now() // Usar Timestamp de Firebase
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), productData);
    console.log('Product added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
};

// Actualizar un producto existente
export const updateProduct = async (id: string, product: Partial<Product>): Promise<boolean> => {
  try {
    const productRef = doc(db, COLLECTION_NAME, id);
    // Remover campos undefined para evitar errores
    const cleanProduct = Object.fromEntries(
      Object.entries(product).filter(([_, value]) => value !== undefined)
    );
    await updateDoc(productRef, cleanProduct);
    console.log('Product updated:', id);
    return true;
  } catch (error) {
    console.error('Error updating product:', error);
    return false;
  }
};

// Eliminar un producto
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    console.log('Product deleted:', id);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

// Obtener todas las subcategorías de una categoría
export const getSubcategoriesByCategory = async (category: string): Promise<string[]> => {
  try {
    const products = await getProductsByCategory(category);
    const subcategories = [...new Set(products.map(p => p.subcategory))];
    return subcategories;
  } catch (error) {
    console.error('Error getting subcategories:', error);
    return [];
  }
};

// Featured Offer Functions
export const getFeaturedOffer = async (): Promise<FeaturedOffer | null> => {
  try {
    const docRef = doc(db, 'settings', FEATURED_OFFER_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt || Timestamp.now()
      } as FeaturedOffer;
    }
    return null;
  } catch (error) {
    console.error('Error getting featured offer:', error);
    return null;
  }
};

export const setFeaturedOffer = async (offer: Omit<FeaturedOffer, 'id'>): Promise<boolean> => {
  try {
    const docRef = doc(db, 'settings', FEATURED_OFFER_DOC);
    const offerData = {
      ...offer,
      createdAt: Timestamp.now()
    };
    
    await setDoc(docRef, offerData);
    console.log('Featured offer saved');
    return true;
  } catch (error) {
    console.error('Error saving featured offer:', error);
    return false;
  }
};

export const removeFeaturedOffer = async (): Promise<boolean> => {
  try {
    const docRef = doc(db, 'settings', FEATURED_OFFER_DOC);
    await deleteDoc(docRef);
    console.log('Featured offer removed');
    return true;
  } catch (error) {
    console.error('Error removing featured offer:', error);
    return false;
  }
};

// Best Sellers Functions
export const getBestSellers = async (): Promise<BestSellerProduct[]> => {
  try {
    const q = query(
      collection(db, BEST_SELLERS_COLLECTION),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const bestSellers: BestSellerProduct[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      bestSellers.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt || Timestamp.now()
      } as BestSellerProduct);
    });
    
    return bestSellers;
  } catch (error) {
    console.error('Error getting best sellers:', error);
    return [];
  }
};

export const addBestSeller = async (product: Omit<BestSellerProduct, 'id'>): Promise<string | null> => {
  try {
    const productData = {
      ...product,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, BEST_SELLERS_COLLECTION), productData);
    console.log('Best seller added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding best seller:', error);
    return null;
  }
};

export const updateBestSeller = async (id: string, product: Partial<BestSellerProduct>): Promise<boolean> => {
  try {
    const productRef = doc(db, BEST_SELLERS_COLLECTION, id);
    const cleanProduct = Object.fromEntries(
      Object.entries(product).filter(([_, value]) => value !== undefined)
    );
    await updateDoc(productRef, cleanProduct);
    console.log('Best seller updated:', id);
    return true;
  } catch (error) {
    console.error('Error updating best seller:', error);
    return false;
  }
};

export const deleteBestSeller = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, BEST_SELLERS_COLLECTION, id));
    console.log('Best seller deleted:', id);
    return true;
  } catch (error) {
    console.error('Error deleting best seller:', error);
    return false;
  }
};