import React from 'react';
import {
  PointLight,
  WebGLRenderer,
  PerspectiveCamera,
  SphereGeometry,
  PlaneGeometry,
  TextureLoader,
  MeshPhongMaterial,
  MeshBasicMaterial,
  DoubleSide,
  RepeatWrapping,
  PointLightHelper,
  Scene,
  Mesh,
} from 'three';

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
    this.camera.lookAt(this.scene.position);
    this.ref.current?.appendChild(this.renderer.domElement);

    let radian = 0.01;
    const speed = 0.02;
    const draw = () => {
      requestAnimationFrame(draw);
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
    this.pointRedLight.castShadow = true;
    const lightHelper = new PointLightHelper(this.pointRedLight, 2);
    this.scene.add(lightHelper);
    this.scene.add(this.pointRedLight);

    this.pointBlueLight.castShadow = true;
    const geometry = new SphereGeometry(2);
    const material = new MeshBasicMaterial({ color: 0x0000ff }); // 不受光照的影响
    this.pointBlueLight.add(new Mesh(geometry, material));
    this.scene.add(this.pointBlueLight);
  }

  initialzeObjects() {
    const geometry = new SphereGeometry(this.R, this.R, this.R);
    const material = new MeshPhongMaterial();
    const sphere = new Mesh(geometry, material);
    sphere.position.x = 0;
    sphere.position.y = 40;
    sphere.position.z = 0;
    sphere.castShadow = true;
    this.scene.add(sphere);
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
