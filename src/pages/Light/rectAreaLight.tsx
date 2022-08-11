import React from 'react';
import {
  RectAreaLight,
  WebGLRenderer,
  PerspectiveCamera,
  SphereGeometry,
  PlaneGeometry,
  TextureLoader,
  MeshPhongMaterial,
  DoubleSide,
  RepeatWrapping,
  Scene,
  Mesh,
  AmbientLight,
  PlaneBufferGeometry,
  MeshPhysicalMaterial,
} from 'three';
import { RectAreaLightUniformsLib } from '@/libs/RectAreaLightUniformsLib';
// 聚光源
class ReactAreaLightDemo extends React.Component {
  private scene = new Scene();
  private camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );
  private ambientLight = new AmbientLight(0x666666, 0.5);
  private renderer = new WebGLRenderer({ antialias: true });
  private ref = React.createRef<HTMLDivElement>();
  private R = 30;

  render(): React.ReactNode {
    return <div ref={this.ref}></div>;
  }

  componentDidMount() {
    RectAreaLightUniformsLib.init();
    this.initializeRenderer();
    this.initializeCamera();
    this.initialzeObjects();
    this.initialzeLights();
    this.intialzeGround();
    this.scene.add(this.ambientLight);
    this.ref.current?.appendChild(this.renderer.domElement);

    let radian = 0.01;
    const speed = 0.02;
    const draw = () => {
      requestAnimationFrame(draw);
      radian = radian + speed;
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
    this.camera.position.x = 200;
    this.camera.position.y = 200;
    this.camera.position.z = 200;
    this.scene.add(this.camera);
  }

  initialzeLights() {
    const W = 50;
    const H = 100;
    const rectAreaLight1 = new RectAreaLight(0xff0000, 5, W, H);
    const rectAreaLight2 = new RectAreaLight(0xffff00, 5, W, H);
    const rectAreaLight3 = new RectAreaLight(0x00ff00, 5, W, H);
    const rectAreaLight4 = new RectAreaLight(0x0000ff, 5, W, H);
    const rectAreaLight5 = new RectAreaLight(0x00ffff, 5, W, H);
    const rectAreaLight6 = new RectAreaLight(0xff00ff, 5, W, H);

    const geometry = new PlaneBufferGeometry();
    const material = new MeshPhysicalMaterial();
    const rectAreaLightMesh = new Mesh(geometry, material);
    rectAreaLightMesh.scale.x = W;
    rectAreaLightMesh.scale.y = H;

    rectAreaLight1.position.x = 0;
    rectAreaLight1.position.y = 50;
    rectAreaLight1.position.z = -100;
    rectAreaLight1.add(rectAreaLightMesh.clone());

    rectAreaLight2.position.x = -100;
    rectAreaLight2.position.y = 50;
    rectAreaLight2.position.z = -100;
    rectAreaLight2.add(rectAreaLightMesh.clone());

    rectAreaLight3.position.x = 100;
    rectAreaLight3.position.y = 50;
    rectAreaLight3.position.z = -100;
    rectAreaLight3.add(rectAreaLightMesh.clone());

    rectAreaLight4.position.x = -100;
    rectAreaLight4.position.y = 50;
    rectAreaLight4.position.z = 100;
    rectAreaLight4.add(rectAreaLightMesh.clone());

    rectAreaLight5.position.x = 0;
    rectAreaLight5.position.y = 50;
    rectAreaLight5.position.z = 100;
    rectAreaLight5.add(rectAreaLightMesh.clone());

    rectAreaLight6.position.x = 100;
    rectAreaLight6.position.y = 50;
    rectAreaLight6.position.z = 100;
    rectAreaLight6.add(rectAreaLightMesh.clone());

    this.scene.add(rectAreaLight1);
    this.scene.add(rectAreaLight2);
    this.scene.add(rectAreaLight3);
    this.scene.add(rectAreaLight4);
    this.scene.add(rectAreaLight5);
    this.scene.add(rectAreaLight6);
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
  }

  intialzeGround() {
    const geometry = new PlaneGeometry(900, 900);
    const texture = new TextureLoader().load(
      require('@/assets/textures/hardwood2_diffuse.jpg'),
    );
    texture.wrapS = texture.wrapT = RepeatWrapping;
    const material = new MeshPhongMaterial({ map: texture, side: DoubleSide });
    const ground = new Mesh(geometry, material);
    ground.rotateX(Math.PI / 2);
    ground.receiveShadow = true;
    this.scene.add(ground);
  }
}

export default ReactAreaLightDemo;
