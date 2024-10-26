import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileSpreadsheet, KeyRound, ChevronLeft, ChevronRight, Plus, ChevronDown, Trash2, Rocket } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from './ui/Toast';

interface Project {
  id: string;
  name: string;
  createdAt: string;
  context?: any;
}

const navigation = [
  {
    name: 'Context',
    icon: LayoutDashboard,
    href: '/',
    children: [
      { name: 'E-commerce Context', href: '/' },
      { name: 'Meta Analysis', href: '/meta' },
      { name: 'SEMrush Import', href: '/semrush' }
    ]
  },
  {
    name: 'Keyword Analysis',
    icon: KeyRound,
    href: '/keywords',
    children: []
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    const projects = storedProjects ? JSON.parse(storedProjects) : [];
    setProjects(projects);

    const currentProjectId = localStorage.getItem('currentProjectId');
    if (currentProjectId) {
      const project = projects.find((p: Project) => p.id === currentProjectId);
      if (project) setCurrentProject(project);
    }
  }, []);

  const handleProjectSelect = (project: Project | null) => {
    setCurrentProject(project);
    if (project) {
      localStorage.setItem('currentProjectId', project.id);
    } else {
      localStorage.removeItem('currentProjectId');
    }
    setIsProjectMenuOpen(false);
  };

  const handleNewProject = () => {
    navigate('/semrush');
    setIsProjectMenuOpen(false);
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    if (currentProject?.id === projectId) {
      setCurrentProject(null);
      localStorage.removeItem('currentProjectId');
    }
    
    setShowDeleteConfirm(null);
    setIsProjectMenuOpen(false);
    toast.success('Project deleted successfully');
  };

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (item: typeof navigation[0]) => 
    item.href === location.pathname || 
    item.children.some(child => child.href === location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          {isCollapsed ? (
            <img src="/logo.svg" alt="RaukPanda" className="h-8 w-8" />
          ) : (
            <img src="/logo.svg" alt="RaukPanda" className="h-8" />
          )}
        </div>

        {/* Navigation */}
        <nav className="px-2 pt-4">
          {navigation.map((item) => (
            <div key={item.name} className="mb-4">
              <Link
                to={item.href}
                className={`
                  flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${isParentActive(item) 
                    ? 'text-secondary-dark bg-secondary-lime' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}
                `}
              >
                <item.icon className={`flex-shrink-0 h-5 w-5 ${isParentActive(item) ? 'text-secondary-dark' : 'text-gray-400'}`} />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>

              {/* Subnav */}
              {!isCollapsed && item.children.length > 0 && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.href}
                      className={`
                        block px-2 py-1.5 text-sm rounded-md
                        ${isActive(child.href)
                          ? 'text-secondary-dark bg-secondary-lime bg-opacity-50'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                      `}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute bottom-4 left-0 right-0 mx-auto flex items-center justify-center h-8 w-8 rounded-full bg-secondary-lime hover:bg-opacity-80 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-secondary-dark" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-secondary-dark" />
          )}
        </button>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'pl-16' : 'pl-64'}`}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="h-full px-4 md:px-8 flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-moonwalk text-secondary-dark">
              {navigation.find(item => isParentActive(item))?.name}
            </h1>
            
            {/* Project Selector */}
            <div className="relative">
              <button
                onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
                className={`
                  flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                  ${currentProject 
                    ? 'text-secondary-dark bg-secondary-lime hover:bg-opacity-80' 
                    : 'text-white bg-secondary-dark hover:bg-opacity-90'}
                `}
              >
                {currentProject ? (
                  <>
                    <span>{currentProject.name}</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    <span>New Project</span>
                  </>
                )}
              </button>

              {isProjectMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div
                      role="menuitem"
                      onClick={handleNewProject}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-secondary-lime hover:bg-opacity-50 flex items-center cursor-pointer"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </div>
                    
                    {projects.length > 0 && <div className="border-t border-gray-100 my-1" />}
                    
                    {projects.map((project) => (
                      <div key={project.id} className="group relative">
                        <div
                          role="menuitem"
                          onClick={() => handleProjectSelect(project)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-secondary-lime hover:bg-opacity-50 flex items-center justify-between group cursor-pointer"
                        >
                          <span className="truncate">{project.name}</span>
                          <div className="flex items-center space-x-2">
                            {showDeleteConfirm === project.id ? (
                              <>
                                <span
                                  role="button"
                                  onClick={(e) => handleDeleteProject(project.id, e)}
                                  className="text-red-600 hover:text-red-700 cursor-pointer"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </span>
                                <span
                                  role="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDeleteConfirm(null);
                                  }}
                                  className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
                                >
                                  Cancel
                                </span>
                              </>
                            ) : (
                              <span
                                role="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowDeleteConfirm(project.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}