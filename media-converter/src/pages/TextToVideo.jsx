import { useState } from 'react'
import { Loader, Play, Download } from 'lucide-react'

export default function TextToVideo() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [background, setBackground] = useState('nature')
  const [musicOption, setMusicOption] = useState('none')
  const [isLoading, setIsLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)

  const backgrounds = [
    { id: 'nature', label: 'Thiên Nhiên', color: 'bg-green-600' },
    { id: 'city', label: 'Thành Phố', color: 'bg-gray-600' },
    { id: 'night', label: 'Ban Đêm', color: 'bg-slate-900' },
    { id: 'ocean', label: 'Đại Dương', color: 'bg-blue-600' },
  ]

  const musicOptions = [
    { id: 'none', label: 'Không Có Nhạc' },
    { id: 'ambient', label: 'Ambient Nhẹ Nhàng' },
    { id: 'upbeat', label: 'Upbeat Năng Động' },
    { id: 'dramatic', label: 'Dramatic Kịch Tính' },
  ]

  const handleCreateVideo = async () => {
    if (!title.trim() || !text.trim()) {
      alert('Vui lòng nhập tiêu đề và nội dung!')
      return
    }

    setIsLoading(true)
    try {
      setTimeout(() => {
        alert('Trong bản miễn phí, tính năng tạo video yêu cầu cấu hình backend hoặc sử dụng API bên thứ 3! Xem tài liệu để tìm hiểu thêm.')
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
      <h2 className="text-3xl font-bold text-white mb-6">🎥 Chuyển Text Thành Video</h2>

      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">Tiêu Đề Video</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề video..."
          className="w-full px-4 py-3 rounded-lg bg-black/30 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
        />
      </div>

      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">Nội Dung</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập nội dung cho video..."
          className="w-full h-32 px-4 py-3 rounded-lg bg-black/30 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-white font-semibold mb-2">Background</label>
          <select
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-purple-500/30 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
          >
            {backgrounds.map(bg => (
              <option key={bg.id} value={bg.id}>{bg.label}</option>
            ))}
          </select>
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

      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">Xem Trước Background</label>
        <div className={`h-40 rounded-lg ${backgrounds.find(bg => bg.id === background)?.color} flex items-center justify-center text-white font-semibold`}>
          Xem trước nền: {backgrounds.find(bg => bg.id === background)?.label}
        </div>
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        <button
          onClick={handleCreateVideo}
          disabled={isLoading || !title.trim() || !text.trim()}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader size={20} className="animate-spin" />
              Đang Tạo Video...
            </>
          ) : (
            <>
              <Play size={20} />
              Tạo Video
            </>
          )}
        </button>

        <button
          disabled={!videoUrl}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <Download size={20} />
          Tải Xuống Video
        </button>
      </div>

      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-200 text-sm">
          <strong>ℹ️ Lưu ý:</strong> Tính năng tạo video cần backend hoặc API bên thứ 3. Vui lòng cấu hình thêm để sử dụng đầy đủ.
        </p>
      </div>
    </div>
  )
}