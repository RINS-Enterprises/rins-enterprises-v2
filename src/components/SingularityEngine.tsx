import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  attribute float random;
  attribute float aSeed;
  uniform float uTime;
  uniform float uPulseSpeed;
  uniform float uDepth;
  uniform float uRadius;
  uniform float uScrollY;
  uniform vec2 uMouse;

  void main() {
    vec3 pos = position;
    float t = uTime * uPulseSpeed;

    float dist = length(pos);
    float pulse = sin(t * 0.5 - dist * 0.3) * 0.5 + 0.5;
    float modulator = 1.0 + pulse * 0.4 * uDepth;

    float angle = t * 0.2 + aSeed;
    float c = cos(angle);
    float s = sin(angle);
    mat3 rotation = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
    pos = rotation * pos;
    pos.y *= modulator;

    float noise = sin(pos.x * 0.1 + t + aSeed) * cos(pos.y * 0.1 + t);
    float flow = sin(t * 0.2 + aSeed * 0.5) * 0.2;
    float breathe = sin(t * 0.5) * 0.1 + 0.9;
    float influence = (noise * flow) * breathe;

    float displacement = (sin(dist * 0.1 - t) * 0.5 + 0.5) * (uRadius * 0.05);
    float finalModulator = displacement * influence;
    pos += normalize(pos) * finalModulator;

    float scrollOffset = -uScrollY * 0.005;
    float shift = mod(uDepth + scrollOffset, 10.0);
    float zPos = shift - 5.0;
    pos.z = zPos;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (10.0 * random + 10.0) * (1.0 + sin(t + aSeed)) * (80.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= 0.6;
    vec3 color = mix(vec3(0.83, 0.69, 0.22), vec3(0.95, 0.77, 0.06), alpha);
    gl_FragColor = vec4(color, alpha * 0.7);
  }
`

export default function SingularityEngine() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.offsetWidth || window.innerWidth
    const height = container.offsetHeight || window.innerHeight

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.set(0, 0, -10)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Particle system
    const particleCount = 2800
    const positions = new Float32Array(particleCount * 3)
    const randoms = new Float32Array(particleCount)
    const seeds = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + Math.random() * 3

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      randoms[i] = Math.random()
      seeds[i] = Math.random() * Math.PI * 2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('random', new THREE.BufferAttribute(randoms, 1))
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScrollY: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPulseSpeed: { value: 1.0 },
        uDepth: { value: 4.0 },
        uRadius: { value: 5.0 },
      },
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Mouse tracking
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.05
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.05
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let startTime = performance.now()
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      const elapsed = (performance.now() - startTime) * 0.001

      material.uniforms.uTime.value = elapsed
      material.uniforms.uScrollY.value = window.scrollY
      material.uniforms.uMouse.value.set(mouse.x, mouse.y)

      // Subtle camera sway
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      const w = container.offsetWidth || window.innerWidth
      const h = container.offsetHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}
