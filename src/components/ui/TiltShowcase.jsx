import React from 'react';
import { Tilt } from './tilt';
import { Spotlight } from './spotlight';

// Movie/Showcase data
const showcaseItems = [
  {
    title: 'Neovim Everforest 2049',
    subtitle: 'I use neovim BTW',
    image: 'https://res.cloudinary.com/dn6xis9je/image/upload/v1767450595/screenshot-3_ipjf5q.png'
  },

  {
    title: 'Lienzo Fashion ',
    subtitle: 'shop.lienzo.com Minimal Frontend',
    image: 'https://res.cloudinary.com/dn6xis9je/image/upload/v1767452681/l3_nvnnwm.png'
  },
  //
  {
    title: '69: Arch Hyprland Setup',
    subtitle: 'Arch BTW',
    image: 'https://res.cloudinary.com/dn6xis9je/image/upload/v1767451526/screenshot-2_cpraxu.png'
  },
];

export default function TiltShowcase() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Dotted Background with Fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          opacity: 0.15,
        }}
      />
      {/* Top Fade Overlay */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, white, transparent)',
        }}
      />
      {/* Bottom Fade Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, white, transparent)',
        }}
      />

      <div className="text-center mb-12 relative z-10">
        <h3 className="text-sm uppercase tracking-wide text-gray-500">
          Interactive Experience
        </h3>
        <h2 className="text-4xl font-bold">Featured Showcase</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto px-4 relative z-10">
        {showcaseItems.map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <Tilt
              rotationFactor={6}
              isRevese
              style={{
                transformOrigin: 'center center',
              }}
              springOptions={{
                stiffness: 26.7,
                damping: 4.1,
                mass: 0.2,
              }}
              className="group relative rounded-lg mb-4"
            >
              <Spotlight
                className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
                size={248}
                springOptions={{
                  stiffness: 26.7,
                  damping: 4.1,
                  mass: 0.2,
                }}
              />
              <img
                src={item.image}
                alt={item.title}
                className="h-64 w-full rounded-lg object-cover grayscale duration-700 group-hover:grayscale-0 transition-all"
              />
            </Tilt>
            <div className="flex flex-col space-y-0.5 pb-0 pt-3">
              <h3 className="font-mono text-sm font-medium text-gray-500">
                {item.subtitle}
              </h3>
              <p className="text-sm text-black font-semibold">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Basic Tilt Cards Section */}
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto px-4 mt-16 relative z-10">
        {[
          {
            title: 'HomeLab Server',
            subtitle: 'HomeLab powered by Proxmox',
            image: 'https://res.cloudinary.com/dn6xis9je/image/upload/v1767451066/WhatsApp_Image_2026-01-03_at_8.06.18_PM_l3wzbz.jpg'
          },
        ].map((item, idx) => (
          <Tilt key={idx} rotationFactor={8} isRevese>
            <div
              style={{
                borderRadius: '12px',
              }}
              className="flex max-w-[270px] mx-auto flex-col overflow-hidden border-2 border-gray-200 bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h1 className="font-mono leading-snug text-gray-900 font-bold">
                  {item.title}
                </h1>
                <p className="text-gray-600 text-sm">{item.subtitle}</p>
              </div>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}
