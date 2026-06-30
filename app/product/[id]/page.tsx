'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Copy, ShoppingBag } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import {
  categories as staticCategories,
  productsByCategoryId as staticProductsByCategoryId,
} from '@/data';
import { fetchCategories, fetchProductsByCategoryId } from '@/lib/content';
import { Category, Product } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const prodId = params.id as string;

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>(staticCategories);
  const [productsByCategoryId, setProductsByCategoryId] = useState<Record<string, Product[]>>(
    staticProductsByCategoryId
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchCategories(), fetchProductsByCategoryId()])
      .then(([nextCategories, nextProducts]) => {
        setCategories(nextCategories);
        setProductsByCategoryId(nextProducts);
      })
      .finally(() => setLoading(false));
  }, []);

  let product: Product | null = null;
  for (const categoryId in productsByCategoryId) {
    const found = productsByCategoryId[categoryId].find((item) => item.id === prodId);
    if (found) {
      product = found;
      break;
    }
  }

  if (!product && loading) {
    return (
      <div className="min-h-screen bg-[#245B4A] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs font-headline font-bold tracking-widest uppercase">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#245B4A] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-headline text-3xl font-extrabold text-primary-red uppercase mb-4">
          Không tìm thấy sản phẩm
        </h2>
        <p className="text-sm text-text-secondary mb-8 max-w-md">
          Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary-red hover:bg-[#c0000c] text-white font-headline font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-primary-red/20"
        >
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  const category = categories.find((item) => item.id === product.categoryId);
  const relatedProducts = (productsByCategoryId[product.categoryId] || [])
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (sectionId === 'projects') {
      router.push('/projects');
      return;
    }
    if (sectionId === 'news') {
      router.push('/news');
      return;
    }
    router.push(`/#${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-[#245B4A] text-white font-sans overflow-x-hidden antialiased flex flex-col">
      <title>{`${product.name} | LINH TRANG HOME`}</title>
      <meta name="description" content={product.description} />

      <Header
        onCategoryClick={(id) => router.push(`/category/${id}`)}
        onProjectClick={(id) => router.push(`/projects/${id}`)}
        onNavigateToSection={handleNavigateToSection}
        activeSection=""
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-28 mt-8 flex-1 w-full">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs font-headline font-bold text-white/60 hover:text-primary-red transition-all uppercase tracking-widest cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Quay lại danh sách
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-5 relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/25">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-6 left-6 px-4 py-1.5 text-xs font-bold font-headline bg-primary-red text-white tracking-widest rounded-full uppercase shadow-lg">
              Code: {product.code}
            </span>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <span className="font-headline text-[10px] text-primary-red font-extrabold tracking-widest uppercase mb-1.5">
              {category ? category.name : 'Sản phẩm cao cấp'}
            </span>
            <h1 className="font-headline text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              {product.name}
            </h1>

            <div className="flex gap-2.5 items-center mb-6 bg-[#327863]/30 border border-white/5 py-2.5 px-4 rounded-xl w-fit backdrop-blur-sm">
              <span className="text-xs text-text-secondary">Mã sản phẩm:</span>
              <span className="text-xs font-mono font-bold text-white select-all">{product.code}</span>
              <button
                onClick={() => handleCopyCode(product.code)}
                className="text-[10px] text-primary-red font-bold hover:underline border-l border-white/10 pl-3.5 uppercase tracking-widest"
              >
                {copiedCode === product.code ? (
                  <span className="text-green-400 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Đã copy
                  </span>
                ) : (
                  'Sao chép'
                )}
              </button>
            </div>

            <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="space-y-3 bg-[#327863]/35 p-5 rounded-2xl border border-white/10 mb-8 text-xs md:text-sm max-w-xl shadow-inner">
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-text-secondary">Xuất xứ / Thương hiệu:</span>
                <span className="text-white font-bold uppercase">{product.origin}</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-text-secondary">Vật liệu cấu thành:</span>
                <span className="text-white text-right max-w-xs">{product.material}</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                <span className="text-text-secondary">Kích thước tiêu chuẩn:</span>
                <span className="text-white font-mono">{product.size}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Đơn giá bán sỉ/lẻ:</span>
                <span className="text-primary-red font-bold">{product.price}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
              <Link
                href={`/?quote=${product.code}#consultation`}
                className="flex-1 py-4 rounded-xl bg-primary-red hover:bg-[#c0000c] text-white font-headline font-bold text-xs tracking-widest uppercase shadow-lg shadow-primary-red/15 active:scale-95 transition-all text-center flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Yêu cầu báo giá & thi công
              </Link>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="border-t border-white/10 pt-16">
            <h2 className="font-headline text-xl md:text-2xl font-bold uppercase tracking-tight text-white mb-10">
              Sản phẩm <span className="text-primary-red">liên quan</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="group/prod bg-[#327863]/30 border border-white/10 hover:border-primary-red/30 rounded-2xl overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="aspect-video relative overflow-hidden bg-black/35">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/prod:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 text-[9px] font-bold font-headline rounded-full bg-primary-red text-white uppercase tracking-widest shadow-md">
                      {item.code}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-headline text-base font-bold text-white group-hover/prod:text-primary-red transition-colors mb-2 line-clamp-2 min-h-[48px]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-3 mb-6 flex-1 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-2 border-t border-white/5 pt-4 mb-6 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary">Thương hiệu:</span>
                        <span className="text-white font-semibold uppercase">{item.origin}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary">Chất liệu:</span>
                        <span className="text-white truncate max-w-[170px]" title={item.material}>
                          {item.material}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary">Kích thước:</span>
                        <span className="text-white font-mono">{item.size}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/product/${item.id}`}
                        className="flex-1 py-3 text-center rounded-xl bg-white/5 hover:bg-white/10 text-white font-headline font-bold text-[11px] tracking-wider transition-colors cursor-pointer border border-white/5"
                      >
                        Xem chi tiết
                      </Link>
                      <Link
                        href={`/?quote=${item.code}#consultation`}
                        className="px-4 py-3 rounded-xl bg-primary-red hover:bg-[#c0000c] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                        title="Yêu cầu thông tin / Báo giá"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
