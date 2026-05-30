import { useState, useRef } from 'react'
import { Play, Download, Loader } from 'lucide-react'

export default function TextToSpeech() {
  const [text, setText] = useState('')
  const [language, setLanguage] = useState('vi-VN')
  const [voice, setVoice] = useState('female')
  const [speed, setSpeed] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef(null)

  const languages = [
    { code: 'vi-VN', label: 'Tiếng Việt' },
    { code: 'en-US', label: 'Tiếng Anh (Mỹ)' },
    { code: 'zh-CN', label: 'Tiếng Trung (Giản Thể)' },
    { code: 'ja-JP', label: 'Tiếng Nhật' },
    { code: 'ko-KR', label: 'Tiếng Hàn' },
    { code: 'es-ES', label: 'Tiếng Tây Ban Nha' },
    { code: 'fr-FR', label: 'Tiếng Pháp' },
  ]

  const handleSpeak = async () => {
    if (!text.trim()) {
      alert('Vui lòng nhập văn bản!')
      return
    }

    setIsLoading(true)
    try {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language
      utterance.rate = speed
      utterance.pitch = voice === 'female' ? 1.2 : 0.8
      utterance.volume = 1

      speechSynthesis.speak(utterance)

      utterance.onend = () => setIsLoading(false)
    } catch (error) {
      console.error('Lỗi:', error)
      alert('Không thể phát âm thanh!')
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!text.trim()) {
      alert('Vui lòng nhập văn bản!')
      return
    }

    setIsLoading(true)
    try {
      alert('Để tải xuống, vui lòng cấu hình Google Cloud TTS API. Xem tài liệu HUONG_DAN.md')
      setIsLoading(false)
    } catch (error) {
      console.error('Lỗi:', error)
      alert('Không thể tải xuống!')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">🎤 Chuyển Text Thành Giọng Nói</h2>

      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">Nhập Văn Bản</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập văn bản mà bạn muốn chuyển thành giọng nói..."
          className="w-full h-32 px-4 py-3 rounded-lg bg-black/30 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
        />
        <p className="text-gray-400 text-sm mt-2">{text.length} ký tự</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-white font-semibold mb-2">Ngôn Ngữ</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-purple-500/30 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Giọng</label>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-purple-500/30 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
          >
            <option value="female">Nữ</option>
            <option value="male">Nam</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">Tốc Độ: {speed.toFixed(1)}x</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-purple-500/30 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        <button
          onClick={handleSpeak}
          disabled={isLoading || !text.trim()}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader size={20} className="animate-spin" />
              Đang Phát...
            </>
          ) : (
            <>
              <Play size={20} />
              Phát Âm Thanh
            </>
          )}
        </button>

        <button
          onClick={handleDownload}
          disabled={isLoading || !text.trim()}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <Download size={20} />
          Tải Xuống MP3
        </button>
      </div>

      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-200 text-sm">
          <strong>ℹ️ Lưu ý:</strong> Bản miễn phí sử dụng Web Speech API của trình duyệt. Để tải xuống MP3, bạn cần cấu hình Google Cloud TTS API.
        </p>
      </div>

      <audio ref={audioRef} />
    </div>
  )
}