// Utility để xử lý video
export const calculateVideoDuration = (imageCount, secondsPerImage) => {
  return imageCount * secondsPerImage
}

export const validateImages = (files) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB

  return files.every(file => {
    return validTypes.includes(file.type) && file.size <= maxSize
  })
}

export const getVideoInfo = (imageCount, secondsPerImage, fps = 30) => {
  return {
    duration: calculateVideoDuration(imageCount, secondsPerImage),
    frameCount: calculateVideoDuration(imageCount, secondsPerImage) * fps,
    fileSize: '~50-100MB', // Ước tính
    resolution: '1920x1080'
  }
}

export default {
  calculateVideoDuration,
  validateImages,
  getVideoInfo
}