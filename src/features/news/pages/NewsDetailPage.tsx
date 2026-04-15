import { useParams, Link } from 'react-router-dom'
import { useDocumentTitle } from '@/shared/hooks'

export function NewsDetailPage() {
  const { id } = useParams<{ id: string }>()
  useDocumentTitle(`AI 资讯详情 - AI 资源中心`)

  return (
    <div className="space-y-6">
      <Link to="/news" className="text-accent-primary hover:text-accent-secondary flex items-center gap-2 w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        返回资讯列表
      </Link>
      
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-text-primary">AI 最新动态 {id}</h1>
        <div className="text-text-muted">2026-04-09</div>
        <div className="prose prose-lg text-text-primary max-w-none">
          <p>
            这是 AI 资讯的详细内容页面，包含完整的文章内容。
            这里可以详细介绍 AI 领域的最新发展、技术突破、行业趋势等内容。
          </p>
          <p>
            人工智能技术正在快速发展，每天都有新的突破和应用场景出现。
            本资讯平台致力于为读者提供最新、最全面的 AI 相关信息，
            帮助大家及时了解行业动态，把握技术趋势。
          </p>
          <h2>技术进展</h2>
          <p>
            在技术层面，大语言模型的能力不断提升，多模态 AI 技术日益成熟，
            边缘计算与 AI 的结合也为智能设备带来了新的可能。
          </p>
          <h2>应用场景</h2>
          <p>
            AI 在各个行业的应用也越来越广泛，从医疗健康到金融服务，
            从教育到娱乐，AI 正在改变我们的生活和工作方式。
          </p>
        </div>
      </div>
    </div>
  )
}
