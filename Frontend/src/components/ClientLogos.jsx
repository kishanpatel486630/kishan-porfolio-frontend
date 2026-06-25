import { usePortfolio } from '../context/PortfolioContext';

export default function ClientLogos() {
  const { clientLogos } = usePortfolio();
  // Double the logos for seamless infinite scroll
  const doubled = [...(clientLogos || []), ...(clientLogos || [])];

  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-center text-sm text-text-muted uppercase tracking-widest font-medium">
          Trusted by industry leaders
        </p>
      </div>

      {/* Infinite scroll strip */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-scroll">
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 mx-10 md:mx-14 flex items-center justify-center"
            >
              <span className="text-xl md:text-2xl font-bold text-text-primary/20 hover:text-text-primary/40 transition-colors duration-500 whitespace-nowrap tracking-wide">
                {logo.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
