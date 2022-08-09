import {
  Scene,
  Color,
  Mesh,
  PerspectiveCamera,
  TextureLoader,
  AmbientLight,
  PointLight,
  RepeatWrapping,
  MeshPhongMaterial,
  DoubleSide,
  SphereGeometry,
  WebGLRenderer,
  IcosahedronGeometry,
  OctahedronGeometry,
  TetrahedronGeometry,
  RingGeometry,
  CylinderGeometry,
  BoxGeometry,
  TorusGeometry,
  TorusKnotGeometry,
} from 'three';
import { useMount } from 'ahooks';
import { useRef } from 'react';

export default function Geometry() {
  const ref = useRef<HTMLDivElement>(null);

  useMount(() => {
    if (ref.current) {
      ref.current.innerHTML = '';
    }
    // 场景
    const scene = new Scene();
    scene.background = new Color(0x000000);

    // 太阳光
    const ambientLight = new AmbientLight(0xcccccc, 0.4);
    // 点光源
    const pointLight = new PointLight(0xffffff, 0.8);
    scene.add(pointLight);
    scene.add(ambientLight);

    // 透视相机
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2000,
    );
    camera.position.y = 400;
    scene.add(camera);

    // 使用纹理进行材质创建
    const texture = new TextureLoader().load(
      require('@/assets/textures/uv_grid_opengl.jpg'),
    );
    // 这个值定义了纹理贴图在水平方向上将如何包裹
    // 这个值定义了纹理贴图在垂直方向上将如何包裹
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.anisotropy = 16; // 各向异性

    // 几何体和材质
    const material = new MeshPhongMaterial({ map: texture, side: DoubleSide }); // ???

    const geometry1 = new SphereGeometry(75, 20, 10);
    const mesh1 = new Mesh(geometry1, material);
    mesh1.position.set(-300, 0, 200);
    scene.add(mesh1);

    const geometry2 = new IcosahedronGeometry(75, 0);
    const mesh2 = new Mesh(geometry2, material);
    mesh2.position.set(-100, 0, 200);
    scene.add(mesh2);

    const geometry3 = new OctahedronGeometry(75, 0);
    const mesh3 = new Mesh(geometry3, material);
    mesh3.position.set(100, 0, 200);
    scene.add(mesh3);

    const geometry4 = new TetrahedronGeometry(75, 0);
    const mesh4 = new Mesh(geometry4, material);
    mesh4.position.set(300, 0, 200);
    scene.add(mesh4);

    const geometry5 = new TorusGeometry(50, 20, 20, 20);
    const mesh5 = new Mesh(geometry5, material);
    mesh5.position.set(100, 0, -200);
    scene.add(mesh5);

    const geometry6 = new TorusKnotGeometry(50, 10, 50, 20);
    const mesh6 = new Mesh(geometry6, material);
    mesh6.position.set(300, 0, -200);
    scene.add(mesh6);

    const geometry7 = new RingGeometry(10, 50, 20, 5, 0, Math.PI * 2);
    const mesh7 = new Mesh(geometry7, material);
    mesh7.position.set(300, 0, 0);
    scene.add(mesh7);

    const geometry8 = new CylinderGeometry(25, 75, 100, 40, 5);
    const mesh8 = new Mesh(geometry8, material);
    mesh8.position.set(-300, 0, -200);
    scene.add(mesh8);

    const geometry9 = new BoxGeometry(100, 100, 100, 4, 4, 4);
    const mesh9 = new Mesh(geometry9, material);
    mesh9.position.set(-100, 0, 0);
    scene.add(mesh9);

    // 渲染器
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current?.appendChild(renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);
      const timer = Date.now() * 0.0001;

      camera.position.x = Math.cos(timer) * 800;
      camera.position.z = Math.sin(timer) * 800;

      camera.lookAt(scene.position);

      scene.traverse(function (object: any) {
        if (object.isMesh === true) {
          object.rotation.x = timer * 5;
          object.rotation.y = timer * 2.5;
        }
      });

      renderer.render(scene, camera);
    }

    animate();
  });

  return <div ref={ref}></div>;
}
