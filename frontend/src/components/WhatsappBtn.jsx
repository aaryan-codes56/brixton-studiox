const WhatsappBtn = () => {
  return (
    <a 
      href="https://wa.me/919754593311" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-[28px] right-[28px] z-50 group flex items-center justify-center cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring using Tailwind CSS 3.x arbitrary values and standard animation properties */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse-ring opacity-50"></div>
      
      {/* Button Body */}
      <div className="relative w-[56px] h-[56px] bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] transform hover:scale-105 transition-transform duration-300">
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-[28px] h-[28px]">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.183-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.765-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"></path>
        </svg>
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 bg-card text-text-white text-[12px] font-body font-medium py-1.5 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none backdrop-blur-md border border-border-subtle shadow-xl">
        Chat on WhatsApp
      </div>
    </a>
  );
};

export default WhatsappBtn;
