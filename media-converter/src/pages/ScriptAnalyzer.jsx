import { useState } from 'react'
import { Loader, Wand2, Download, Copy, Check } from 'lucide-react'
import { analyzeScript } from '../services/openrouter'

export default function ScriptAnalyzer() {
  const [script, setScript] = useState('')
  const [style, setStyle] = useState('chinese')
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState('')
  const [copied, setCopied] = useState(false)

  const styles = [
    { id: 'anime', label: '🎨 Anime Nhật Bản', desc: 'Phong cách anime 2D' },
    { id: 'chinese', label: '🏯 Cổ Trang Trung Quốc', desc: 'Phong cách cổ trang Trung Quốc' },
    { id: 'watercolor', label: '🎭 Màu Nước Tây Phương', desc: 'Phong cách màu nước tây phương' },
    { id: 'manga', label: '📖 Manga Truyên Tranh', desc: 'Phong cách truyên tranh Manga' },
  ]

  const handleAnalyzeScript = async () => {
    if (!script.trim()) {
      alert('Vui lòng nhập kịch bản!')
      return
    }

    setIsLoading(true)
    try {
      const result = await analyzeScript(script, style)
      setAnalysis(result)
    } catch (error) {
      console.error('Lỗi:', error)
      alert('Không thể phân tích kịch bản. Kiểm tra API Key hoặc kết nối internet!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyAnalysis = () => {
    navigator.clipboard.writeText(analysis)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const examples = [
    {
      title: '✨ Ví dụ 1: Cô gái trên lâu đài',
      text: 'Một cô gái mặc áo cổ trang Trung Quốc đứng trên tòa lâu đài cao, nhìn ra phía dưới thung lũng. Mặt trời lặn tạo ra ánh sáng vàng rực rỡ. Trên tay cô ấy là một quyển sách cổ xưa. Cảm xúc: buồn bã, mơ mộng.'
    },
    {
      title: '⚔️ Ví dụ 2: Trận chiến anh hùng',
      text: 'Hai chiến binh cổ trang Đông Phương đối diện nhau trong một trận chiến epicc. Họ cầm kiếm sáng bạc, mặt trời mọc phía sau. Lá cây rơi xuống từ trên trời. Cảm xúc: kịch tính, mãnh liệt.'
    },
    {
      title: '🌸 Ví dụ 3: Vườn hoa trong mơ',
      text: 'Một thiếu nữ xinh đẹp đứng giữa vườn hoa anh đào nở rộ. Cô ấy mặc áo trắng bay bổng. Những cánh hoa rơi xuống như tuyết. Ánh sáng mềm mại từ mặt trời chiều. Cảm xúc: yên bình, lãng mạn.'
    }
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">🤖 Phân Tích Kịch Bản & Vẽ Hình 2D</h2>

      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">Nhập Kịch Bản</label>
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Nhập kịch bản hoặc tình huống bạn muốn AI vẽ thành hình ảnh..."
          className="w-full h-40 px-4 py-3 rounded-lg bg-black/30 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
        />
        <p className="text-gray-400 text-sm mt-2">{script.length} ký tự</p>
      </div>

      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">Lựa Chọn Phong Cách</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {styles.map(st => (
            <button
              key={st.id}
              onClick={() => setStyle(st.id)}
              className={`p-4 rounded-lg border-2 transition ${
                style === st.id
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/10'
              }`}
            >
              <div className="text-white font-semibold">{st.label}</div>
              <div className="text-gray-400 text-sm">{st.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">📝 Ví Dụ Kịch Bản</label>
        <div className="space-y-2">
          {examples.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => setScript(ex.text)}
              className="w-full text-left px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded hover:bg-purple-500/20 text-gray-300 text-sm transition"
            >
              {ex.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 flex-col md:flex-row mb-6">
        <button
          onClick={handleAnalyzeScript}
          disabled={isLoading || !script.trim()}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader size={20} className="animate-spin" />
              Đang Phân Tích...
            </>
          ) : (
            <>
              <Wand2 size={20} />
              Phân Tích & Tạo Hình
            </>
          )}
        </button>
      </div>

      {analysis && (
        <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-semibold">📋 Kết Quả Phân Tích:</h3>
            <button
              onClick={handleCopyAnalysis}
              className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded transition"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Đã sao chép!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Sao chép
                </>
              )}
            </button>
          </div>
          <div className="text-gray-300 text-sm whitespace-pre-wrap bg-black/30 p-3 rounded border border-purple-500/20 max-h-80 overflow-y-auto">
            {analysis}
          </div>
        </div>
      )}

      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-200 text-sm mb-2">
          <strong>ℹ️ Cách sử dụng:</strong>
        </p>
        <ul className="text-blue-200 text-sm space-y-1 ml-4 list-disc">
          <li>Nhập mô tả chi tiết kịch bản bạn muốn AI vẽ</li>
          <li>Chọn phong cách hình ảnh (Cổ Trang Trung Quốc được khuyên dùng)</li>
          <li>AI sẽ phân tích và tạo mô tả chi tiết tự động</li>
          <li>Copy mô tả để dùng cho các ứng dụng vẽ AI khác (DALL-E, Midjourney, etc.)</li>
          <li>Cần cấu hình OpenRouter API Key để sử dụng đầy đủ</li>
        </ul>
      </div>
    </div>
  )
}