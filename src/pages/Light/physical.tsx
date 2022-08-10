import {
  SphereGeometry,
  BoxGeometry,
  PerspectiveCamera,
  Mesh,
  PointLight,
  AmbientLight,
  HemisphereLight,
  WebGLRenderer,
  Scene,
  Color,
  MeshPhongMaterial,
  PlaneGeometry,
  DoubleSide,
  TextureLoader,
  RepeatWrapping,
  MeshStandardMaterial,
} from 'three';
import { useMount } from 'ahooks';
import { useRef } from 'react';
// 点光源
// 物体投影
// 基于纹理来创建材质
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
    const pointGeometry = new SphereGeometry(2, 16, 8);
    const pointMaterial = new MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: 1,
      color: 0x000000,
    });
    pointLight.add(new Mesh(pointGeometry, pointMaterial));
    pointLight.position.setX(0);
    pointLight.position.setY(100);
    pointLight.position.setZ(0);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const ambientLight = new AmbientLight(0x333333);
    ambientLight.position.setX(100);
    ambientLight.position.setY(100);
    ambientLight.position.setZ(0);
    scene.add(ambientLight);

    const hemiLight = new HemisphereLight(0xddeeff, 0x0f0e0d, 0.02);
    scene.add(hemiLight);

    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );
    camera.position.x = 0;
    camera.position.y = 200;
    camera.position.z = 300;

    scene.add(camera);

    const box = new BoxGeometry(20, 20, 20);
    const texture0 = new TextureLoader().load(
      require('@/assets/textures/hardwood2_bump.jpg'),
    );
    texture0.wrapS = texture0.wrapT = RepeatWrapping;
    const hardwood0 = new MeshPhongMaterial({
      map: texture0,
      side: DoubleSide,
    });
    const object1 = new Mesh(box, hardwood0);
    object1.castShadow = true;
    object1.position.x = 80;
    object1.position.y = 10;
    object1.position.z = 0;
    scene.add(object1);

    const sphere = new SphereGeometry(15, 15, 10);
    const texture1 = new TextureLoader().load(
      require('@/assets/textures/hardwood2_roughness.jpg'),
    );
    texture1.wrapS = texture1.wrapT = RepeatWrapping;
    const hardwood1 = new MeshPhongMaterial({
      map: texture1,
      side: DoubleSide,
    });
    const object2 = new Mesh(sphere, hardwood1);
    object2.castShadow = false;
    object2.position.x = -80;
    object2.position.y = 15;
    object2.position.z = 0;
    scene.add(object2);

    const plane = new PlaneGeometry(400, 240);
    const texture2 = new TextureLoader().load(
      require('@/assets/textures/hardwood2_diffuse.jpg'),
    );
    texture2.wrapS = texture2.wrapT = RepeatWrapping;
    const hardwood2 = new MeshPhongMaterial({
      map: texture2,
      side: DoubleSide,
    });
    const object3 = new Mesh(plane, hardwood2);
    object3.receiveShadow = true;
    object3.rotateX(Math.PI / 2);
    scene.add(object3);

    const renderer = new WebGLRenderer({
      antialias: true,
    });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    ref.current?.appendChild(renderer.domElement);

    let radian = 0.0;
    const speed = 0.02;
    const range = 40;

    function render() {
      requestAnimationFrame(render);
      radian += speed;
      pointLight.position.y = range + (Math.sin(radian) * range) / 2;
      object1.rotateY(speed);
      object2.rotateY(speed);
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    render();
  });
  return <div ref={ref}></div>;
}
