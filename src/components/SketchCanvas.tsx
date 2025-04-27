import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';

interface Point {
  x: number;
  y: number;
}

interface Line {
  points: number[];
  tool: string;
}

interface SketchCanvasProps {
  width?: number;
  height?: number;
  onSketchChange?: (dataUrl: string) => void;
}

export const SketchCanvas: React.FC<SketchCanvasProps> = ({
  width = 768,
  height = 768,
  onSketchChange,
}) => {
  const [lines, setLines] = useState<Line[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const stageRef = useRef<any>(null);

  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y], tool: 'brush' }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    setLines([...lines.slice(0, -1), lastLine]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (onSketchChange && stageRef.current) {
      const dataUrl = stageRef.current.toDataURL();
      onSketchChange(dataUrl);
    }
  };

  const handleClear = () => {
    setLines([]);
    if (onSketchChange) {
      onSketchChange('');
    }
  };

  useEffect(() => {
    if (onSketchChange && stageRef.current && lines.length > 0) {
      const dataUrl = stageRef.current.toDataURL();
      onSketchChange(dataUrl);
    }
  }, [lines, onSketchChange]);

  return (
    <div className="relative">
      <Stage
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onMouseleave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        ref={stageRef}
        className="border border-gray-300 rounded-lg bg-white"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#000000"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}; 