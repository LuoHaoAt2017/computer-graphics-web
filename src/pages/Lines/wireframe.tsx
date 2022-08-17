import React from 'react';
import {
  AmbientLight,
  WebGLRenderer,
  PerspectiveCamera,
  PlaneGeometry,
  TextureLoader,
  MeshPhongMaterial,
  DoubleSide,
  RepeatWrapping,
  Scene,
  Mesh,
  IcosahedronGeometry,
  WireframeGeometry,
  LineBasicMaterial,
  LineSegments,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 点光源
class WireframeDemo extends React.Component {
  private scene = new Scene();
  private camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );
  private renderer = new WebGLRenderer({ antialias: true });
  private controls = new OrbitControls(this.camera, this.renderer.domElement);
  private ref = React.createRef<HTMLDivElement>();

  render(): React.ReactNode {
    return <div ref={this.ref}></div>;
  }

  componentDidMount() {
    this.initMainScene();
    this.initializeCamera();
    this.initialzeObjects();
    this.initialzePointLight();
    this.intialzeGround();
    this.onWindowResize();
    this.initControls();
    this.renderer.render(this.scene, this.camera);
    this.ref.current?.appendChild(this.renderer.domElement);
    const draw = () => {
      requestAnimationFrame(draw);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };

    draw();
  }

  initMainScene() {
    this.camera.lookAt(this.scene.position);
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  initControls() {
    const controls = this.controls;
    controls.minDistance = 10;
    controls.maxDistance = 500;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4.0;
  }

  initializeCamera() {
    this.camera.position.x = 200;
    this.camera.position.y = 200;
    this.camera.position.z = 200;
    this.scene.add(this.camera);
  }

  initialzePointLight() {
    const light = new AmbientLight(0x404040);
    this.scene.add(light);
  }

  initialzeObjects() {
    const geometry = new IcosahedronGeometry(40); // 正二十面体
    const wireframe = new WireframeGeometry(geometry); // 对一个geometry以线框的形式进行查看
    const material = new LineBasicMaterial({
      color: 0x4080ff,
      linewidth: 5,
      linecap: 'round',
    });
    const line = new LineSegments(wireframe, material); // 网格几何体 在若干对的顶点之间绘制的一系列的线。
    line.position.x = 0;
    line.position.y = 40;
    line.position.z = 0;

    line.castShadow = true;
    this.scene.add(line);
  }

  intialzeGround() {
    const geometry = new PlaneGeometry(400, 400);
    const texture = new TextureLoader().load(
      require('@/assets/textures/hardwood2_diffuse.jpg'),
    );
    texture.wrapS = texture.wrapT = RepeatWrapping;
    const material = new MeshPhongMaterial({ map: texture, side: DoubleSide });
    const ground = new Mesh(geometry, material);
    ground.receiveShadow = true;
    ground.rotateX(Math.PI / 2); //
    this.scene.add(ground);
  }

  onWindowResize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });
  }
}

export default WireframeDemo;
