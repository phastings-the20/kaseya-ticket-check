from PIL import Image

def resize_and_save_image(image_path):
    # Open the image
    img = Image.open(image_path)
    
    # List of sizes to resize to
    sizes = [(16, 16), (48, 48), (128, 128)]
    
    # File extension for saving images
    file_extension = ".png"
    
    for size in sizes:
        # Resize the image
        resized_img = img.resize(size, Image.Resampling.LANCZOS)
        
        # Save the resized image
        resized_img.save(f"{image_path.split('.')[0]}_{size[0]}x{size[1]}{file_extension}", format="PNG")
    
    print("Images resized and saved successfully.")

# Replace 'your_image.jpg' with the path to your image
resize_and_save_image('source-code.png')
