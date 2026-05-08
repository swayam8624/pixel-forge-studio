import { useEffect, useRef } from "react";
import * as THREE from "three";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

interface Props {
  geometry: "bust" | "torus" | "ruins";
  objFile?: string;
}

/**
 * Lightweight Three.js viewer with procedural placeholder geometry.
 * Drop in real OBJ loading later by swapping the geometry block.
 */
    export const ModelViewer = ({ geometry, objFile }: Props) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0d0d);

    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.5, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0xf59e0b, 4, 10);
    rim.position.set(-2, 1, -2);
    scene.add(rim);

    // Geometry by type
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.4, roughness: 0.4 });

    if (objFile) {
      const loader = new OBJLoader();
      loader.load(
        objFile,
        (obj) => {
          // Center and scale the loaded object to fit nicely
          const box = new THREE.Box3().setFromObject(obj);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3()).length();
          
          obj.position.sub(center);
          
          const scale = 2.0 / size; // target size of ~2 units
          obj.scale.set(scale, scale, scale);

          // Apply our standard material to all meshes inside the OBJ
          obj.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = mat;
            }
          });
          
          group.add(obj);
        },
        undefined,
        (error) => {
          console.error("Error loading OBJ file:", error);
        }
      );
    } else if (geometry === "bust") {
      const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 1), mat);
      head.position.y = 0.5;
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.4, 0.6, 8), mat);
      neck.position.y = -0.2;
      const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.6 }));
      base.position.y = -0.7;
      group.add(head, neck, base);
    } else if (geometry === "torus") {
      const t = new THREE.Mesh(new THREE.TorusKnotGeometry(0.7, 0.25, 200, 32),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.15 }));
      group.add(t);
    } else {
      const arch = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.12, 8, 16, Math.PI), mat);
      arch.rotation.z = Math.PI;
      arch.position.y = 0.3;
      const wallL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 0.3), mat);
      wallL.position.set(-0.7, -0.1, 0);
      const wallR = wallL.clone();
      wallR.position.x = 0.7;
      const ground = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.15, 32),
        new THREE.MeshStandardMaterial({ color: 0x222018, roughness: 0.9 }));
      ground.position.y = -0.75;
      const ember = new THREE.PointLight(0xff6a00, 3, 4);
      ember.position.set(0, -0.3, 0);
      group.add(arch, wallL, wallR, ground, ember);
    }
    scene.add(group);

    // Drag rotate
    let isDown = false;
    let lastX = 0, lastY = 0;
    let rotY = 0, rotX = 0;
    let autoRotate = true;

    const onDown = (e: PointerEvent) => {
      isDown = true; autoRotate = false;
      lastX = e.clientX; lastY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      rotY += (e.clientX - lastX) * 0.01;
      rotX += (e.clientY - lastY) * 0.01;
      rotX = Math.max(-1.2, Math.min(1.2, rotX));
      lastX = e.clientX; lastY = e.clientY;
    };
    const onUp = () => { isDown = false; };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(2, Math.min(8, camera.position.z + e.deltaY * 0.005));
    };

    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });

    let raf = 0;
    const animate = () => {
      if (autoRotate) rotY += 0.005;
      group.rotation.y = rotY;
      group.rotation.x = rotX;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("wheel", onWheel);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [geometry]);

  return (
    <div
      ref={mountRef}
      className="w-full h-[60vh] rounded-2xl overflow-hidden bg-background border border-white/5 cursor-grab active:cursor-grabbing"
    />
  );
};
