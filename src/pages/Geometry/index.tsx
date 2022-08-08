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
  Object3D,
} from 'three';
import { useMount } from 'ahooks';
import { useRef } from 'react';

import styles from './index.less';

export default function Geometry() {
  const ref = useRef<HTMLDivElement>(null);

  useMount(() => {
    if (ref.current) {
      ref.current.innerHTML = '';
    }
    // 场景
    const scene = new Scene();
    scene.background = new Color(0x000000);

    // 用平行光来模拟太阳光
    const ambientLight = new AmbientLight(0xcccccc, 0.4);
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
    camera.lookAt(scene.position);
    scene.add(camera);

    // 纹理
    const texture = new TextureLoader().load(
      require('@/assets/textures/uv_grid_opengl.jpg'),
    );
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.anisotropy = 16; // 各向异性

    // 几何体和材质
    const material = new MeshPhongMaterial({ map: texture, side: DoubleSide }); // ???
    const geometry = new SphereGeometry(75, 20, 10);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

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
