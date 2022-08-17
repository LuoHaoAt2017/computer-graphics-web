import React from 'react';
import {
  PointLight,
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
class PointLightDemo extends React.Component {
  private scene = new Scene();
  private camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );
  private pointRedLight = new PointLight(0xff0000, 1);
  private pointBlueLight = new PointLight(0x0000ff, 1);
  private renderer = new WebGLRenderer({ antialias: true });
  private ref = React.createRef<HTMLDivElement>();
  private R = 40;

  constructor(props) {
    super(props);
    this.initializeRenderer();
    this.initializeCamera();
  }

  render(): React.ReactNode {
    return <div ref={this.ref}></div>;
  }

  componentDidMount() {
    this.initialzeObjects();
    this.initialzePointLight();
    this.intialzeGround();
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.lookAt(this.scene.position);
    this.ref.current?.appendChild(this.renderer.domElement);

    let radian = 0.01;
    const speed = 0.02;
    const draw = () => {
      requestAnimationFrame(draw);
      controls.update();
      radian = radian + speed;
      this.pointRedLight.position.x = Math.sin(radian) * (this.R + 20);
      this.pointRedLight.position.y = this.R;
      this.pointRedLight.position.z = Math.cos(radian) * (this.R + 20);

      this.pointBlueLight.position.x = Math.cos(radian) * (this.R + 20);
      this.pointBlueLight.position.y = this.R;
      this.pointBlueLight.position.z = Math.sin(radian) * (this.R + 20);

      this.renderer.render(this.scene, this.camera);
    };

    draw();
  }

  initializeRenderer() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000);
    this.renderer.shadowMap.enabled = true;
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
    const line = new LineSegments(wireframe, material); // 网格几何体
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
}

export default PointLightDemo;
