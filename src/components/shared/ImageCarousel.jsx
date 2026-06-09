import React, { useState } from "react";

function CarouselSlide({ src, index }) {
  const isVideo = src.toLowerCase().endsWith(".mp4");

  if (isVideo) {
    return (
      <video
        key={index}
        autoPlay
        loop
        muted
        playsInline
        style={{ flex: "0 0 100%", width: "100%", height: "auto", display: "block" }}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  return (
    <img
      src={src}
      alt={`Slide ${index + 1}`}
      style={{ flex: "0 0 100%", width: "100%", height: "auto", display: "block" }}
    />
  );
}

export default function ImageCarousel({ images = [], color }) {
  const [cur, setCur] = useState(0);
  const total = images.length;

  const go = (n) => setCur((n + total) % total);

  if (!total) {
    return (
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
        }}
      >
        <div style={{ fontSize: "5rem", fontWeight: 700, color, opacity: 0.12 }}>?</div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "16px",
        width: "100%",
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          transform: `translateX(-${cur * 100}%)`,
          transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {images.map((src, i) => (
          <CarouselSlide key={i} src={src} index={i} />
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            onClick={() => go(cur - 1)}
            aria-label="Previous"
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2,
              fontSize: "1.1rem",
            }}
          >
            ‹
          </button>
          <button
            onClick={() => go(cur + 1)}
            aria-label="Next"
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2,
              fontSize: "1.1rem",
            }}
          >
            ›
          </button>
        </>
      )}

      {total > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "6px",
            zIndex: 2,
          }}
        >
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => go(i)}
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                cursor: "pointer",
                background: i === cur ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                transform: i === cur ? "scale(1.3)" : "scale(1)",
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>
      )}

      {total > 1 && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.8)",
            background: "rgba(0,0,0,0.4)",
            padding: "3px 8px",
            borderRadius: "20px",
          }}
        >
          {cur + 1} / {total}
        </div>
      )}
    </div>
  );
}
