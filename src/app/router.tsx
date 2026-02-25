import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from '@/layouts'
import { AdminLayout } from '@/layouts/AdminLayout'

const HomePage = lazy(() => import('@/features/home/HomePage'))
const NewsPage = lazy(() => import('@/features/news/pages/NewsPage').then(m => ({ default: m.NewsPage })))
const NewsDetailPage = lazy(() => import('@/features/news/pages/NewsDetailPage').then(m => ({ default: m.NewsDetailPage })))
const ToolsPage = lazy(() => import('@/features/tools/pages/ToolsPage').then(m => ({ default: m.ToolsPage })))
const PromptsPage = lazy(() => import('@/features/prompts/pages/PromptsPage').then(m => ({ default: m.PromptsPage })))
const ProjectsPage = lazy(() => import('@/features/projects/pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })))

const AdminDashboard = lazy(() => import('@/features/admin/pages/AdminDashboard'))
const NewsAdminPage = lazy(() => import('@/features/admin/pages/NewsAdminPage'))
const ToolsAdminPage = lazy(() => import('@/features/admin/pages/ToolsAdminPage'))
const PromptsAdminPage = lazy(() => import('@/features/admin/pages/PromptsAdminPage'))
const ProjectsAdminPage = lazy(() => import('@/features/admin/pages/ProjectsAdminPage'))

const LoadingFallback = (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-text-muted">加载中...</div>
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={LoadingFallback}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'news',
        element: (
          <Suspense fallback={LoadingFallback}>
            <NewsPage />
          </Suspense>
        ),
      },
      {
        path: 'news/:id',
        element: (
          <Suspense fallback={LoadingFallback}>
            <NewsDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'tools',
        element: (
          <Suspense fallback={LoadingFallback}>
            <ToolsPage />
          </Suspense>
        ),
      },
      {
        path: 'prompts',
        element: (
          <Suspense fallback={LoadingFallback}>
            <PromptsPage />
          </Suspense>
        ),
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={LoadingFallback}>
            <ProjectsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={LoadingFallback}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: 'news',
        element: (
          <Suspense fallback={LoadingFallback}>
            <NewsAdminPage />
          </Suspense>
        ),
      },
      {
        path: 'tools',
        element: (
          <Suspense fallback={LoadingFallback}>
            <ToolsAdminPage />
          </Suspense>
        ),
      },
      {
        path: 'prompts',
        element: (
          <Suspense fallback={LoadingFallback}>
            <PromptsAdminPage />
          </Suspense>
        ),
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={LoadingFallback}>
            <ProjectsAdminPage />
          </Suspense>
        ),
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
