# ImageMaker

ImageMaker is a React application that allows users to create Open Graph (OG) images for websites. It provides an interface to input a title, content, and optionally an image, then generates a visual OG image, which can be further uploaded to Firebase Storage.

## Features

- **Title and Content Input**: Users can enter a title and content to be included in the OG image.
- **Image Upload**: Users can optionally upload an image that will be included in the OG image.
- **OG Image Generation**: The application sends the input data to a backend service to generate an OG image.
- **Firebase Upload**: The generated image can be uploaded to Firebase Storage, and the URL of the uploaded image is displayed to the user.

## How It Works

### Frontend (React)

- The application uses React's `useState` to manage form data: title, content, and image.
- Users can select an image file, which is previewed in the UI using `URL.createObjectURL`.
- When the form is submitted, the data is sent to an external API to generate the OG image.
- Once the OG image is generated, users can upload it to Firebase Storage.

### Firebase Integration

- Once the OG image is generated, users can upload the image to Firebase Storage.
- The `handleUploadToFirebase` function fetches the generated image, converts it to a blob, and uploads it to Firebase Storage.
- After successful upload, the image's Firebase Storage URL is retrieved and displayed to the user.

### Key Components

- **Image Upload and Preview**: Users can select an image file, which is previewed before submission.
- **OG Image Generation**: The form data is sent to a backend service to generate the OG image.
- **Firebase Upload**: The application uploads the generated image to Firebase Storage and retrieves the download URL.

## Setup and Installation

### Prerequisites

- Node.js and npm installed on your system.
- Firebase project with Firebase Storage enabled.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
