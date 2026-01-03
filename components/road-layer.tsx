// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// export default function RoadLayer() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const pathRef = useRef<SVGPathElement>(null);
//   const [pathLength, setPathLength] = useState(0);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   useEffect(() => {
//     if (pathRef.current) {
//       setPathLength(pathRef.current.getTotalLength());
//     }
//   }, []);

//   const drawProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
//   const carProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 pointer-events-none z-0"
//       style={{ height: "350vh" }}
//     >
//       <div className="sticky top-0 h-screen w-full overflow-hidden">
//         <svg
//           width="100%"
//           height="100%"
//           viewBox="0 0 1200 1000"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="absolute inset-0"
//           preserveAspectRatio="xMidYMid slice"
//         >
//           <motion.path
//             ref={pathRef}
//             d="M 100 200 
//                C 150 250, 200 300, 300 350
//                C 400 400, 500 420, 600 450
//                C 700 480, 750 520, 750 600
//                C 750 680, 700 730, 620 760
//                C 540 790, 450 780, 380 740
//                C 310 700, 280 640, 300 570
//                C 320 500, 380 460, 460 450
//                C 540 440, 610 470, 650 520
//                C 690 570, 700 630, 680 690
//                C 660 750, 610 790, 540 810
//                C 470 830, 400 820, 350 780
//                C 300 740, 280 680, 300 620
//                C 320 560, 370 520, 430 510
//                C 490 500, 550 520, 580 560
//                C 610 600, 610 650, 580 690
//                C 550 730, 500 750, 450 750
//                C 400 750, 360 720, 350 680"
//             stroke="#a78bfa"
//             strokeWidth="35"
//             strokeLinecap="round"
//             fill="none"
//             className="drop-shadow-lg"
//             style={{
//               pathLength: drawProgress,
//             }}
//           />

//           <path
//             d="M 100 200 
//                C 150 250, 200 300, 300 350
//                C 400 400, 500 420, 600 450
//                C 700 480, 750 520, 750 600
//                C 750 680, 700 730, 620 760
//                C 540 790, 450 780, 380 740
//                C 310 700, 280 640, 300 570
//                C 320 500, 380 460, 460 450
//                C 540 440, 610 470, 650 520
//                C 690 570, 700 630, 680 690
//                C 660 750, 610 790, 540 810
//                C 470 830, 400 820, 350 780
//                C 300 740, 280 680, 300 620
//                C 320 560, 370 520, 430 510
//                C 490 500, 550 520, 580 560
//                C 610 600, 610 650, 580 690
//                C 550 730, 500 750, 450 750
//                C 400 750, 360 720, 350 680"
//             stroke="white"
//             strokeWidth="6"
//             strokeDasharray="25 35"
//             strokeLinecap="round"
//             fill="none"
//             opacity={0.85}
//           />

//           {pathLength > 0 && pathRef.current && (
//             <AnimatedCar
//               pathRef={pathRef}
//               progress={carProgress}
//               pathLength={pathLength}
//             />
//           )}
//         </svg>
//       </div>
//     </div>
//   );
// }

// const AnimatedCar = ({
//   pathRef,
//   progress,
//   pathLength,
// }: {
//   pathRef: React.RefObject<SVGPathElement | null>;
//   progress: any;
//   pathLength: number;
// }) => {
//   const [position, setPosition] = useState<{
//     x: number;
//     y: number;
//     angle: number;
//   } | null>(null);

//   useEffect(() => {
//     if (pathRef.current && pathLength > 0) {
//       const point = pathRef.current.getPointAtLength(0);
//       const nextPoint = pathRef.current.getPointAtLength(5);
//       const angle =
//         Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) *
//         (180 / Math.PI);

//       setPosition({ x: point.x, y: point.y, angle });
//     }
//   }, [pathRef, pathLength]);

//   useEffect(() => {
//     const unsubscribe = progress.on("change", (latest: number) => {
//       if (pathRef.current && latest >= 0 && latest <= 1) {
//         const length = latest * pathLength;
//         const point = pathRef.current.getPointAtLength(length);

//         const nextLength = Math.min(length + 5, pathLength);
//         const nextPoint = pathRef.current.getPointAtLength(nextLength);

//         const angle =
//           Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) *
//           (180 / Math.PI);

//         setPosition({ x: point.x, y: point.y, angle });
//       }
//     });

//     return () => unsubscribe();
//   }, [progress, pathRef, pathLength]);

//   if (!position) return null;

//   return (
//     <motion.g
//       style={{
//         x: position.x,
//         y: position.y,
//         rotate: position.angle,
//       }}
//       initial={{ scale: 0 }}
//       animate={{ scale: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <g transform="translate(-40, -20)">
//         <ellipse
//           cx="40"
//           cy="45"
//           rx="35"
//           ry="8"
//           fill="rgba(0,0,0,0.2)"
//           opacity="0.5"
//         />

//         <rect
//           x="10"
//           y="20"
//           width="60"
//           height="15"
//           rx="3"
//           fill="#fbbf24"
//           stroke="#f59e0b"
//           strokeWidth="1.5"
//         />

//         <path
//           d="M 20 20 L 25 8 L 55 8 L 60 20 Z"
//           fill="#fbbf24"
//           stroke="#f59e0b"
//           strokeWidth="1.5"
//         />

//         <path
//           d="M 27 10 L 30 18 L 40 18 L 40 10 Z"
//           fill="#60a5fa"
//           opacity="0.7"
//         />
//         <path
//           d="M 42 10 L 42 18 L 52 18 L 53 10 Z"
//           fill="#60a5fa"
//           opacity="0.7"
//         />

//         <circle cx="68" cy="27" r="2.5" fill="#fef3c7" />
//         <circle cx="68" cy="27" r="1.5" fill="#fde047" />

//         <circle cx="12" cy="27" r="2" fill="#fca5a5" />

//         <line
//           x1="40"
//           y1="20"
//           x2="40"
//           y2="35"
//           stroke="#f59e0b"
//           strokeWidth="1"
//         />

//         <g>
//           <circle cx="55" cy="35" r="6" fill="#1f2937" />
//           <circle cx="55" cy="35" r="4" fill="#374151" />
//           <circle cx="55" cy="35" r="2" fill="#6b7280" />
//         </g>

//         <g>
//           <circle cx="25" cy="35" r="6" fill="#1f2937" />
//           <circle cx="25" cy="35" r="4" fill="#374151" />
//           <circle cx="25" cy="35" r="2" fill="#6b7280" />
//         </g>

//         <rect x="32" y="4" width="16" height="4" rx="1" fill="#ef4444" />
//         <text
//           x="40"
//           y="7.5"
//           fontSize="3"
//           fill="white"
//           textAnchor="middle"
//           fontWeight="bold"
//         >
//           TAXI
//         </text>

//         <ellipse cx="8" cy="22" rx="2" ry="1.5" fill="#f59e0b" />

//         <rect x="68" y="25" width="3" height="6" rx="1" fill="#f59e0b" />
//       </g>
//     </motion.g>
//   );
// }