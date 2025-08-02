import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Download,
  Eye,
  Code2,
  Github,
  Globe,
  Share2,
  Settings,
  FileText,
  Layers,
  Database,
  Palette,
  Zap,
  Plus
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProjectEditorProps {
  projectId: string;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({ projectId }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('design');
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    { id: 'react', name: 'React + TypeScript', icon: <Code2 className="w-4 h-4" /> },
    { id: 'vue', name: 'Vue.js', icon: <Code2 className="w-4 h-4" /> },
    { id: 'angular', name: 'Angular', icon: <Code2 className="w-4 h-4" /> },
    { id: 'html', name: 'HTML/CSS/JS', icon: <Globe className="w-4 h-4" /> },
    { id: 'flutter', name: 'Flutter', icon: <Code2 className="w-4 h-4" /> },
    { id: 'react-native', name: 'React Native', icon: <Code2 className="w-4 h-4" /> },
  ];

  const integrations = [
    { id: 'github', name: 'GitHub', icon: <Github className="w-4 h-4" />, status: 'connected' },
    { id: 'vercel', name: 'Vercel', icon: <Zap className="w-4 h-4" />, status: 'available' },
    { id: 'netlify', name: 'Netlify', icon: <Globe className="w-4 h-4" />, status: 'available' },
    { id: 'supabase', name: 'Supabase', icon: <Database className="w-4 h-4" />, status: 'connected' },
  ];

  const handleExport = async (format: string) => {
    setIsExporting(true);
    try {
      // هنا سيتم إضافة منطق التصدير الفعلي
      await new Promise(resolve => setTimeout(resolve, 2000)); // محاكاة التصدير
      
      toast({
        title: "تم التصدير بنجاح!",
        description: `تم تصدير المشروع بصيغة ${format}`,
      });
    } catch (error) {
      toast({
        title: "خطأ في التصدير",
        description: "حدث خطأ أثناء تصدير المشروع",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const tabs = [
    { id: 'design', name: 'التصميم', icon: <Palette className="w-4 h-4" /> },
    { id: 'code', name: 'الكود', icon: <Code2 className="w-4 h-4" /> },
    { id: 'database', name: 'قاعدة البيانات', icon: <Database className="w-4 h-4" /> },
    { id: 'deploy', name: 'النشر', icon: <Globe className="w-4 h-4" /> },
    { id: 'settings', name: 'الإعدادات', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">محرر المشروع</h1>
            <Badge variant="outline">مشروع #{projectId}</Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              معاينة
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  مشاركة
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>مشاركة المشروع</DialogTitle>
                  <DialogDescription>
                    أنشئ رابط مشاركة للمشروع
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="share-link">رابط المعاينة</Label>
                    <Input 
                      id="share-link"
                      value={`https://preview.aibuilder.com/${projectId}`}
                      readOnly
                    />
                  </div>
                  <Button className="w-full">
                    نسخ الرابط
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  تصدير
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>تصدير المشروع</DialogTitle>
                  <DialogDescription>
                    اختر صيغة التصدير المناسبة لمشروعك
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-2 gap-4">
                  {exportFormats.map((format) => (
                    <Card 
                      key={format.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleExport(format.name)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                          {format.icon}
                          <CardTitle className="text-sm">{format.name}</CardTitle>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">خيارات التصدير</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">تضمين ملفات التصميم</span>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">تضمين قاعدة البيانات</span>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">إنشاء ملف README</span>
                      <input type="checkbox" defaultChecked />
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-64 border-r border-border bg-card">
          <div className="p-4">
            <h3 className="font-medium mb-4">أدوات المشروع</h3>
            <div className="space-y-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span className="mr-2">{tab.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="p-4">
            <h3 className="font-medium mb-4">الروابط والتكاملات</h3>
            <div className="space-y-2">
              {integrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-2 rounded-lg border">
                  <div className="flex items-center space-x-2">
                    {integration.icon}
                    <span className="text-sm">{integration.name}</span>
                  </div>
                  <Badge 
                    variant={integration.status === 'connected' ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {integration.status === 'connected' ? 'متصل' : 'متاح'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'design' && (
            <div className="h-full flex">
              {/* Canvas */}
              <div className="flex-1 bg-muted/30 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Palette className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">محرر التصميم</h3>
                  <p className="text-muted-foreground max-w-md">
                    اسحب وأفلت المكونات لإنشاء تصميمك، أو استخدم مساعد الذكاء الاصطناعي لإنشاء التصميم تلقائياً
                  </p>
                  <Button>
                    <Zap className="w-4 h-4 mr-2" />
                    إنشاء بالذكاء الاصطناعي
                  </Button>
                </div>
              </div>

              {/* Properties Panel */}
              <div className="w-80 border-l border-border bg-card p-4">
                <h4 className="font-medium mb-4">خصائص العنصر</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="width">العرض</Label>
                    <Input id="width" placeholder="100%" />
                  </div>
                  <div>
                    <Label htmlFor="height">الارتفاع</Label>
                    <Input id="height" placeholder="auto" />
                  </div>
                  <div>
                    <Label htmlFor="background">لون الخلفية</Label>
                    <Input id="background" type="color" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="h-full bg-gray-900 text-white p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">محرر الكود</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    حفظ
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    معاينة
                  </Button>
                </div>
              </div>
              <div className="h-full bg-gray-800 rounded-lg p-4 font-mono text-sm">
                <pre>
{`// مرحباً بك في محرر الكود
import React from 'react';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        مرحباً بالعالم!
      </h1>
      <p className="text-gray-600">
        هذا مشروعك الجديد المُولّد بالذكاء الاصطناعي
      </p>
    </div>
  );
};

export default App;`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="h-full p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">إدارة قاعدة البيانات</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  صمم جداول قاعدة البيانات وإدارة البيانات
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  إنشاء جدول جديد
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="h-full p-6">
              <h3 className="text-2xl font-bold mb-6">نشر المشروع</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.filter(i => ['vercel', 'netlify', 'github'].includes(i.id)).map((platform) => (
                  <Card key={platform.id}>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        {platform.icon}
                        <CardTitle>{platform.name}</CardTitle>
                      </div>
                      <CardDescription>
                        انشر مشروعك على {platform.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        نشر على {platform.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="h-full p-6">
              <h3 className="text-2xl font-bold mb-6">إعدادات المشروع</h3>
              <div className="space-y-6 max-w-2xl">
                <div>
                  <Label htmlFor="project-name">اسم المشروع</Label>
                  <Input id="project-name" placeholder="اسم المشروع" />
                </div>
                <div>
                  <Label htmlFor="project-description">وصف المشروع</Label>
                  <Textarea id="project-description" placeholder="وصف موجز للمشروع" />
                </div>
                <div>
                  <Label htmlFor="project-type">نوع المشروع</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع المشروع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">موقع ويب</SelectItem>
                      <SelectItem value="mobile">تطبيق موبايل</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  حفظ الإعدادات
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectEditor;