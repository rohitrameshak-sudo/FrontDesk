import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { width?: string; height?: string; cameraZ?: number; planeSize?: number; speed?: number; className?: string };

// Retain the existing API while replacing the terrain with architectural forms.
export function GLSLHills({ width = "100vw", height = "100vh", cameraZ = 125, planeSize = 256, speed = 0.5, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = containerRef.current;
    if (!canvas || !host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); }
    catch { return; } // Leave the atmospheric backdrop intact without WebGL.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 600);
    const buildings = new THREE.Group();
    const geometries: THREE.BufferGeometry[] = [];
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vWorld;
        varying vec3 vNormal;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vWorld = world.xyz;
          vNormal = mat3(modelMatrix) * normal;
          gl_Position = projectionMatrix * viewMatrix * world;
        }`,
      fragmentShader: `
        varying vec3 vWorld;
        varying vec3 vNormal;
        void main() {
          float fade = 1.0 - smoothstep(55.0, 235.0, distance(cameraPosition, vWorld));
          float light = dot(normalize(vNormal), normalize(vec3(-0.5, 0.9, 0.6))) * 0.5 + 0.5;
          vec3 tone = mix(vec3(0.48, 0.50, 0.55), vec3(0.82, 0.83, 0.86), light);
          gl_FragColor = vec4(tone, fade * smoothstep(-6.0, 7.0, vWorld.y) * 0.52);
        }`,
      transparent: true, depthWrite: false,
    });
    const edgeMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vWorld;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vWorld = world.xyz;
          gl_Position = projectionMatrix * viewMatrix * world;
        }`,
      fragmentShader: `
        varying vec3 vWorld;
        void main() {
          float fade = 1.0 - smoothstep(55.0, 210.0, distance(cameraPosition, vWorld));
          gl_FragColor = vec4(vec3(0.51, 0.54, 0.60), fade * smoothstep(-6.0, 9.0, vWorld.y) * 0.24);
        }`,
      transparent: true, depthWrite: false,
    });
    // An open central avenue keeps the headline clear. No windows or signage.
    for (const side of [-1, 1]) {
      for (let row = 0; row < 6; row++) {
        for (let lane = 0; lane < 3; lane++) {
          const seed = row * 7 + lane * 3 + (side === 1 ? 2 : 0);
          const h = 15 + lane * 10 + ((seed * 13) % 21);
          const geometry = new THREE.BoxGeometry(12 + (seed % 3) * 3, h, 16 + (seed % 2) * 6);
          const edges = new THREE.EdgesGeometry(geometry);
          geometries.push(geometry, edges);
          const building = new THREE.Mesh(geometry, material);
          building.position.set(side * (33 + lane * 28 + (row % 2) * 3), h / 2 - 5, 40 - row * 34 - lane * 8);
          building.add(new THREE.LineSegments(edges, edgeMaterial));
          buildings.add(building);
        }
      }
    }
    buildings.scale.setScalar(Math.max(0.5, planeSize / 256));
    scene.add(buildings);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stage = canvas.closest(".hero-scroll-stage");
    let frame = 0;
    let running = false;
    let inView = true;
    let travel = 0;
    let elapsed = 0;
    let last = performance.now();
    const render = () => {
      const now = performance.now();
      const delta = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!motion.matches) {
        elapsed += delta * speed;
        const distance = (stage?.clientHeight ?? 0) - window.innerHeight;
        const target = stage ? THREE.MathUtils.clamp(-stage.getBoundingClientRect().top / Math.max(distance, 1), 0, 1) : 0;
        travel = THREE.MathUtils.damp(travel, target, 7, delta);
      } else { travel = 0; }
      const drift = motion.matches ? 0 : Math.sin(elapsed * 0.18) * 1.2;
      camera.position.set(travel * 10 + drift, 16 + travel * 34, cameraZ - travel * 66);
      camera.lookAt(-travel * 6, 28 - travel * 14, -travel * 32);
      renderer.render(scene, camera);
    };
    const loop = () => { render(); frame = requestAnimationFrame(loop); };
    const stop = () => { running = false; cancelAnimationFrame(frame); };
    const sync = () => {
      if (!inView || document.hidden || motion.matches) { stop(); render(); return; }
      if (!running) { running = true; last = performance.now(); frame = requestAnimationFrame(loop); }
    };
    const resize = () => {
      const w = Math.max(host.clientWidth, 1);
      const h = Math.max(host.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }, { threshold: 0.01 });
    resizeObserver.observe(host);
    observer.observe(host);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    resize();
    sync();
    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      geometries.forEach(geometry => geometry.dispose());
      material.dispose();
      edgeMaterial.dispose();
      renderer.dispose();
    };
  }, [cameraZ, planeSize, speed]);
  return <div ref={containerRef} className={className} style={{ position: "relative", width, height }}>
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }} />
  </div>;
}
