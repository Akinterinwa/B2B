'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import { useCart } from '@/lib/cart-context';
import { getProductById, type Product } from '@/lib/products-data';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ShoppingCart, ArrowLeft, Truck, Shield, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';



export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter(); // Initialize router
    const { state, dispatch } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isProceedingToCheckout, setIsProceedingToCheckout] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const productId = Number.parseInt(params.id as string);
    const isInCart = state.items.some((item) => item.id === productId);
    const cartItem = state.items.find((item) => item.id === productId);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const foundProduct = getProductById(productId);
            setProduct(foundProduct || null);
            setIsLoading(false);
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        if (cartItem) {
            // Sync with cart quantity when component mounts or cart changes
            setQuantity(cartItem.quantity);
        } else {
            // Reset to 1 if item is not in cart
            setQuantity(1);
        }
    }, [cartItem]);

    // Remove automatic sync - quantity changes should not affect cart until user clicks Add to Cart or Proceed to Checkout

    if (isLoading) {
        return null; // This will show the loading.tsx file
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                        <Link href="/products">
                            <Button>Back to Products</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const handleAddToCart = async () => {
        setIsAddingToCart(true);

        // Simulate a brief loading state for better UX
        await new Promise(resolve => setTimeout(resolve, 300));

        dispatch({ type: 'UPSERT_ITEM', payload: { ...product, quantity } });
        setIsAddingToCart(false);
    };

    const handleProceedToCheckout = async () => {
        setIsProceedingToCheckout(true);

        // Ensure the cart is updated before navigation
        dispatch({ type: 'UPSERT_ITEM', payload: { ...product, quantity } });

        // Wait for the next tick to ensure state is updated
        await new Promise(resolve => setTimeout(resolve, 500));

        // Navigate to cart page
        router.push('/cart');
        setIsProceedingToCheckout(false);
    };

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };

    const productImages = [product.image, product.image, product.image];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4 lg:mb-6">
                    <Link href="/products" className="hover:text-blue-900 flex items-center">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Products
                    </Link>
                    <span>/</span>
                    <span>{product.category}</span>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 lg:mb-12">
                    <div className="space-y-4">
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
                            <Image
                                src={productImages[selectedImage] || '/placeholder.svg'}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            {!product.inStock && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <span className="text-white text-lg font-semibold">Out of Stock</span>
                                </div>
                            )}
                        </div>

                        <div className="flex space-x-2 lg:space-x-4">
                            {productImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                        selectedImage === index ? 'border-blue-900' : 'border-gray-200'
                                    }`}>
                                    <Image
                                        src={image || '/placeholder.svg'}
                                        alt={`${product.name} ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 lg:space-y-6">
                        <div>
                            <div className="flex items-start justify-between mb-2">
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{product.name}</h1>
                                <Badge className="bg-orange-500 text-white">{product.bulkDiscount}</Badge>
                            </div>
                            <p className="text-gray-600 mb-4">{product.supplier}</p>

                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${
                                                    i < Math.floor(product.rating)
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-600">
                                        {product.rating} ({product.reviews} reviews)
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-baseline space-x-3">
                                <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                                    ₦{product.price.toLocaleString()}
                                </span>
                                <span className="text-gray-600">per unit</span>
                            </div>
                            <div className="text-green-600 font-medium">
                                Bulk Price: ₦{product.bulkPrice.toLocaleString()} per unit
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                <div className="flex items-center space-x-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}>
                                        -
                                    </Button>
                                    <span className="px-4 py-2 border rounded-md text-center min-w-[60px]">
                                        {quantity}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleQuantityChange(quantity + 1)}>
                                        +
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                <Button
                                    className={`flex-1 btn-hover-lift ${
                                        isInCart
                                            ? 'bg-red-600 hover:bg-red-700 text-white'
                                            : 'bg-blue-900 hover:bg-blue-800 text-white'
                                    }`}
                                    disabled={!product.inStock}
                                    loading={isAddingToCart}
                                    loadingText={isInCart ? 'Updating...' : 'Adding...'}
                                    onClick={handleAddToCart}>
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    {isInCart ? 'Update Cart' : 'Add to Cart'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 bg-transparent btn-hover-lift"
                                    loading={isProceedingToCheckout}
                                    loadingText="Redirecting..."
                                    onClick={handleProceedToCheckout}>
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                            <div className="text-center">
                                <Truck className="h-8 w-8 mx-auto text-blue-900 mb-2" />
                                <p className="text-xs text-gray-600">Fast Delivery</p>
                            </div>
                            <div className="text-center">
                                <Shield className="h-8 w-8 mx-auto text-blue-900 mb-2" />
                                <p className="text-xs text-gray-600">Quality Assured</p>
                            </div>
                            <div className="text-center">
                                <Award className="h-8 w-8 mx-auto text-blue-900 mb-2" />
                                <p className="text-xs text-gray-600">Factory Direct</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card>
                    <CardContent className="p-4 lg:p-6">
                        <Tabs defaultValue="description" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="description">Description</TabsTrigger>
                                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                                <TabsTrigger value="pricing">Bulk Pricing</TabsTrigger>
                            </TabsList>

                            <TabsContent value="description" className="mt-6 space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Product Description</h3>
                                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                                    <ul className="space-y-2">
                                        {product.features && product.features.length > 0 ? (
                                            product.features.map((feature, index) => (
                                                <li key={index} className="flex items-center text-gray-700">
                                                    <span className="w-2 h-2 bg-blue-900 rounded-full mr-3 flex-shrink-0"></span>
                                                    {feature}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-500">No features listed for this product.</li>
                                        )}
                                    </ul>
                                </div>
                            </TabsContent>

                            <TabsContent value="specifications" className="mt-6">
                                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {product.specifications && Object.keys(product.specifications).length > 0 ? (
                                        Object.entries(product.specifications).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex justify-between py-2 border-b border-gray-200">
                                                <span className="font-medium text-gray-700">{key}:</span>
                                                <span className="text-gray-900">{value}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-2 p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                                            <p>Technical specifications not available for this product.</p>
                                            <p className="text-sm mt-2">Contact us for detailed specifications.</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="pricing" className="mt-6">
                                <h3 className="text-lg font-semibold mb-4">Volume Pricing</h3>
                                <div className="space-y-3">
                                    {product.bulkPricing && product.bulkPricing.length > 0 ? (
                                        product.bulkPricing.map((tier, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                                <span className="font-medium text-gray-700">{tier.quantity}</span>
                                                <span className="text-lg font-bold text-gray-900">
                                                    ₦{tier.price.toLocaleString()}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                                            <p>Volume pricing information not available for this product.</p>
                                            <p className="text-sm mt-2">Contact us for bulk pricing options.</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    );
}
