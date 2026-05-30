import { useState } from 'react'
import { Upload, Loader, Download, X } from 'lucide-react'

export default function ImageToVideo() {
  const [images, setImages] = useState([])
  const [speed, setSpeed] = useState(3)
  const [musicOption, setMusicOption] = useState('none')
  const [isLoading, setIsLoading] = useState(false)

  const musicOptions = [
    { id: 'none', label: 'Không Có Nhạc' },
    { id: 'smooth', label: 'Smooth - Êm Ái' },
    { id: 'upbeat', label: 'Upbeat - Năng Động' },
    { id: 'emotional', label: 'Emotional - Cảm Động' },
  ]

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          src: event.target.result,
          name: file.name
        }])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const handleCreateVideo = async () => {
    if (images.length < 2) {
      alert('Vui lòng tải lên ít nhất 2 hình ảnh!')
      return
    }

    setIsLoading(true)
    try {
      setTimeout(() => {
        alert('Bản miễn phí cần cấu hình backend để tạo video từ ảnh. Vui lòng xem tài liệu để cấu hình thêm!')
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      console.error('Lỗi:', error)
      alert('Không thể tạo video!')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">🖼️ Chuyển Ảnh Thành Video</h2>

      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">Tải Lên Hình Ảnh</label>
        <label className="block border-2 border-dashed border-purple-500/30 rounded-lg p-8 cursor-pointer hover:bg-purple-500/5 transition">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Upload size={24} />
            <span>Nhấp hoặc kéo ảnh vào đây (PNG, JPG, GIF)</span>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        <p className="text-gray-400 text-sm mt-2">Đã tải lên: {images.length} hình ảnh</p>
      </div>

      {images.length > 0 && (
        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">Danh Sách Hình Ảnh</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div key={img.id} className="relative group">
                <img
                  src={img.src}
                  alt={img.name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="absolute top-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 rounded-t-lg">
                  Ảnh {idx + 1}
                </div>
                <button
                  onClick={() => handleRemoveImage(img.id)}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-white font-semibold mb-2">Tốc Độ: {speed}s/ảnh</label>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full h-2 bg-purple-500/30 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Nhạc Nền</label>
          <select
            value={musicOption}
            onChange={(e) => setMusicOption(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-purple-500/30 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
          >
            {musicOptions.map(music => (
              <option key={music.id} value={music.id}>{music.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-200 text-sm">
          <strong>ℹ️ Thời lượng video:</strong> {(images.length * speed).toFixed(0)} giây
        </p>
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        <button
          onClick={handleCreateVideo}
          disabled={isLoading || images.length < 2}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader size={20} className="animate-spin" />
              Đang Tạo Video...
            </>
          ) : (
            <>
              <Download size={20} />
              Tạo Video
            </>
          )}
        </button>
      </div>
    </div>
  )
}