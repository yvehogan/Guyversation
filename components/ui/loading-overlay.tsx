import React from "react";

export function LoadingOverlay({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="loader mb-6" />
        <span className="text-lg font-medium text-primary-500">{text}</span>
        <style jsx global>{`
          .loader {
            transform: rotateZ(45deg);
            perspective: 1000px;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            color: #fff;
          }
          .loader:before,
          .loader:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: inherit;
            height: inherit;
            border-radius: 50%;
            transform: rotateX(70deg);
            animation: 1s spin linear infinite;
          }
          .loader:after {
            color: #7B20C8;
            transform: rotateY(70deg);
            animation-delay: .4s;
          }

          @keyframes rotate {
            0% {
              transform: translate(-50%, -50%) rotateZ(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotateZ(360deg);
            }
          }

          @keyframes rotateccw {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(-360deg);
            }
          }

          @keyframes spin {
            0%,
            100% {
              box-shadow: .2em 0px 0 0px currentcolor;
            }
            12% {
              box-shadow: .2em .2em 0 0 currentcolor;
            }
            25% {
              box-shadow: 0 .2em 0 0px currentcolor;
            }
            37% {
              box-shadow: -.2em .2em 0 0 currentcolor;
            }
            50% {
              box-shadow: -.2em 0 0 0 currentcolor;
            }
            62% {
              box-shadow: -.2em -.2em 0 0 currentcolor;
            }
            75% {
              box-shadow: 0px -.2em 0 0 currentcolor;
            }
            87% {
              box-shadow: .2em -.2em 0 0 currentcolor;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
