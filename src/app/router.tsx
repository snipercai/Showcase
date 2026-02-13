import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from '@/layouts'

const HomePage = lazy(() => import('@/features/home/HomePage'))
const NewsPage = lazy(() => import('@/features/news/pages/NewsPage').then(m => ({ default: m.NewsPage })))
const NewsDetailPage = lazy(() => import('@/features/news/pages/NewsDetailPage').then(m => ({ default: m.NewsDetailPage })))
const ToolsPage = lazy(() => import('@/features/tools/pages/ToolsPage').then(m => ({ default: m.ToolsPage })))
const PromptsPage = lazy(() => import('@/features/prompts/pages/PromptsPage').then(m => ({ default: m.PromptsPage })))
const ProjectsPage = lazy(() => import('@/features/projects/pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })))

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div className="text-center py-12 text-gray-500">加载中...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'news',
        element: (
          <Suspense fallback={<div className="text-center py-12 text-gray-500">加载中...</div>}>
            <NewsPage />
          </Suspense>
        ),
      },
      {
        path: 'news/:id',
        element: (
          <Suspense fallback={<div className="text-center py-12 text-gray-500">加载中...</div>}>
            <NewsDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'tools',
        element: (
          <Suspense fallback={<div className="text-center py-12 text-gray-500">加载中...</div>}>
            <ToolsPage />
          </Suspense>
        ),
      },
      {
        path: 'prompts',
        element: (
          <Suspense fallback={<div className="text-center py-12 text-gray-500">加载中...</div>}>
            <PromptsPage />
          </Suspense>
        ),
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<div className="text-center py-12 text-gray-500">加载中...</div>}>
            <ProjectsPage />
          </Suspense>
        ),
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
