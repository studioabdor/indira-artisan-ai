import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Texture } from 'three';

interface VisualizerProps {
  imageUrl: string;
  isLoading?: boolean;
}

export default function Visualizer({ imageUrl, isLoading = false }: VisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Initialize controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !imageUrl) return;

    // Load texture and create material
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture: Texture) => {
      const geometry = new THREE.PlaneGeometry(5, 5 * (texture.image.height / texture.image.width));
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      // Clear existing meshes
      sceneRef.current?.children
        .filter((child): child is THREE.Mesh => child instanceof THREE.Mesh)
        .forEach((child: THREE.Mesh) => sceneRef.current?.remove(child));
      
      // Add new mesh
      sceneRef.current?.add(mesh);
    });
  }, [imageUrl]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[500px] relative rounded-lg overflow-hidden"
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
        </div>
      )}
    </div>
  );
} 