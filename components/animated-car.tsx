// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// type Props = {
//   pathRef: React.RefObject<SVGPathElement | null>;
//   progress: any;
//   pathLength: number;
// };

// export function AnimatedCar({ pathRef, progress, pathLength }: Props) {
//   const [position, setPosition] = useState<{
//     x: number;
//     y: number;
//     angle: number;
//   } | null>(null);

//   // initial position
//   useEffect(() => {
//     if (!pathRef.current || pathLength === 0) return;

//     const start = pathLength * 0.05;
//     const p = pathRef.current.getPointAtLength(start);
//     const n = pathRef.current.getPointAtLength(start + 5);

//     const angle =
//       Math.atan2(n.y - p.y, n.x - p.x) * (180 / Math.PI);

//     setPosition({ x: p.x, y: p.y, angle });
//   }, [pathRef, pathLength]);

//   // follow scroll
//   useEffect(() => {
//     if (!pathRef.current) return;

//     const unsub = progress.on("change", (v: number) => {
//       const length = v * pathLength;
//       const p = pathRef.current!.getPointAtLength(length);
//       const n = pathRef.current!.getPointAtLength(
//         Math.min(length + 5, pathLength)
//       );

//       const angle =
//         Math.atan2(n.y - p.y, n.x - p.x) * (180 / Math.PI);

//       setPosition({ x: p.x, y: p.y, angle });
//     });

//     return () => unsub();
//   }, [progress, pathLength, pathRef]);

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
//       transition={{ duration: 0.4 }}
//     >
//       <g transform="translate(-40, -20)">
//         <ellipse cx="40" cy="45" rx="35" ry="8" fill="rgba(0,0,0,0.2)" />

//         <rect
//           x="10"
//           y="20"
//           width="60"
//           height="15"
//           rx="3"
//           fill="#fbbf24"
//         />

//         <path
//           d="M 20 20 L 25 8 L 55 8 L 60 20 Z"
//           fill="#fbbf24"
//         />

//         <circle cx="55" cy="35" r="6" fill="#1f2937" />
//         <circle cx="25" cy="35" r="6" fill="#1f2937" />
//       </g>
//     </motion.g>
//   );
// }
