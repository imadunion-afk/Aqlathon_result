// scripts/upload-appwrite.js

// === PASTE YOUR APPWRITE DETAILS HERE ===
const APPWRITE_PROJECT_ID = '68abf9ad00233c62a24d';
const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1'; // Or your custom endpoint
const DATABASE_ID = '68abf9d7003aa548e321';
const COLLECTION_ID = '68abf9f5000b8f5e8eea';
const BUCKET_ID = '68abfaee00051ad95e9b';
// ======================================

// Initialize the Appwrite client
const { Client, Databases, Storage, ID } = Appwrite;
const client = new Client();
client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);

const uploadForm = document.getElementById('upload-form');
const submitBtn = document.getElementById('submit-btn');
const statusMessage = document.getElementById('status-message');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const imageFile = document.getElementById('image').files[0];

    submitBtn.disabled = true;
    submitBtn.textContent = 'Uploading...';
    statusMessage.textContent = 'Uploading image...';

    try {
        // 1. Upload the image file WITH PUBLIC READ PERMISSION
        const fileResponse = await storage.createFile(
            BUCKET_ID,
            ID.unique(),
            imageFile,
            [
                Appwrite.Permission.read(Appwrite.Role.any()) // <-- THIS IS THE CRITICAL FIX
            ]
        );

        const imageId = fileResponse.$id;
        statusMessage.textContent = 'Saving data...';

        // 2. Save the text data to the Database
        await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                title, // Shorthand for title: title
                category,
                date,
                imageId
            }
        );

        statusMessage.textContent = 'Achievement uploaded successfully!';
        statusMessage.style.color = 'green';
        uploadForm.reset();

    } catch (error) {
        console.error("Upload Error:", error);
        statusMessage.textContent = `Error: ${error.message}`;
        statusMessage.style.color = 'red';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Upload Achievement';
    }
});