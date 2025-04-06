# QR Code Generator

This is a QR Code Generator application built with Next.js. It allows users to generate QR codes from text input and download them in SVG or PNG format. The application supports multiple languages, including English and Czech.

## Features
- Generate QR codes from text input
- Download QR codes in SVG or PNG format
- Language switcher between English and Czech
- Customizable QR code size, error correction level, and colors

## Getting Started

### Prerequisites
- Node.js (version 16 or later)
- Docker (optional, for containerized deployment)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd qr-generator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
To run the application locally:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building and Running with Docker
1. Build the Docker image:
   ```bash
   docker build -t qr-generator .
   ```
2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 qr-generator
   ```

## License
This project is licensed under the MIT License.
