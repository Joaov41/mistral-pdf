// Detect document type from URL
export function detectDocumentType(url) {
  const lowerUrl = url.toLowerCase();
  
  if (
    lowerUrl.endsWith('.png') ||
    lowerUrl.endsWith('.jpg') ||
    lowerUrl.endsWith('.jpeg') ||
    lowerUrl.endsWith('.gif') ||
    lowerUrl.endsWith('.webp') ||
    lowerUrl.endsWith('.bmp') ||
    lowerUrl.endsWith('.tiff')
  ) {
    return 'image_url';
  }
  
  if (lowerUrl.endsWith('.pdf')) {
    return 'document_url';
  }
  
  if (lowerUrl.includes('drive.google.com') || lowerUrl.includes('docs.google.com')) {
    return 'document_url';
  }
  
  if (lowerUrl.includes('dropbox.com')) {
    return lowerUrl.includes('pdf') ? 'document_url' : 'image_url';
  }
  
  if (lowerUrl.includes('github.com')) {
    return lowerUrl.includes('pdf') ? 'document_url' : 'image_url';
  }
  
  if (lowerUrl.includes('onedrive.live.com') || lowerUrl.includes('1drv.ms')) {
    return 'document_url';
  }
  
  if (lowerUrl.includes('drive.proton.me') || lowerUrl.includes('proton.me/urls/')) {
    return 'document_url';
  }
  
  if (lowerUrl.includes('icloud.com') || lowerUrl.includes('apple.com/sharedfiles/')) {
    return 'document_url';
  }
  
  if (lowerUrl.includes('box.com')) {
    return 'document_url';
  }
  
  return 'document_url';
}

// Process URL to ensure compatibility with the API
export function processUrl(url) {
  url = url.trim();
  
  // Handle Dropbox URLs
  if (url.includes('dropbox.com')) {
    url = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    if (url.includes('?dl=0')) {
      url = url.replace('?dl=0', '?dl=1');
    } else if (!url.includes('?dl=1')) {
      url += '?dl=1';
    }
    return url;
  }
  
  // Convert Google Drive file links
  if (url.includes('drive.google.com/file/d/')) {
    const fileIdMatch = url.match(/\/file\/d\/([^\/]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    }
  }
  
  // Convert Google Docs links to PDF
  if (url.includes('docs.google.com/document/d/')) {
    const fileIdMatch = url.match(/\/document\/d\/([^\/]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://docs.google.com/document/d/${fileIdMatch[1]}/export?format=pdf`;
    }
  }
  
  return url;
}

// Determine if file is an image based on file extension or MIME type
export function isImageFile(blob, filename) {
  if (blob?.type?.startsWith('image/')) {
    return true;
  }
  
  if (filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'tiff'];
    return imageExtensions.includes(ext);
  }
  
  return false;
}
