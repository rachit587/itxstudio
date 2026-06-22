import { motion } from "framer-motion";
import { Check, IndianRupee, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { LiquidMetalButton } from "./ui/liquid-metal-button";




import * as THREE from "three";

/* Spinning Globe */
function SpinningGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Clear any existing children to prevent double-rendering in React StrictMode
    container.innerHTML = "";

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 2.5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth || 80, container.clientHeight || 80);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry & Material
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.6,
      metalness: 0.1,
    });

    const texture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
      () => {},
      undefined,
      (err) => {
        console.error("Failed to load earth texture, falling back to blue sphere", err);
        material.color.setHex(0x1a3a5f);
        material.needsUpdate = true;
      }
    );
    material.map = texture;

    const earth = new THREE.Mesh(geometry, material);
    // Tilt the earth on its axis
    earth.rotation.z = 23.5 * Math.PI / 180;
    scene.add(earth);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Animation loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      earth.rotation.y += 0.005; // Spin on its axis
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] flex items-center justify-center relative overflow-hidden"
    />
  );
}

const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;

export default function About() {
  return (
    <div className="py-24 md:py-32 bg-[#0f0f0f] relative z-10 flex flex-col items-center px-4 md:px-8 overflow-hidden">
      
      {/* Hero Tagline */}
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="text-[clamp(2rem,4.5vw,4.5rem)] text-white text-center max-w-4xl leading-tight mb-6"
      >
        Built Different. Priced Fair.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
        className="text-[#9a9a9a] text-center text-base md:text-lg max-w-xl mb-16"
      >
        We build custom digital products for Indian &amp; international clients — no templates, no shortcuts.
      </motion.p>

      {/* Vision Statement */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
        className="flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full max-w-5xl mb-24 bg-[#111111] p-8 md:p-12 rounded-3xl border border-[#222222] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff66]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="flex-1 text-center md:text-left relative z-10">
          <h3 className="text-3xl md:text-4xl text-white font-medium mb-6 tracking-tight">We have bigger dreams.</h3>
          <p className="text-[#9a9a9a] text-base md:text-lg leading-relaxed mb-4">
            We don't chase project counts or churn out templates. We chase perfection. Our goal is to craft immersive digital experiences that don't just look phenomenal—they drive real, measurable value.
          </p>
          <p className="text-[#9a9a9a] text-base md:text-lg leading-relaxed">
            We charge what we're worth because we deliver uncompromising quality that elevates your brand above the noise. Your success is our reputation.
          </p>
        </div>
        
        <div className="w-36 h-36 md:w-44 md:h-44 flex flex-col items-center justify-center gap-2 md:gap-3 bg-[#0a0a0a] rounded-full border border-[#222222] shadow-[0_0_40px_rgba(0,255,102,0.05)] relative z-10 flex-shrink-0">
          <SpinningGlobe />
          <div className="text-[#00ff66] uppercase tracking-widest text-[9px] md:text-[10px] font-bold text-center">Global Standard</div>
        </div>
      </motion.div>

      {/* ─── Pricing Section ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="w-full max-w-3xl mb-24"
      >
        <div className="relative rounded-3xl border border-[#222222] bg-gradient-to-br from-[#111111] via-[#0f0f0f] to-[#0a0a0a] p-8 md:p-12 overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#00ff66]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#00ff66]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="bg-[#00ff66]/10 border border-[#00ff66]/20 rounded-full p-3">
                <IndianRupee className="w-6 h-6 text-[#00ff66]" />
              </div>
              <h3 className="text-2xl md:text-3xl text-white">How We Price</h3>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
              className="text-[#9a9a9a] text-center text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              We don&apos;t believe in fixed packages. You tell us what you need — we show you a working demo — and then we talk business. 
              <span className="text-white font-medium"> You only pay for the features you choose.</span> No hidden costs, no bloated bundles. You save money, we save effort — everyone wins.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35, ease: smoothEase }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl md:text-5xl text-[#00ff66] font-medium">₹ Custom</span>
              </div>
              <p className="text-[#9a9a9a] text-sm text-center">
                Your price. Your features. Nothing extra.
              </p>
              <div className="mt-4">
                <LiquidMetalButton
                  label="Let's Talk"
                  icon={<ArrowRight size={18} />}
                  width={180}
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Key Facts Pills */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
        className="flex flex-wrap justify-center gap-4 max-w-3xl mb-16"
      >
        {[
          "One-time fee — no monthly charges",
          "Best value for money",
          "Built for businesses of all sizes",
          "From startups to established businesses"
        ].map((fact, i) => (
          <div key={i} className="flex items-center gap-2 bg-[#1a1a1a] border border-[#222222] rounded-full px-5 py-2 transition-all duration-300 ease-out hover:border-[#00ff66]/30 hover:shadow-[0_0_15px_rgba(0,255,102,0.08)]">
            <Check className="w-4 h-4 text-[#00ff66] flex-shrink-0" />
            <span className="text-[#9a9a9a] text-sm md:text-base">{fact}</span>
          </div>
        ))}
      </motion.div>

      {/* Location */}
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ease: smoothEase }}
        className="text-[#9a9a9a] text-xs uppercase tracking-[0.2em]"
      >
        Team based in Bengaluru &amp; Kolkata
      </motion.p>
    </div>
  );
}
