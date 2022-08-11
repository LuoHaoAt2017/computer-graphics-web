import React from 'react';
import {
  SpotLight,
  WebGLRenderer,
  PerspectiveCamera,
  SphereGeometry,
  PlaneGeometry,
  TextureLoader,
  MeshPhongMaterial,
  MeshBasicMaterial,
  DoubleSide,
  RepeatWrapping,
  SpotLightHelper,
  CameraHelper,
  Scene,
  Mesh,
  Object3D,
  BoxGeometry,
  AmbientLight,
} from 'three';

// 聚光源
class SpotLightDemo extends React.Component {
  private scene = new Scene();
  private camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );
  private spotLight = new SpotLight(0xff0000, 1);
  private ambientLight = new AmbientLight(0xffffff, 0.5);
  private renderer = new WebGLRenderer({ antialias: true });
  private ref = React.createRef<HTMLDivElement>();
  private R = 40;

  render(): React.ReactNode {
    return <div ref={this.ref}></div>;
  }

  componentDidMount() {
    this.initializeRenderer();
    this.initializeCamera();
    this.initialzeObjects();
    this.initialzeSpotLight();
    this.intialzeGround();
    this.scene.add(this.ambientLight);
    this.ref.current?.appendChild(this.renderer.domElement);

    let radian = 0.01;
    const speed = 0.02;
    const draw = () => {
      requestAnimationFrame(draw);
      radian = radian + speed;
      this.spotLight.position.x = 100 * Math.sin(radian);
      this.spotLight.position.y = 200;
      this.spotLight.position.z = 0;
      this.camera.lookAt(this.scene.position);
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
    this.camera.position.x = 300;
    this.camera.position.y = 300;
    this.camera.position.z = 300;
    this.scene.add(this.camera);

    const helper = new CameraHelper(this.spotLight.shadow.camera);
    this.scene.add(helper);
  }

  initialzeSpotLight() {
    this.spotLight.castShadow = true;
    const target = new Object3D();
    target.position.x = 0;
    target.position.y = 20;
    target.position.z = 0;
    this.spotLight.target = target;
    this.spotLight.angle = Math.PI / 4;
    this.spotLight.penumbra = 0.1;
    this.spotLight.decay = 2;
    this.scene.add(this.spotLight);
  }

  initialzeObjects() {
    const geometry = new SphereGeometry(this.R, this.R, this.R);
    const material = new MeshPhongMaterial({
      color: 0x0000ff,
    });
    const sphere = new Mesh(geometry, material);
    sphere.position.x = 0;
    sphere.position.y = this.R;
    sphere.position.z = 0;
    sphere.castShadow = true;
    this.scene.add(sphere);

    const boxGeometry = new BoxGeometry(this.R, this.R, this.R);
    const boxMaterial = new MeshPhongMaterial({ color: 0x00ff00 });
    const boxMesh = new Mesh(boxGeometry, boxMaterial);
    boxMesh.position.x = 4 * this.R;
    boxMesh.position.y = this.R;
    boxMesh.position.z = 0;
    boxMesh.castShadow = true;
    this.scene.add(boxMesh);
  }

  intialzeGround() {
    const geometry = new PlaneGeometry(900, 900);
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

export default SpotLightDemo;
