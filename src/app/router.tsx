import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { AdminLayout } from '@/layouts/AdminLayout'

const HomePage = lazy(() => import('@/features/home/HomePage'))
const NewsPage = lazy(() => import('@/features/news/pages/NewsPage').then(m => ({ default: m.NewsPage })))
const NewsDetailPage = lazy(() => import('@/features/news/pages/NewsDetailPage').then(m => ({ default: m.NewsDetailPage })))
const ToolsPage = lazy(() => import('@/features/tools/pages/ToolsPage').then(m => ({ default: m.ToolsPage })))
const ToolDetailPage = lazy(() => import('@/features/tools/pages/ToolDetailPage').then(m => ({ default: m.ToolDetailPage })))
const PromptsPage = lazy(() => import('@/features/prompts/pages/PromptsPage').then(m => ({ default: m.PromptsPage })))
const PromptDetailPage = lazy(() => import('@/features/prompts/pages/PromptDetailPage').then(m => ({ default: m.PromptDetailPage })))
const ProjectsPage = lazy(() => import('@/features/projects/pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })))
const ProjectDetailPage = lazy(() => import('@/features/projects/pages/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })))
const ResourcesPage = lazy(() => import('@/features/resources/pages/ResourcesPage').then(m => ({ default: m.ResourcesPage })))
const ResourceDetailPage = lazy(() => import('@/features/resources/pages/ResourceDetailPage').then(m => ({ default: m.ResourceDetailPage })))
const LearningJournalPage = lazy(() => import('@/features/learning-journal/pages/LearningJournalPage').then(m => ({ default: m.LearningJournalPage })))
const LearningJournalDetailPage = lazy(() => import('@/features/learning-journal/pages/LearningJournalDetailPage').then(m => ({ default: m.LearningJournalDetailPage })))
const SearchResultsPage = lazy(() => import('@/features/search/pages/SearchResultsPage').then(m => ({ default: m.SearchResultsPage })))

const AdminDashboard = lazy(() => import('@/features/admin/pages/AdminDashboard'))
const NewsAdminPage = lazy(() => import('@/features/admin/pages/NewsAdminPage'))
const ToolsAdminPage = lazy(() => import('@/features/admin/pages/ToolsAdminPage'))
const PromptsAdminPage = lazy(() => import('@/features/admin/pages/PromptsAdminPage'))
const ProjectsAdminPage = lazy(() => import('@/features/admin/pages/ProjectsAdminPage'))
const ResourcesAdminPage = lazy(() => import('@/features/admin/pages/ResourcesAdminPage'))
const LearningJournalAdminPage = lazy(() => import('@/features/admin/pages/LearningJournalAdminPage'))

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
        path: 'tools/:id',
        element: (
          <Suspense fallback={LoadingFallback}>
            <ToolDetailPage />
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
        path: 'prompts/:id',
        element: (
          <Suspense fallback={LoadingFallback}>
            <PromptDetailPage />
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
      {
        path: 'projects/:id',
        element: (
          <Suspense fallback={LoadingFallback}>
            <ProjectDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'resources',
        element: (
          <Suspense fallback={LoadingFallback}>
            <ResourcesPage />
          </Suspense>
        ),
      },
      {
        path: 'resources/:id',
        element: (
          <Suspense fallback={LoadingFallback}>
            <ResourceDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'learning-journal',
        element: (
          <Suspense fallback={LoadingFallback}>
            <LearningJournalPage />
          </Suspense>
        ),
      },
      {
        path: 'learning-journal/:id',
        element: (
          <Suspense fallback={LoadingFallback}>
            <LearningJournalDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'search',
        element: (
          <Suspense fallback={LoadingFallback}>
            <SearchResultsPage />
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
      {
        path: 'resources',
        element: (
          <Suspense fallback={LoadingFallback}>
            <ResourcesAdminPage />
          </Suspense>
        ),
      },
      {
        path: 'learning-journal',
        element: (
          <Suspense fallback={LoadingFallback}>
            <LearningJournalAdminPage />
          </Suspense>
        ),
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
