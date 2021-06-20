import React, {
  useRef, useCallback, forwardRef, useImperativeHandle, useEffect,
} from 'react';
import { Operations } from '@tms/site-component';

interface Props {
    onFile: (file: Blob) => void;
    showTool?: boolean;
    canvasWidth?: number;
    canvasHeight?: number;
    className?: string;
}

const CanvasSign = forwardRef(({
  canvasWidth, canvasHeight, className, onFile, showTool,
}: Props, propsRef) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const position = useRef({ left: 0, top: 0 });
  const isDrawing = useRef(false);

  const getCtx = () => ref.current.getContext('2d');

  const clear = () => {
    getCtx().clearRect(0, 0, canvasWidth, canvasHeight);
  };

  const getBlob = () => new Promise((resolve) => {
    ref.current.toBlob((blob) => {
      resolve(blob);
    });
  });

  useImperativeHandle(propsRef, () => ({
    clear,
    getCtx,
    getBlob,
  }));

  const start = useCallback(() => {
    const coverPos = ref.current.getBoundingClientRect();
    position.current = {
      left: coverPos.left,
      top: coverPos.top,
    };
    isDrawing.current = true;
  }, []);

  const move = useCallback((e) => {
    if (isDrawing.current) {
      e.preventDefault();
      e.stopPropagation();
      const cxt = getCtx();
      cxt.beginPath();
      cxt.lineWidth = 5;
      cxt.strokeStyle = '#000';
      cxt.lineCap = 'round';
      cxt.lineJoin = 'round';
      cxt.shadowBlur = 1;
      cxt.shadowColor = '#000';
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY;
      const mouseX = clientX - position.current.left;
      const mouseY = clientY - position.current.top;
      cxt.lineTo(
        mouseX,
        mouseY,
      );
      cxt.stroke();
    }
  }, []);

  const end = useCallback(() => {
    isDrawing.current = false;
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('touchstart', start, { passive: false });
      ref.current.addEventListener('touchmove', move, { passive: false });
      ref.current.addEventListener('touchend', end, { passive: false });
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('touchstart', start);
        ref.current.removeEventListener('touchmove', move);
        ref.current.removeEventListener('touchend', end);
      }
    };
  }, [start, move, end]);

  return (
    <div className={`site-signature ${className}`}>
      <canvas
        style={{
          userSelect: 'none', border: '1px solid #ccc', boxSizing: 'border-box',
        }}
        ref={ref}
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
      />
      {showTool ? (
        <div className="tool">
          <Operations
            meta={[
              { text: '清空', action: clear },
              {
                text: '获取文件',
                action: async () => {
                  try {
                    const blob = await getBlob();
                    onFile(blob as Blob);
                  } catch (error) {
                  console.log(error); // eslint-disable-line
                  }
                },
              },
            ]}
          />
        </div>
      ) : null}
    </div>
  );
});

CanvasSign.defaultProps = {
  canvasWidth: 400,
  canvasHeight: 300,
  className: '',
  showTool: true,
};

export default CanvasSign;
