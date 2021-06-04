import React, { useState } from "react";
import "./styles/CarouselItem.css";
import { useSpring, animated, to } from "@react-spring/web";
import { useGesture } from "react-use-gesture";

const calcX = (y, ly) => -(y - ly - window.innerHeight / 2) / 20;
const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 20;

const CarouselItem = (props) => {
  const doubleClickHandler = () => {
    props.modalClosed();
    props.activeMmetadata(props.metadata.id);
  };

  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, set] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 2, tension: 50, friction: 20 },
    })
  );

  const [drag, setDrag] = useState(false);

  const bind = useGesture({
    onDragStart: () => setDrag(true),
    onDrag: ({ offset: [x, y] }) =>
      set({ x, y, rotateX: 0, rotateY: 0, scale: 1 }),
    onDragEnd: () => setDrag(false),
    onMove: ({ xy: [px, py], dragging }) =>
      !dragging &&
      set({
        rotateX: calcX(py, y.get()),
        rotateY: calcY(px, x.get()),
        scale: 1.05,
      }),
    onPinch: ({ offset: [d, a] }) => set({ zoom: d / 20, rotateZ: a * 20 }),
    onHover: ({ hovering }) =>
      !hovering && set({ rotateX: 0, rotateY: 0, scale: 1 }),
  });

  const bindOptions = props.isAnimate ? { ...bind() } : null;
  return (
    <animated.div
      {...bindOptions}
      className={`item level${props.level}`}
      onDoubleClick={doubleClickHandler}
      style={{
        transform: "perspective(600px)",
        x,
        y,
        scale: to([scale, zoom], (s, z) => s + z),
        rotateX,
        rotateY,
        rotateZ,
      }}
    >
      <div
        className="image"
        style={{ backgroundImage: `url(${props.metadata.imageUrl})` }}
      />
      {props.children}
    </animated.div>
  );
};

export default CarouselItem;
