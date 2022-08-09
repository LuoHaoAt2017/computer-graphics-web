import {
  SphereGeometry,
  BoxGeometry,
  PerspectiveCamera,
  Mesh,
  PointLight,
  AmbientLight,
  WebGLRenderer,
  Scene,
  Color,
  MeshPhongMaterial,
  PlaneGeometry,
  DoubleSide,
} from 'three';
import { useMount } from 'ahooks';
import { useRef } from 'react';
// 点光源
// 物体投影
export default function Physical() {
  const ref = useRef<HTMLDivElement>(null);

  useMount(() => {
    if (ref.current) {
      ref.current.innerHTML = '';
    }
    const scene = new Scene();
    scene.background = new Color(0x000000);

    // 点光源自身如何可见 ？？？
    const pointLight = new PointLight(0xffffff, 1, 0, 2);
    pointLight.position.setX(0);
    pointLight.position.setY(100);
    pointLight.position.setZ(0);
    scene.add(pointLight);

    const ambientLight = new AmbientLight(0x333333);
    ambientLight.position.setX(100);
    ambientLight.position.setY(100);
    ambientLight.position.setZ(0);
    scene.add(ambientLight);

    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );
    camera.position.x = 0;
    camera.position.y = 100;
    camera.position.z = 120;

    scene.add(camera);

    const material = new MeshPhongMaterial({
      color: new Color(0xffffff),
      side: DoubleSide,
    });

    const box = new BoxGeometry(20, 20, 20);
    const object1 = new Mesh(box, material);
    object1.position.x = 40;
    object1.position.y = 20;
    object1.position.z = 0;
    scene.add(object1);

    const sphere = new SphereGeometry(15, 15, 10);
    const object2 = new Mesh(sphere, material);
    object2.position.x = -40;
    object2.position.y = 15;
    object2.position.z = 0;
    scene.add(object2);

    const plane = new PlaneGeometry(200, 120);
    const object3 = new Mesh(plane, material);
    object3.rotateX(Math.PI / 2);
    scene.add(object3);

    const renderer = new WebGLRenderer({
      antialias: true,
    });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    ref.current?.appendChild(renderer.domElement);

    let radian = 0.0;
    const speed = 0.05;
    const range = 40;

    function render() {
      requestAnimationFrame(render);
      radian += speed;
      pointLight.position.y = range + Math.sin(radian) * range;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    render();
  });
  return <div ref={ref}></div>;
}
