import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  coverURL: string;
}

/**
 * A full-bleed Three.js book that opens & rotates as the user scrolls
 * through the hero section. Pure WebGL; no external loaders.
 */
export const BookScrollHero = ({ coverURL }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const section = sectionRef.current;
    if (!mount || !section) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(3, 4, 5);
    scene.add(key);
    const amber = new THREE.PointLight(0xf59e0b, 6, 12);
    amber.position.set(-3, 1, 2);
    scene.add(amber);

    // Textures
    const loader = new THREE.TextureLoader();
    const coverTex = loader.load(coverURL);
    coverTex.colorSpace = THREE.SRGBColorSpace;

    // Materials
    const coverMat = new THREE.MeshStandardMaterial({ map: coverTex, roughness: 0.55, metalness: 0.05 });
    const backMat = new THREE.MeshStandardMaterial({ color: 0x14110e, roughness: 0.7 });
    const pageMat = new THREE.MeshStandardMaterial({ color: 0xf0ede8, roughness: 0.95 });
    const spineMat = new THREE.MeshStandardMaterial({ color: 0x1a1714, roughness: 0.7 });

    const W = 1.8, H = 2.4, T = 0.06; // cover dims
    const SPINE = 0.32;

    // Group containing whole book
    const bookGroup = new THREE.Group();
    scene.add(bookGroup);

    // Pages stack (between covers)
    const pages = new THREE.Mesh(
      new THREE.BoxGeometry(W * 0.96, H * 0.96, SPINE - 0.04),
      pageMat
    );
    bookGroup.add(pages);

    // Spine
    const spine = new THREE.Mesh(new THREE.BoxGeometry(0.04, H, SPINE), spineMat);
    spine.position.x = -W / 2 - 0.02;
    bookGroup.add(spine);

    // Front cover (hinged on left edge)
    const frontHinge = new THREE.Group();
    frontHinge.position.set(-W / 2, 0, SPINE / 2);
    bookGroup.add(frontHinge);
    const front = new THREE.Mesh(
      new THREE.BoxGeometry(W, H, T),
      [backMat, backMat, backMat, backMat, coverMat, backMat] // +Z face = cover art
    );
    front.position.set(W / 2, 0, T / 2);
    frontHinge.add(front);

    // Back cover
    const back = new THREE.Mesh(new THREE.BoxGeometry(W, H, T), backMat);
    back.position.set(0, 0, -SPINE / 2 - T / 2);
    bookGroup.add(back);

    // Subtle floor glow
    const glowGeom = new THREE.PlaneGeometry(8, 4);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.08 });
    const glow = new THREE.Mesh(glowGeom, glowMat);
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -1.6;
    scene.add(glow);

    let raf = 0;
    let targetProgress = 0;
    let progress = 0;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section top hits viewport top, 1 when bottom hits top
      const total = section.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      targetProgress = total > 0 ? scrolled / total : 0;
    };

    const animate = () => {
      progress += (targetProgress - progress) * 0.08;

      // Phase 1 (0 → 0.5): rise + rotate in
      // Phase 2 (0.5 → 1): open the cover
      const rise = Math.min(progress * 2, 1);
      const open = Math.max((progress - 0.5) * 2, 0);

      bookGroup.position.y = -1.5 + rise * 1.5;
      bookGroup.rotation.y = -0.6 + rise * 0.8 + open * -0.3;
      bookGroup.rotation.x = 0.15 - rise * 0.15;

      // Open front cover up to ~120deg
      frontHinge.rotation.y = -open * (Math.PI * 0.66);

      glowMat.opacity = 0.04 + rise * 0.1;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const onScroll = () => updateProgress();
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    updateProgress();
    animate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      coverTex.dispose();
    };
  }, [coverURL]);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div ref={mountRef} className="absolute inset-0" />
        <div className="absolute inset-x-0 top-20 z-10 text-center px-6 pointer-events-none">
          <p className="font-mono-tech text-xs uppercase tracking-widest text-amber">/ a novel</p>
        </div>
        <div className="absolute inset-x-0 bottom-10 z-10 text-center px-6 pointer-events-none">
          <p className="font-mono-tech text-xs uppercase text-muted-foreground animate-pulse">scroll to open ↓</p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </div>
    </section>
  );
};
