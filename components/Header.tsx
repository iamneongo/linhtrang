import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Search, ArrowRight, ExternalLink } from 'lucide-react';
import { categories, projects } from '../data';
import BrandLogo from './BrandLogo';

interface HeaderProps {
  onCategoryClick: (catId: string) => void;
  onProjectClick: (projId: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({
  onCategoryClick,
  onProjectClick,
  onNavigateToSection,
  activeSection
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    categories: typeof categories;
    projects: typeof projects;
  }>({ categories: [], projects: [] });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle live search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ categories: [], projects: [] });
      return;
    }
    const query = searchQuery.toLowerCase();
    const filteredCats = categories.filter(
      (c) => c.name.toLowerCase().includes(query) || c.description.toLowerCase().includes(query)
    );
    const filteredProjs = projects.filter(
      (p) => p.title.toLowerCase().includes(query) || p.style.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );
    setSearchResults({ categories: filteredCats, projects: filteredProjs });
  }, [searchQuery]);

  const navItems = [
    { id: 'home', label: 'TRANG CHỦ' },
    { id: 'about', label: 'GIỚI THIỆU' },
    { id: 'products', label: 'SẢN PHẨM', hasDropdown: true },
    { id: 'projects', label: 'DỰ ÁN' },
    { id: 'faq', label: 'HỎI ĐÁP' },
    { id: 'news', label: 'TIN TỨC' },
    { id: 'consultation', label: 'LIÊN HỆ' }
  ];

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white border-b border-slate-100 py-3 shadow-md'
            : 'bg-transparent py-5'
        }`}
      >
          <div className="flex justify-between items-center w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <a
            id="brand-logo"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToSection('home');
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <BrandLogo
              variant={isScrolled ? 'dark' : 'light'}
              layout="horizontal"
              height="36px"
              className="transition-transform group-hover:scale-[1.03] duration-300"
            />
          </a>

          {/* Premium Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateToSection(item.id);
                  }}
                  className={`font-headline text-xs tracking-wider transition-colors py-2 flex items-center gap-1 font-semibold relative ${
                    isScrolled
                      ? activeSection === item.id || (item.id === 'products' && activeSection.startsWith('products'))
                        ? 'text-[#245B4A]'
                        : 'text-slate-600 hover:text-[#245B4A]'
                      : activeSection === item.id || (item.id === 'products' && activeSection.startsWith('products'))
                        ? 'text-white'
                        : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <span className="text-[10px] opacity-70 group-hover:rotate-180 transition-transform duration-300">▼</span>
                  )}
                  {(activeSection === item.id || (item.id === 'products' && activeSection.startsWith('products'))) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary-red rounded-full shadow-sm shadow-primary-red/50"></span>
                  )}
                </a>

                {/* Dropdown for products */}
                {item.hasDropdown && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl z-50 ${
                    isScrolled ? 'bg-white border border-slate-100' : 'bg-[#327863] border border-white/10'
                  }`}>
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-3 h-3 rotate-45 ${
                      isScrolled ? 'bg-white border-l border-t border-slate-100' : 'bg-[#327863] border-l border-t border-white/10'
                    }`}></div>
                    <div className={`relative z-10 px-4 py-2 font-headline text-[10px] tracking-widest font-bold border-b uppercase mb-2 flex items-center gap-1.5 ${
                      isScrolled ? 'text-slate-800 border-slate-100' : 'text-white/90 border-white/5'
                    }`}>
                      <span className="w-1 h-3.5 bg-primary-red rounded-sm inline-block"></span>
                      Danh mục sản phẩm
                    </div>
                    {categories.map((cat) => (
                      <a
                        key={cat.id}
                        href={`#products-${cat.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onCategoryClick(cat.id);
                        }}
                        className={`block px-4 py-2.5 text-xs transition-all flex justify-between items-center group/item rounded-lg mx-2 ${
                          isScrolled
                            ? 'text-slate-600 hover:bg-slate-50 hover:text-primary-red'
                            : 'text-white/80 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all text-primary-red" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions: Search, Phone, Hamburger Menu */}
          <div id="header-actions" className="flex items-center gap-3 md:gap-4">
            {/* Search Icon */}
            <button
              id="search-btn"
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 transition-colors cursor-pointer ${
                isScrolled ? 'text-slate-600 hover:text-primary-red' : 'text-white/80 hover:text-primary-red'
              }`}
              title="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Live consultation phone link */}
            <a
              id="phone-btn"
              href="tel:0977247623"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-red text-white font-headline font-semibold text-xs tracking-wider hover:bg-[#c0000c] transition-all duration-300 shadow-md shadow-primary-red/20"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              0977 247 623
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 md:hidden transition-colors cursor-pointer ${
                isScrolled ? 'text-slate-600 hover:text-[#245B4A]' : 'text-white/80 hover:text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Modern Slide-In Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-x-0 top-16 z-40 p-6 md:hidden shadow-2xl flex flex-col gap-6 ${
              isScrolled
                ? 'bg-white border-b border-slate-100'
                : 'bg-[#245B4A]/95 backdrop-blur-lg border-b border-white/10'
            }`}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <div key={item.id} className="flex flex-col gap-2">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      onNavigateToSection(item.id);
                    }}
                    className={`font-headline text-sm tracking-wider font-semibold py-1 border-b flex justify-between items-center ${
                      isScrolled
                        ? activeSection === item.id
                          ? 'text-[#245B4A] border-slate-100'
                          : 'text-slate-600 border-slate-100'
                        : activeSection === item.id
                          ? 'text-white border-white/5'
                          : 'text-white/60 border-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <span className="w-1.5 h-1.5 bg-primary-red rounded-full shadow-sm shadow-primary-red/50"></span>
                    )}
                  </a>

                  {item.hasDropdown && (
                    <div className={`pl-4 flex flex-col gap-2.5 mt-1 border-l ${
                      isScrolled ? 'border-slate-100' : 'border-white/10'
                    }`}>
                      {categories.map((cat) => (
                        <a
                          key={cat.id}
                          href={`#products-${cat.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            onCategoryClick(cat.id);
                          }}
                          className={`text-xs transition-colors py-1 block ${
                            isScrolled
                              ? 'text-slate-500 hover:text-[#245B4A]'
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          {cat.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <a
              href="tel:0977247623"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary-red text-white text-sm font-headline font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4 fill-current" />
              HOTLINE: 0977 247 623
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Elegant Live Search Overlay Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            id="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#245B4A]/45 backdrop-blur-lg flex items-start justify-center pt-24 px-4"
          >
            <motion.div
              id="search-modal"
              initial={{ scale: 0.95, y: -25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -25 }}
              className="w-full max-w-2xl bg-[#327863] border border-white/15 rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[75vh] flex flex-col"
            >
              {/* Box title & close buttons */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-headline text-xs tracking-widest text-text-secondary uppercase font-bold">
                  Tìm kiếm thông minh tại Linh Trang Home
                </span>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* TextInput area */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Gạch Tây Ban Nha, Sen tắm Đức, Sofa Ý, Penthouse..."
                  className="w-full bg-[#245B4A]/35 border border-white/15 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-primary-red focus:ring-1 focus:ring-primary-red transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>

              {/* Live search result suggestion streams */}
              <div className="overflow-y-auto flex-1 custom-scrollbar pr-1">
                {searchQuery.trim() === '' ? (
                  <div className="py-8 text-center text-white/40 text-xs">
                    <p className="mb-2">Gõ từ khóa để bắt đầu tìm kiếm nhanh chóng</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {['Gạch ốp lát', 'Bồn cầu', 'Sofa da', 'Thiết bị vệ sinh', 'Vinhomes'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-primary-red hover:text-white text-white/70 text-[11px] transition-all cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.categories.length === 0 && searchResults.projects.length === 0 ? (
                  <div className="py-8 text-center text-white/40 text-xs text-glow">
                    Không tìm thấy kết quả phù hợp với "<span className="text-white font-semibold">{searchQuery}</span>"
                  </div>
                ) : (
                  <div className="flex flex-col gap-6 py-2">
                    {/* Categories matched */}
                    {searchResults.categories.length > 0 && (
                      <div>
                        <h4 className="font-headline text-[10px] tracking-widest text-primary-red font-bold uppercase mb-2">
                          Danh mục sản phẩm ({searchResults.categories.length})
                        </h4>
                        <div className="flex flex-col gap-1.5">
                          {searchResults.categories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setIsSearchOpen(false);
                                onCategoryClick(cat.id);
                                setSearchQuery('');
                              }}
                              className="w-full text-left p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white hover:text-primary-red transition-all flex items-center justify-between group cursor-pointer"
                            >
                              <div>
                                <span className="text-xs font-semibold block">{cat.name}</span>
                                <span className="text-[10px] text-text-secondary">{cat.description}</span>
                              </div>
                              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all text-primary-red" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects matched */}
                    {searchResults.projects.length > 0 && (
                      <div>
                        <h4 className="font-headline text-[10px] tracking-widest text-brand-blue font-bold uppercase mb-2">
                          Dự án hoàn thành ({searchResults.projects.length})
                        </h4>
                        <div className="flex flex-col gap-1.5">
                          {searchResults.projects.map((proj) => (
                            <button
                              key={proj.id}
                              onClick={() => {
                                setIsSearchOpen(false);
                                onProjectClick(proj.id);
                                setSearchQuery('');
                              }}
                              className="w-full text-left p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white hover:text-brand-blue transition-all flex items-center justify-between group cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={proj.imageUrl}
                                  alt=""
                                  className="w-10 h-10 rounded object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <span className="text-xs font-semibold block">{proj.title}</span>
                                  <span className="text-[10px] text-text-secondary">
                                    {proj.style} • {proj.location}
                                  </span>
                                </div>
                              </div>
                              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-brand-blue" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
