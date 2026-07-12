import React from "react";

export default function Footer() {
  return (
    <footer className="py-[80px] px-[10%] pb-[40px] flex md:h-screen md:py-0 items-center justify-center bg-transparent font-sans antialiased">
      <div className="max-w-[1000px] w-full flex flex-col items-center">
        {/* 1. IDENTITAS & SUB-TAG */}
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center gap-[12px] mb-[24px] cursor-pointer group">
            {/* Menggunakan tag <img> sebagai tempat foto/logo */}
            <img
              src="https://placehold.co/100x100/4ac8ff/ffffff?text=WM"
              alt="Foto Profil Wan Ma2"
              className="w-[36px] h-[36px] object-cover rounded-full border-2 border-border-primary transition-all duration-300 ease-in-out shadow-[0_4px_10px_rgba(0,0,0,0.04)] group-hover:scale-110 group-hover:-rotate-[5deg] group-hover:border-primary group-hover:shadow-[0_8px_20px_rgba(74,200,255,0.2)]"
            />
            <h2 className="text-[1.75rem] font-extrabold text-text-primary tracking-[-0.5px]">WAN MA2</h2>
          </div>

          <div className="flex justify-center flex-wrap gap-[32px] mb-[48px] max-md:flex-col max-md:items-center max-md:gap-[16px]">
            <span className="flex items-center gap-[10px] text-[0.8rem] font-semibold text-text-secondary tracking-[1.5px] uppercase">
              <span className="w-[6px] h-[6px] bg-primary rounded-full"></span> PENGEMBANGAN WEB
            </span>
            <span className="flex items-center gap-[10px] text-[0.8rem] font-semibold text-text-secondary tracking-[1.5px] uppercase">
              <span className="w-[6px] h-[6px] bg-primary rounded-full"></span> DESAIN ANTARMUKA
            </span>
            <span className="flex items-center gap-[10px] text-[0.8rem] font-semibold text-text-secondary tracking-[1.5px] uppercase">
              <span className="w-[6px] h-[6px] bg-primary rounded-full"></span> INFRASTRUKTUR SISTEM
            </span>
          </div>
        </div>

        {/* 2. GARIS PEMBATAS */}
        <div className="w-full h-[1px] bg-border-primary mb-[48px]"></div>

        {/* 3. NAVIGASI & SOSIAL MEDIA */}
        <div className="flex flex-col items-center w-full">
          <ul className="list-none flex justify-center flex-wrap gap-[40px] mb-[40px] max-sm:gap-[20px] max-sm:flex-col max-sm:items-center">
            <li><a href="#hero" className="no-underline text-[0.95rem] font-medium text-text-primary transition-colors duration-300 hover:text-primary">Beranda</a></li>
            <li><a href="#about" className="no-underline text-[0.95rem] font-medium text-text-primary transition-colors duration-300 hover:text-primary">Tentang Saya</a></li>
            <li><a href="#skills" className="no-underline text-[0.95rem] font-medium text-text-primary transition-colors duration-300 hover:text-primary">Keahlian</a></li>
            <li><a href="#projects" className="no-underline text-[0.95rem] font-medium text-text-primary transition-colors duration-300 hover:text-primary">Proyek</a></li>
            <li><a href="#contact" className="no-underline text-[0.95rem] font-medium text-text-primary transition-colors duration-300 hover:text-primary">Kontak</a></li>
          </ul>

          <div className="flex justify-center flex-wrap gap-[16px] mb-[64px]">
            {/* Kotak Squircle dengan warna dari paletmu */}
            <a href="mailto:email@wanma2.com" className="w-[52px] h-[52px] bg-surface border border-border-primary rounded-[16px] flex items-center justify-center text-[1.3rem] text-text-secondary no-underline transition-all duration-300 ease-in-out hover:bg-primary/10 hover:border-primary hover:text-primary hover:-translate-y-[4px] hover:scale-[1.05] hover:shadow-[0_10px_20px_rgba(74,200,255,0.15)]" title="Email">
              <i className="fa-regular fa-envelope"></i>
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[52px] h-[52px] bg-surface border border-border-primary rounded-[16px] flex items-center justify-center text-[1.3rem] text-text-secondary no-underline transition-all duration-300 ease-in-out hover:bg-primary/10 hover:border-primary hover:text-primary hover:-translate-y-[4px] hover:scale-[1.05] hover:shadow-[0_10px_20px_rgba(74,200,255,0.15)]"
              title="WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a
              href="https://github.com/wanma2"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[52px] h-[52px] bg-surface border border-border-primary rounded-[16px] flex items-center justify-center text-[1.3rem] text-text-secondary no-underline transition-all duration-300 ease-in-out hover:bg-primary/10 hover:border-primary hover:text-primary hover:-translate-y-[4px] hover:scale-[1.05] hover:shadow-[0_10px_20px_rgba(74,200,255,0.15)]"
              title="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/wanma2"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[52px] h-[52px] bg-surface border border-border-primary rounded-[16px] flex items-center justify-center text-[1.3rem] text-text-secondary no-underline transition-all duration-300 ease-in-out hover:bg-primary/10 hover:border-primary hover:text-primary hover:-translate-y-[4px] hover:scale-[1.05] hover:shadow-[0_10px_20px_rgba(74,200,255,0.15)]"
              title="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="https://tiktok.com/@wanma2"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[52px] h-[52px] bg-surface border border-border-primary rounded-[16px] flex items-center justify-center text-[1.3rem] text-text-secondary no-underline transition-all duration-300 ease-in-out hover:bg-primary/10 hover:border-primary hover:text-primary hover:-translate-y-[4px] hover:scale-[1.05] hover:shadow-[0_10px_20px_rgba(74,200,255,0.15)]"
              title="TikTok"
            >
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>

        {/* 4. LEGALITAS & HAK CIPTA */}
        <div className="flex flex-col items-center gap-[16px] text-center">
          <div className="flex items-center gap-[16px] flex-wrap justify-center">
            <a href="#" className="no-underline text-[0.85rem] font-medium text-text-secondary transition-colors duration-300 hover:text-primary">Syarat & Ketentuan</a>
            <span className="text-border-primary text-[0.9rem]">|</span>
            <a href="#" className="no-underline text-[0.85rem] font-medium text-text-secondary transition-colors duration-300 hover:text-primary">Kebijakan Privasi</a>
            <span className="text-border-primary text-[0.9rem]">|</span>
            <a href="#" className="no-underline text-[0.85rem] font-medium text-text-secondary transition-colors duration-300 hover:text-primary">Penafian</a>
          </div>
          <p className="text-[0.85rem] text-text-muted font-normal">
            &copy; 2026 Wan Ma2. Hak Cipta Dilindungi Sepenuhnya.
          </p>
        </div>
      </div>
    </footer>
  );
}
