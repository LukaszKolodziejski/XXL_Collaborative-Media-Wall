import React, { useState, useRef, useEffect } from "react";
import "./styles/CarouselItem.css";
import { useSpring, animated, to } from "@react-spring/web";
import { useGesture } from "react-use-gesture";

const calcX = (y, ly) => -(y - ly - window.innerHeight / 2) / 20;
const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 20;

const CarouselItem = (props) => {
  const [drag, setDrag] = useState(false);
  const wrapper = useRef(null);
  const { show, predictions, btnHandler, index, metadata } = props;
  const [activePoint, setActivePoint] = useState(0);
  const [isOpenVideo, setIsOpenVideo] = useState(false);

  const doubleClickHandler = () => {
    props.modalClosed();
    props.activeMmetadata(metadata.id);
  };

  const doublePoindHandler = () => {
    const { length } = props.items;
    let k;

    if (length >= 5) k = 2;
    else if (length > 2 && length < 5) k = 1;
    else if (length >= 0 && length <= 2) k = 0;

    let i = index - k;
    i = i < 0 ? length + i : i >= length ? i % length : i;

    props.modalClosed();
    props.activeMmetadata(props.items[i].id);
    setIsOpenVideo((prev) => !prev);
  };

  useEffect(() => {
    if (predictions) {
      const modalPredictions = predictions.filter(
        (pred) => pred.label === "point"
      );
      if (modalPredictions.length === 0) {
        setActivePoint(1);
      } else if (modalPredictions.length === 1) {
        if (activePoint === 2) doublePoindHandler();
        setActivePoint(2);
      } else if (modalPredictions.length === 2) {
        if (activePoint === 3) btnHandler();
        setActivePoint(3);
      }
      setActivePoint((prev) => prev + 1);
    }
  }, [predictions]);

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

  const bind = useGesture({
    onDragStart: async () => setDrag(true),
    onDrag: async ({ offset: [x, y] }) =>
      set({ x, y, rotateX: 0, rotateY: 0, scale: 1 }),
    onDragEnd: async () => setDrag(false),
    onMove: async ({ xy: [px, py], dragging }) =>
      !dragging &&
      set({
        rotateX: calcX(py, y.get()),
        rotateY: calcY(px, x.get()),
        scale: 1.05,
      }),
    onPinch: async ({ offset: [d, a] }) =>
      set({ zoom: d / 20, rotateZ: a * 20 }),
    onHover: async ({ hovering }) =>
      !hovering && set({ rotateX: 0, rotateY: 0, scale: 1 }),
  });

  const bindOptions = props.isAnimate ? { ...bind() } : null;

  useEffect(() => {
    if (show) setTimeout(() => wrapper.current.scrollBy(0, 1000), 200);
  }, [show]);

  return (
    <animated.div
      {...bindOptions}
      className={`item level${props.level}`}
      onDoubleClick={doubleClickHandler}
      ref={wrapper}
      id="containerElement"
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
      {metadata.originalMime === "image/jpeg" ? (
        <div
          className="image"
          style={{ backgroundImage: `url(${metadata.imageUrl})` }}
        />
      ) : metadata.originalMime === "video/mp4" ? (
        <video id="video" className="image" controls>
          <source src={metadata.imageUrl} type="video/mp4" />
        </video>
      ) : null}
      {props.children}
    </animated.div>
  );
};

export default CarouselItem;
