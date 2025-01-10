import { MotiView } from 'moti';

export const Skeleton = ({ width, height, radius = 4 }: { width: number; height: number; radius?: number }) => {
  return (
    <MotiView
      from={{
        opacity: 0.5,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        type: 'timing',
        duration: 1000,
        loop: true,
      }}
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: '#E1E9F2',
      }}
    />
  );
}; 