
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const formatFileSize = (sizeInBytes) => {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    if (sizeInMB < 1) {
        return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else if (sizeInMB < 1024) {
        return `${sizeInMB.toFixed(2)} MB`;
    } else {
        const sizeInGB = sizeInMB / 1024;
        return `${sizeInGB.toFixed(2)} GB`;
    }
};