import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Github, 
  Globe, 
  Key, 
  Link,
  CheckCircle,
  AlertCircle,
  Settings,
  Zap
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'available' | 'error';
  url?: string;
}

const ProjectIntegrations = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'github',
      name: 'GitHub',
      description: 'ربط مع مستودع GitHub لحفظ الكود ومزامنة التغييرات',
      icon: <Github className="w-6 h-6" />,
      status: 'available'
    },
    {
      id: 'vercel',
      name: 'Vercel',
      description: 'نشر سريع ومتقدم مع CDN عالمي',
      icon: <Zap className="w-6 h-6" />,
      status: 'available'
    },
    {
      id: 'netlify',
      name: 'Netlify',
      description: 'استضافة مواقع ثابتة مع دعم النشر المستمر',
      icon: <Globe className="w-6 h-6" />,
      status: 'available'
    },
    {
      id: 'supabase',
      name: 'Supabase',
      description: 'قاعدة بيانات ومصادقة وتخزين ملفات',
      icon: <Key className="w-6 h-6" />,
      status: 'connected'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Link className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'متصل';
      case 'error':
        return 'خطأ';
      default:
        return 'متاح للربط';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'connected':
        return 'default' as const;
      case 'error':
        return 'destructive' as const;
      default:
        return 'outline' as const;
    }
  };

  const handleConnect = async (integrationId: string) => {
    try {
      // محاكاة عملية الربط
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === integrationId 
            ? { ...integration, status: 'connected' as const }
            : integration
        )
      );

      toast({
        title: "تم الربط بنجاح!",
        description: `تم ربط ${integrations.find(i => i.id === integrationId)?.name} بمشروعك`,
      });
    } catch (error) {
      toast({
        title: "خطأ في الربط",
        description: "حدث خطأ أثناء ربط الخدمة",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = async (integrationId: string) => {
    try {
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === integrationId 
            ? { ...integration, status: 'available' as const }
            : integration
        )
      );

      toast({
        title: "تم قطع الاتصال",
        description: `تم قطع الاتصال مع ${integrations.find(i => i.id === integrationId)?.name}`,
      });
    } catch (error) {
      toast({
        title: "خطأ في قطع الاتصال",
        description: "حدث خطأ أثناء قطع الاتصال",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">التكاملات والربط</h2>
        <p className="text-muted-foreground">
          اربط مشروعك مع الخدمات الخارجية للنشر والتطوير
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent rounded-lg">
                    {integration.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(integration.status)}
                      <Badge variant={getStatusVariant(integration.status)} className="text-xs">
                        {getStatusText(integration.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <CardDescription className="mt-2">
                {integration.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              {integration.status === 'connected' ? (
                <div className="space-y-3">
                  {integration.url && (
                    <div>
                      <Label htmlFor={`${integration.id}-url`} className="text-xs">
                        رابط المشروع
                      </Label>
                      <Input
                        id={`${integration.id}-url`}
                        value={integration.url}
                        readOnly
                        className="text-xs"
                      />
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      إعدادات
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDisconnect(integration.id)}
                    >
                      قطع الاتصال
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  className="w-full" 
                  onClick={() => handleConnect(integration.id)}
                  disabled={integration.status === 'error'}
                >
                  <Link className="w-4 h-4 mr-2" />
                  ربط مع {integration.name}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Keys Section */}
      <Card>
        <CardHeader>
          <CardTitle>مفاتيح API</CardTitle>
          <CardDescription>
            إدارة مفاتيح API للخدمات الخارجية
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="openai-key">مفتاح OpenAI</Label>
            <Input
              id="openai-key"
              type="password"
              placeholder="sk-..."
              className="font-mono"
            />
          </div>
          <div>
            <Label htmlFor="github-token">GitHub Token</Label>
            <Input
              id="github-token"
              type="password"
              placeholder="ghp_..."
              className="font-mono"
            />
          </div>
          <Button>
            حفظ المفاتيح
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectIntegrations;