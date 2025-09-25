'use client';
import { PaperTexture, GrainGradient } from '@paper-design/shaders-react';

interface PaperShaderProps {
  className?: string;
  variant?: 'paper' | 'grain';
  colors?: string[];
}

export default function PaperShader({
  className = '',
  variant = 'paper',
  colors = ['#e6fff7', '#83f2c5', '#0fa3b1']
}: PaperShaderProps) {
  const baseStyles = "absolute inset-0 opacity-80 mix-blend-overlay pointer-events-none";

  if (variant === 'grain') {
    return (
      <div className={`${baseStyles} ${className}`}>
        <GrainGradient
          colors={colors}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className={`${baseStyles} ${className}`}>
      <PaperTexture
        scale={1.2}
        className="w-full h-full"
      />
    </div>
  );
}