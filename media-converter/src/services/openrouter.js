import axios from 'axios'

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

const openrouterClient = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  }
})

export const analyzeScript = async (script, style) => {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API Key chưa được cấu hình. Vui lòng thêm VITE_OPENROUTER_API_KEY vào .env.local')
  }

  try {
    const styleDescriptions = {
      anime: 'anime 2D Nhật Bản với đôi mắt lớn, màu sắc sáng',
      chinese: 'cổ trang Trung Quốc với áo váy cổ điển, cảnh canh phong thủy',
      watercolor: 'màu nước tây phương với hiệu ứng mềm mại, lãng mạn',
      manga: 'truyên tranh Manga với đường nét sắc nét, cơ bắp rõ',
    }

    const prompt = `Bạn là một chuyên gia vẽ hình ảnh 2D phong cách ${styleDescriptions[style] || style}.

HÃY PHÂN TÍCH KỊCH BẢN SAU VÀ TẠO MÔ TẢ CHI TIẾT ĐỂ VẼ:

Kịch bản:
${script}

MÔ TẢ PHẢI BAO GỒM:
1. Nhân vật chính:
   - Diện mạo chi tiết (tuổi, giới tính, đặc điểm nổi bật)
   - Trang phục cụ thể (màu sắc, kiểu dáng, trang sức)
   - Biểu cảm khuôn mặt
   - Tư thế cơ thể

2. Cảnh canh:
   - Địa điểm cụ thể
   - Các vật dụng và chi tiết xung quanh
   - Thời gian của ngày (sáng, chiều, tối)
   - Ánh sáng (sáng, tối, có bóng)

3. Cảm xúc & Không khí:
   - Tâm trạng chung
   - Tông màu chủ yếu
   - Cảm giác không gian

4. Chi tiết kỹ thuật:
   - Phong cách vẽ
   - Mức độ chi tiết
   - Cách sử dụng màu

HÃY TẠO MÔ TẢ SINH ĐỘNG, CHI TIẾT VÀ DỄ HÌNH DUNG NHẤT!`

    const response = await openrouterClient.post('/chat/completions', {
      model: 'mistral/mistral-7b-instruct:free',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2048,
      temperature: 0.7
    })

    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Error analyzing script:', error)
    if (error.response?.status === 401) {
      throw new Error('API Key không hợp lệ. Vui lòng kiểm tra lại.')
    }
    throw new Error('Không thể phân tích kịch bản. Kiểm tra API Key hoặc kết nối internet!')
  }
}

export default {
  analyzeScript
}