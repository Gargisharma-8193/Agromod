function CropYield() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🌾 Crop Yield Prediction</h1>

      <iframe
        src="http://127.0.0.1:5002"
        width="100%"
        height="800px"
        style={{
          border: "none",
          borderRadius: "10px",
        }}
        title="Crop Yield Prediction"
      />
    </div>
  );
}

export default CropYield;