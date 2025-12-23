import React, { useState } from "react";
import * as THREE from "three";
import { Suspense } from "react";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { CameraLight } from "../../CameraLight";
import "./HeroSection.css";
import { Model } from "../../Model/Model";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [tshirtColor, setTshirtColor] = useState("#E5E5E5");

  const changeColor = (color) => {
    setTshirtColor(color);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="heroMain">
        <div className="sectionleft">
          <p>New Trend</p>
          <h1>Summer Sale Stylish</h1>
          <span>Limited Time Offer - Up to 60% off & Free Shipping</span>
          <div className="heroLink">
            <Link to="/shop" onClick={scrollToTop}>
              <h5>Discover More</h5>
            </Link>
          </div>
        </div>
        <div className="sectionright">
          <Canvas
            className="canvasModel"
            dpr={[1, 1.5]}
            camera={{ position: [0, 3, 8], fov: 45 }}
            frameloop="demand"
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.outputColorSpace = THREE.SRGBColorSpace;
              gl.physicallyCorrectLights = true;
              gl.toneMappingExposure = 1.35;
            }}
          >
            <Suspense
              fallback={
                <Html center>
                  <div className="loader">Loading...</div>
                </Html>
              }
            >
              <CameraLight />

              <hemisphereLight intensity={1.6} />
              <directionalLight position={[0, 0, 10]} intensity={1.2} />
              <directionalLight position={[5, 5, 5]} intensity={2} />
              <directionalLight position={[-5, 3, -5]} intensity={2.5} />

              <spotLight position={[0, 5, 6]} intensity={1.2} angle={0.6} />

              <Environment preset="studio" />

              <OrbitControls enableZoom={false} enablePan={false} />

              <Model color={tshirtColor} />
            </Suspense>
          </Canvas>

          <div className="heroColorBtn">
            {/* Black Titanium */}
            <button
              onClick={() => changeColor("#1C1C1E")}
              style={{ backgroundColor: "#1C1C1E" }}
              title="Black Titanium"
            />

            {/* Natural Titanium */}
            <button
              onClick={() => changeColor("#8E8E8E")}
              style={{ backgroundColor: "#8E8E8E" }}
              title="Natural Titanium"
            />

            {/* Silver / White Titanium */}
            <button
              onClick={() => changeColor("#E5E5E5")}
              style={{ backgroundColor: "#E5E5E5" }}
              title="Silver Titanium"
            />

            {/* New Pro Color – Blue Titanium */}
            <button
              onClick={() => changeColor("#2F3A4A")}
              style={{ backgroundColor: "#2F3A4A" }}
              title="Blue Titanium"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
