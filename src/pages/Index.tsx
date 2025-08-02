import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Code2, 
  Sparkles, 
  Globe, 
  Smartphone, 
  Database, 
  Github, 
  Zap,
  Users,
  Download,
  Eye,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "إنشاء تلقائي بالذكاء الاصطناعي",
      description: "أنشئ مواقع وتطبيقات كاملة بأوامر بسيطة باللغة العربية"
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "تصدير شامل للكود",
      description: "احصل على الكود بجميع اللغات: React, Vue, Angular, Node.js وأكثر"
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: "ربط مع GitHub",
      description: "ربط مباشر مع GitHub, Vercel, Netlify لنشر سهل وسريع"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "معاينة مباشرة",
      description: "شاهد مشروعك بشكل مباشر مع روابط مشاركة فورية"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "قواعد بيانات متقدمة",
      description: "دعم Supabase, Firebase وقواعد بيانات أخرى"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "تعاون فريق",
      description: "اعمل مع فريقك على نفس المشروع في الوقت الفعلي"
    }
  ];

  const projectTypes = [
    { icon: <Globe className="w-8 h-8" />, title: "مواقع ويب", description: "مواقع تفاعلية حديثة" },
    { icon: <Smartphone className="w-8 h-8" />, title: "تطبيقات موبايل", description: "تطبيقات أصلية وهجينة" },
    { icon: <Database className="w-8 h-8" />, title: "APIs", description: "واجهات برمجة قوية" },
    { icon: <Zap className="w-8 h-8" />, title: "لوحات التحكم", description: "إدارة ومراقبة متقدمة" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-primary text-primary-foreground rounded-2xl">
              <Code2 className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-6">
            AI Builder
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            منصة ذكية لإنشاء المواقع والتطبيقات باستخدام الذكاء الاصطناعي
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            حول أفكارك إلى مشاريع حقيقية بأوامر بسيطة. إنشاء، تعديل، وتصدير مع دعم كامل للتقنيات الحديثة
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4" onClick={() => navigate('/auth')}>
              ابدأ مجاناً
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              شاهد العرض التوضيحي
              <Eye className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">مميزات قوية لمطورين أذكياء</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              كل ما تحتاجه لبناء مشاريع احترافية في مكان واحد
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">أنواع المشاريع المدعومة</h2>
            <p className="text-xl text-muted-foreground">
              من المواقع البسيطة إلى التطبيقات المعقدة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectTypes.map((type, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="mx-auto p-4 bg-accent text-accent-foreground rounded-2xl w-fit">
                    {type.icon}
                  </div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{type.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">جاهز للبدء؟</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            انضم إلى آلاف المطورين الذين يستخدمون AI Builder لتسريع تطوير مشاريعهم
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-4"
              onClick={() => navigate('/auth')}
            >
              إنشاء حساب مجاني
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              تواصل معنا
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-2 bg-primary text-primary-foreground rounded-lg">
              <Code2 className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold mr-2">AI Builder</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 AI Builder. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
