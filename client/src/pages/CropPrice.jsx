function CropPrice() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>🌾 Crop Price Prediction</h1>

      <iframe
        src="http://127.0.0.1:5050"
        width="100%"
        height="700px"
        style={{
          border: "none",
          borderRadius: "10px",
        }}
        title="Crop Price Prediction"
      ></iframe>
    </div>
  );
}

export default CropPrice;