import { useState } from "react";
import Navbar from "../components/Navbar";

function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // ========================================
  // IMAGE SELECT
  // ========================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  // ========================================
  // DETECT DISEASE
  // ========================================

  const detectDisease = async () => {
    if (!image) {
      alert("Please upload a crop image first.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      /*
      ========================================
      FUTURE ML BACKEND CONNECTION
      ========================================

      When your ML backend is ready, use:

      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(
        `${API_URL}/detect-disease`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
      */

      // ========================================
      // TEMPORARY DEMO RESULT
      // ========================================

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      setResult({
        disease: "Healthy Leaf",
        confidence: 96,
        description:
          "The uploaded crop leaf appears healthy with no major signs of disease.",
        treatment:
          "Continue proper irrigation, balanced fertilizer usage, and regular monitoring.",
      });
    } catch (error) {
      console.error(
        "DISEASE DETECTION ERROR:",
        error
      );

      alert("Unable to detect disease.");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // RESET
  // ========================================

  const resetDetection = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setLoading(false);
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        {/* ====================================
            HEADER
        ==================================== */}

        <div style={styles.header}>
          <div style={styles.badge}>
            🌿 AI POWERED AGRICULTURE
          </div>

          <h1 style={styles.title}>
            Crop Disease Detection
          </h1>

          <p style={styles.subtitle}>
            Upload a crop leaf image and let
            AgroMod's AI help identify possible
            diseases.
          </p>
        </div>

        {/* ====================================
            MAIN CARD
        ==================================== */}

        <div style={styles.mainCard}>
          {/* ==================================
              UPLOAD
          ================================== */}

          {!preview && (
            <div style={styles.uploadSection}>
              <div style={styles.uploadIcon}>
                🌱
              </div>

              <h2>Upload Crop Image</h2>

              <p style={styles.uploadText}>
                Upload a clear image of the crop
                leaf for disease analysis.
              </p>

              <label style={styles.uploadButton}>
                📷 Choose Image

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>

              <p style={styles.supportText}>
                Supported formats: JPG, JPEG, PNG
              </p>
            </div>
          )}

          {/* ==================================
              PREVIEW
          ================================== */}

          {preview && !result && (
            <div style={styles.previewSection}>
              <h2>Selected Crop Image</h2>

              <div style={styles.imageContainer}>
                <img
                  src={preview}
                  alt="Crop preview"
                  style={styles.previewImage}
                />
              </div>

              <div style={styles.buttonGroup}>
                <button
                  onClick={detectDisease}
                  disabled={loading}
                  style={{
                    ...styles.detectButton,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  {loading
                    ? "🔍 Analyzing..."
                    : "🔍 Detect Disease"}
                </button>

                <button
                  onClick={resetDetection}
                  disabled={loading}
                  style={styles.cancelButton}
                >
                  ✕ Choose Another
                </button>
              </div>

              {/* LOADING */}

              {loading && (
                <div style={styles.loadingBox}>
                  <div style={styles.spinner}></div>

                  <p>
                    AgroMod AI is analyzing your
                    crop...
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ==================================
              RESULT
          ================================== */}

          {result && (
            <div style={styles.resultSection}>
              <div style={styles.successIcon}>
                ✓
              </div>

              <h2>Disease Detection Result</h2>

              <div style={styles.resultCard}>
                {/* IMAGE */}

                <div style={styles.resultImageBox}>
                  <img
                    src={preview}
                    alt="Analyzed crop"
                    style={styles.resultImage}
                  />
                </div>

                {/* DETAILS */}

                <div style={styles.resultDetails}>
                  <p style={styles.resultLabel}>
                    Detected Condition
                  </p>

                  <h2 style={styles.diseaseName}>
                    {result.disease}
                  </h2>

                  {/* CONFIDENCE */}

                  <div style={styles.confidenceBox}>
                    <div
                      style={styles.confidenceHeader}
                    >
                      <span>
                        AI Confidence
                      </span>

                      <strong>
                        {result.confidence}%
                      </strong>
                    </div>

                    <div
                      style={
                        styles.progressBackground
                      }
                    >
                      <div
                        style={{
                          ...styles.progressBar,
                          width: `${result.confidence}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* DESCRIPTION */}

                  <p style={styles.description}>
                    {result.description}
                  </p>

                  {/* RECOMMENDATION */}

                  <div
                    style={styles.treatmentBox}
                  >
                    <h3>
                      💡 Recommendation
                    </h3>

                    <p>
                      {result.treatment}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={resetDetection}
                style={styles.anotherButton}
              >
                🔄 Analyze Another Image
              </button>
            </div>
          )}
        </div>

        {/* ====================================
            INFORMATION CARDS
        ==================================== */}

        <div style={styles.infoSection}>
          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>
              📷
            </div>

            <h3>Upload</h3>

            <p>
              Take a clear photo of the affected
              crop leaf and upload it.
            </p>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>
              🤖
            </div>

            <h3>AI Analysis</h3>

            <p>
              AgroMod analyzes the image using
              machine learning technology.
            </p>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>
              💡
            </div>

            <h3>Get Insights</h3>

            <p>
              Receive the predicted disease and
              useful recommendations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ========================================
// STYLES
// ========================================

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f4fbf4 0%, #ffffff 50%, #eef8ef 100%)",
    paddingBottom: "70px",
  },

  header: {
    textAlign: "center",
    padding: "55px 20px 30px",
  },

  badge: {
    display: "inline-block",
    background: "#e4f4e6",
    color: "#2e7d32",
    padding: "9px 18px",
    borderRadius: "25px",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "18px",
  },

  title: {
    fontSize: "42px",
    color: "#176b2a",
    margin: "5px 0 15px",
    fontWeight: "800",
  },

  subtitle: {
    maxWidth: "650px",
    margin: "auto",
    color: "#666",
    fontSize: "18px",
    lineHeight: "1.7",
  },

  mainCard: {
    width: "min(900px, 90%)",
    margin: "25px auto",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "45px",
    boxShadow:
      "0 15px 45px rgba(46, 125, 50, 0.12)",
    border: "1px solid #e4f0e5",
    boxSizing: "border-box",
  },

  uploadSection: {
    textAlign: "center",
    padding: "45px 20px",
    border: "2px dashed #b7d9ba",
    borderRadius: "20px",
    background: "#fbfffb",
  },

  uploadIcon: {
    fontSize: "65px",
    marginBottom: "10px",
  },

  uploadText: {
    color: "#666",
    fontSize: "16px",
    maxWidth: "500px",
    margin: "10px auto 25px",
    lineHeight: "1.6",
  },

  uploadButton: {
    display: "inline-block",
    background: "#2e7d32",
    color: "white",
    padding: "14px 30px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
  },

  supportText: {
    color: "#999",
    fontSize: "13px",
    marginTop: "15px",
  },

  previewSection: {
    textAlign: "center",
  },

  imageContainer: {
    margin: "25px auto",
    width: "min(500px, 100%)",
    height: "330px",
    overflow: "hidden",
    borderRadius: "18px",
    background: "#f3f3f3",
  },

  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  detectButton: {
    border: "none",
    background: "#2e7d32",
    color: "white",
    padding: "14px 30px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
  },

  cancelButton: {
    background: "white",
    color: "#2e7d32",
    border: "2px solid #2e7d32",
    padding: "12px 25px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  loadingBox: {
    marginTop: "25px",
    background: "#f0f8f1",
    padding: "18px",
    borderRadius: "12px",
    color: "#2e7d32",
  },

  spinner: {
    width: "30px",
    height: "30px",
    border: "4px solid #c8e6c9",
    borderTop: "4px solid #2e7d32",
    borderRadius: "50%",
    margin: "auto",
  },

  resultSection: {
    textAlign: "center",
  },

  successIcon: {
    width: "65px",
    height: "65px",
    margin: "auto",
    borderRadius: "50%",
    background: "#e4f5e6",
    color: "#2e7d32",
    fontSize: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  resultCard: {
    display: "flex",
    gap: "35px",
    marginTop: "30px",
    textAlign: "left",
    background: "#f9fcf9",
    padding: "25px",
    borderRadius: "18px",
    flexWrap: "wrap",
  },

  resultImageBox: {
    flex: "1",
    minWidth: "280px",
  },

  resultImage: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
    borderRadius: "15px",
  },

  resultDetails: {
    flex: "1",
    minWidth: "280px",
  },

  resultLabel: {
    color: "#777",
    marginBottom: "5px",
  },

  diseaseName: {
    color: "#2e7d32",
    fontSize: "28px",
    marginTop: "5px",
  },

  confidenceBox: {
    margin: "20px 0",
  },

  confidenceHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },

  progressBackground: {
    height: "10px",
    background: "#dcebdc",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    background: "#2e7d32",
    borderRadius: "10px",
  },

  description: {
    color: "#555",
    lineHeight: "1.6",
  },

  treatmentBox: {
    background: "#eaf6eb",
    padding: "15px",
    borderRadius: "12px",
    marginTop: "20px",
  },

  anotherButton: {
    marginTop: "25px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    padding: "13px 25px",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
  },

  infoSection: {
    width: "min(1000px, 90%)",
    margin: "45px auto 0",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  infoCard: {
    background: "white",
    padding: "25px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.06)",
  },

  infoIcon: {
    fontSize: "38px",
    marginBottom: "8px",
  },
};

export default DiseaseDetection;