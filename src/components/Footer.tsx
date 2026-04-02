import { MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#00ff66] py-8 w-full relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        
        <div className="text-[#9a9a9a] text-[10px] md:text-sm text-center md:text-left">
          &copy; 2026 ITX Studio. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://wa.me/918167558126"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9a9a9a] hover:text-[#00ff66] transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          
          <a
            href="mailto:itxstudio.com@gmail.com"
            className="text-[#9a9a9a] hover:text-[#00ff66] transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
