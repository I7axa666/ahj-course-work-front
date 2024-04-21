export default async function saveAttach(url, name) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = name;
    a.click();

    // Revoke the blob URL and remove the anchor element after a short delay
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
      a.remove();
    }, 100);
  } catch (error) {
    console.error('Error downloading attachment:', error);
  }
}
