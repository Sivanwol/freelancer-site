'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container, type ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    initParticlesEngine(async (engine) => {
      try {
        await loadSlim(engine);
        if (mounted) {
          setInit(true);
        }
      } catch (err) {
        console.error('Failed to initialize particles:', err);
        if (mounted) {
          setError(true);
        }
      }
    }).catch((err) => {
      console.error('Particles engine initialization failed:', err);
      if (mounted) {
        setError(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: '#8b5cf6',
        },
        links: {
          color: '#8b5cf6',
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  // If there's an error, return null silently (don't break the page)
  if (error) {
    return null;
  }

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={async (container?: Container) => {
          console.log('Particles loaded', container);
        }}
        options={options}
        className="absolute inset-0 z-0"
      />
    );
  }

  // Return a placeholder div to maintain layout during initialization
  return <div className="absolute inset-0 z-0" aria-hidden="true" />;
}


