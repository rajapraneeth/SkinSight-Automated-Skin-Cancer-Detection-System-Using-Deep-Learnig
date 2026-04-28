# SkinSight-Automated-Skin-Cancer-Detection-System-Using-Deep-Learnig
SkinSight is an AI-powered medical imaging system designed to assist in the early detection of skin cancer using deep learning. The system analyzes skin lesion images and classifies them into benign or malignant categories, providing a risk-based assessment for decision support.
# 🧴 SkinSight: Automated Skin Cancer Detection Using Deep Learning
🌐 Live Demo
👉 Try the App:
https://skin-insight-project.lovable.app/

# 📌 Project Overview
SkinSight is an AI-powered system designed to assist in the early detection of skin cancer using deep learning. The application analyzes skin lesion images and classifies them into benign or malignant categories, providing a risk-based assessment for decision support.

This project combines deep learning, medical-focused evaluation, and real-time deployment into a user-friendly web application.

# 🎯 Problem Statement
Skin cancer, especially melanoma, is one of the most dangerous forms of cancer. Early detection is critical, but:

Requires expert dermatologists

Is time-consuming and subjective

Is not easily accessible in remote areas

👉 SkinSight provides an automated and accessible AI-based screening solution.

# 🚀 Features
🧠 Deep Learning-based classification (Benign vs Malignant)

⚡ Real-time prediction through web application

📊 Risk-based output (Low / Moderate / High)

🧴 Image preprocessing (resize, normalization)

🌐 Interactive UI (Streamlit + Lovable deployment)

⚖️ Class imbalance handling using class weights

📈 Uses medical evaluation metrics (Recall, ROC-AUC)

# 🖼️ Application Preview
🔹 Upload Interface
Upload a skin lesion image easily

Clean and user-friendly design

🔹 Prediction Output
Displays:

Risk Level (Low / Moderate / High)

Prediction Score

Visual indicators



# 🏗️ System Architecture
User → Image Upload → Preprocessing → MobileNetV2 Model → Prediction → Risk Analysis → Result Display

# 🧠 Technologies Used
🔹 Programming
Python

🔹 Deep Learning
TensorFlow

Keras

MobileNetV2 (Transfer Learning)

🔹 Libraries
NumPy

Pandas

Scikit-learn

Matplotlib

🔹 Deployment
Streamlit

Lovable AI

🔹 Tools
Jupyter Notebook

VS Code

Git & GitHub

# 🗂️ Dataset
HAM10000 Dataset

Dermoscopic images of skin lesions

Classes:
Benign

Malignant

# ⚙️ Model Details
Architecture: MobileNetV2 (Pretrained on ImageNet)

Fine-tuning: Last layers unfrozen

Input Size: 224 × 224

Normalization: Pixel scaling (0–1)

Loss Function: Binary Crossentropy

Optimizer: Adam

# 🧪 Evaluation Metrics
Accuracy

Precision

Recall (important for cancer detection)

ROC-AUC Score

Confusion Matrix

# 📊 Results
Accuracy ≈ 90%

ROC-AUC ≈ 0.86

Improved malignant detection after fine-tuning

Stable training with reduced overfitting

# 🔄 Workflow
User uploads a skin image

Image is preprocessed (resize + normalize)

MobileNetV2 extracts features

Model predicts probability

Risk level is classified

Result is displayed instantly

# ⚠️ Limitations
Works best with dermoscopic images

Sensitive to lighting and image quality

May misclassify non-lesion patterns (pen marks, shadows)

Not a replacement for medical diagnosis

# 🔮 Future Enhancements
Multi-class skin disease classification

Mobile app (Android/iOS)

Explainable AI (Grad-CAM)

Larger dataset training

Clinical validation

# 📚 References
Esteva et al., Dermatologist-level classification of skin cancer, Nature (2017)

Howard et al., MobileNetV2, CVPR (2018)

HAM10000 Dataset – Harvard Dataverse

# ⚠️ Disclaimer
This project is developed for educational purposes only and is not a medical diagnostic tool. Always consult a certified dermatologist for medical advice.
