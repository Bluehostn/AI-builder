import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Settings, 
  LogOut, 
  Code2, 
  Globe, 
  Smartphone, 
  Database,
  Eye,
  Download,
  MoreVertical,
  Sparkles,
  Zap,
  Users
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AIChat from '@/components/ai/AIChat';

interface Project {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast({
        title: "خطأ في تحميل المشاريع",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (formData: FormData) => {
    setIsCreating(true);
    try {
      const projectData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        type: formData.get('type') as string,
        user_id: user?.id,
        status: 'draft',
        content: {},
        files: [],
        settings: {}
      };

      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

      if (error) throw error;

      setProjects([data, ...projects]);
      toast({
        title: "تم إنشاء المشروع!",
        description: "يمكنك البدء في العمل على مشروعك الجديد",
      });
    } catch (error: any) {
      toast({
        title: "خطأ في إنشاء المشروع",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'website': return <Globe className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'api': return <Database className="w-5 h-5" />;
      default: return <Code2 className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "تم تسجيل الخروج",
      description: "نراك قريباً!",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">جاري تحميل المشاريع...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <Code2 className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold">AI Builder</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsChatOpen(true)}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              مساعد الذكاء الاصطناعي
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback>
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  الإعدادات
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المشاريع</CardTitle>
              <Code2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المشاريع المنشورة</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter(p => p.status === 'published').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المسودات</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter(p => p.status === 'draft').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">التعاون</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">مشاريعي</h2>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                مشروع جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>إنشاء مشروع جديد</DialogTitle>
                <DialogDescription>
                  أنشئ مشروعاً جديداً وابدأ البناء بمساعدة الذكاء الاصطناعي
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                createProject(formData);
              }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">اسم المشروع</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="مشروعي الجديد"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">وصف المشروع</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="وصف موجز للمشروع..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">نوع المشروع</Label>
                  <Select name="type" defaultValue="website">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">موقع ويب</SelectItem>
                      <SelectItem value="mobile">تطبيق موبايل</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                      <SelectItem value="dashboard">لوحة تحكم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full" disabled={isCreating}>
                  {isCreating && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>}
                  إنشاء المشروع
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">لا توجد مشاريع بعد</h3>
                <p className="text-muted-foreground">أنشئ مشروعك الأول للبدء</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getProjectIcon(project.type)}
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(project.status)} text-white`}
                      >
                        {project.status === 'published' ? 'منشور' : 
                         project.status === 'draft' ? 'مسودة' : 'مؤرشف'}
                      </Badge>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          معاينة
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          تصدير
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          إعدادات
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description || 'لا يوجد وصف'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>آخر تحديث: {new Date(project.updated_at).toLocaleDateString('ar')}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.location.href = `/project/${project.id}`}
                    >
                      فتح المشروع
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* AI Chat Component */}
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Dashboard;