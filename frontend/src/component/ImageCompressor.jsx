import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const ImageCompressor = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setOriginalFile(file);

    const options = {
      maxSizeMB: 0.5,              // 500 KB target
      useWebWorker: true,
      initialQuality: 0.8,
      fileType: "image/webp",      // WhatsApp-like
      maxIteration: 10
    };

    try {
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
    } catch (error) {
      console.error("Compression error:", error);
    }
  };

  const formatSize = (bytes) => {
    return (bytes / 1024).toFixed(2) + " KB";
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Image Compression Comparison</h2>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
        {/* Original Image */}
        {originalFile && (
          <div>
            <h3>Original Image</h3>
            <p>Size: {formatSize(originalFile.size)}</p>
            <img
              src={URL.createObjectURL(originalFile)}
              alt="Original"
              style={{ maxWidth: "800px", border: "1px solid #ccc" }}
            />
          </div>
        )}

        {/* Compressed Image */}
        {compressedFile && (
          <div>
            <h3>Compressed Image</h3>
            <p>Size: {formatSize(compressedFile.size)}</p>
            <img
              src={URL.createObjectURL(compressedFile)}
              alt="Compressed"
              style={{ maxWidth: "800px", border: "1px solid #ccc" }}
            />
          </div>
        )}
      </div>

      {originalFile && compressedFile && (
        <p style={{ marginTop: "20px" }}>
          🔽 Size reduced by{" "}
          <strong>
            {(
              ((originalFile.size - compressedFile.size) /
                originalFile.size) *
              100
            ).toFixed(2)}
            %
          </strong>
        </p>
      )}
    </div>
  );
};

export default ImageCompressor;
