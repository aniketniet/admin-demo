import { useRef } from "react";

const QRShare = () => {
  const qrRef = useRef(null);

  const handleShare = async () => {
    if (!navigator.canShare) {
      alert("Sharing not supported on this browser");
      return;
    }

    const qrImage = qrRef.current;
    if (!qrImage) return;

    // Fetch the QR image and convert it to a Blob
    const response = await fetch(qrImage.src);
    const blob = await response.blob();
    const file = new File([blob], "qrcode.png", { type: "image/png" });

    try {
      await navigator.share({
        files: [file],
        title: "My QR Code",
        text: "Scan this QR code!",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-gray-100 rounded-lg shadow-md">
      {/* QR Code Image */}
      <img
        ref={qrRef}
        src="/public/qr.jpg"
        alt="QR Code"
        className="w-40 h-40"
      />

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Share QR
      </button>
    </div>
  );
};

export default QRShare;
