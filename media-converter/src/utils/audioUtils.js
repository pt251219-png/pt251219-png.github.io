// Utility để xử lý audio
export const generateAudioFromText = (text, language = 'vi-VN', speed = 1) => {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = language
  utterance.rate = speed
  utterance.pitch = 1
  utterance.volume = 1

  return utterance
}

// Utility để lấy các ngôn ngữ hỗ trợ
export const getSupportedLanguages = () => {
  return [
    { code: 'vi-VN', label: 'Tiếng Việt' },
    { code: 'en-US', label: 'Tiếng Anh (Mỹ)' },
    { code: 'en-GB', label: 'Tiếng Anh (UK)' },
    { code: 'zh-CN', label: 'Tiếng Trung (Giản)' },
    { code: 'zh-TW', label: 'Tiếng Trung (Phồn)' },
    { code: 'ja-JP', label: 'Tiếng Nhật' },
    { code: 'ko-KR', label: 'Tiếng Hàn' },
    { code: 'es-ES', label: 'Tiếng Tây Ban Nha' },
    { code: 'fr-FR', label: 'Tiếng Pháp' },
    { code: 'de-DE', label: 'Tiếng Đức' },
  ]
}

export default {
  generateAudioFromText,
  getSupportedLanguages
}