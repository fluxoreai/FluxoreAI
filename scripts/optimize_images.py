import os
import re
from PIL import Image

def slugify(name):
    # Remove the (n) pattern and replace with _n
    name = re.sub(r'\((\d+)\)', r'_\1', name)
    # Convert to lowercase
    name = name.lower()
    # Replace spaces and other non-alphanumeric chars with underscore
    name = re.sub(r'[^a-z0-9.]', '_', name)
    # Replace multiple underscores with a single one
    name = re.sub(r'_+', '_', name)
    # Strip underscores from start and end
    name = name.strip('_')
    return name

def convert_images(directory, target_format='WEBP', quality=80, resize=None):
    for filename in os.listdir(directory):
        if filename.endswith(('.png', '.jpg', '.jpeg', '.JPG', '.JPEG')):
            file_path = os.path.join(directory, filename)
            
            # Generate new name
            base_name, _ = os.path.splitext(filename)
            new_base_name = slugify(base_name)
            
            # Special handling for favicon
            if 'favicon' in new_base_name:
                ext = 'ico' if target_format == 'ICO' else 'png'
                new_filename = f"favicon.{ext}"
            else:
                new_filename = f"{new_base_name}.{target_format.lower()}"
                
            new_file_path = os.path.join(directory, new_filename)
            
            print(f"Converting: {filename} -> {new_filename}")
            
            try:
                with Image.open(file_path) as img:
                    if resize:
                        img = img.resize(resize, Image.Resampling.LANCZOS)
                    
                    if target_format == 'ICO':
                        img.save(new_file_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
                    else:
                        img.save(new_file_path, target_format, quality=quality)
                
                # Only remove if the name changed or extension changed
                if new_filename != filename:
                    os.remove(file_path)
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    # Optimize main logo
    logo_dir = "public/logo"
    if os.path.exists(logo_dir):
        # Convert logo.png to logo.webp
        convert_images(logo_dir)
        
        # If favicon.png exists, we might want to create a standard favicon.ico as well
        # but let's just stick to the prompt's request of converting them.
    else:
        print(f"Directory {logo_dir} not found.")
