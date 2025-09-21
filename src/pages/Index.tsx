import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "Новые технологии в игровой индустрии 2024",
      content: "Исследуем последние достижения в области игровых технологий, включая ИИ, виртуальную реальность и облачные вычисления...",
      author: "Алексей Технов",
      date: "2024-09-20",
      category: "Технологии",
      image: "/img/06521d98-3115-425f-8aed-14f3f954dbfb.jpg"
    },
    {
      id: 2,
      title: "Революция в геймдеве: нейросети и процедурная генерация",
      content: "Как искусственный интеллект меняет подходы к созданию игрового контента и делает разработку более эффективной...",
      author: "Мария Кодерова",
      date: "2024-09-19",
      category: "ИИ",
      image: "/img/06521d98-3115-425f-8aed-14f3f954dbfb.jpg"
    },
    {
      id: 3,
      title: "Киберспорт: будущее уже здесь",
      content: "Анализ текущего состояния киберспорта и прогнозы развития на ближайшие годы. Новые турниры и технологии...",
      author: "Игорь Геймер",
      date: "2024-09-18",
      category: "Киберспорт",
      image: "/img/06521d98-3115-425f-8aed-14f3f954dbfb.jpg"
    }
  ]);

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    author: "",
    category: ""
  });

  const handleAddArticle = () => {
    if (newArticle.title && newArticle.content && newArticle.author && newArticle.category) {
      const article: Article = {
        id: Date.now(),
        ...newArticle,
        date: new Date().toISOString().split('T')[0],
        image: "/img/06521d98-3115-425f-8aed-14f3f954dbfb.jpg"
      };
      setArticles([article, ...articles]);
      setNewArticle({ title: "", content: "", author: "", category: "" });
    }
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-orbitron font-bold text-tech-cyan animate-glow">
              TECH BLOG
            </h1>
            <div className="flex items-center gap-4">
              <Button
                variant={isAdminMode ? "default" : "outline"}
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="font-orbitron"
              >
                <Icon name="Settings" size={16} className="mr-2" />
                {isAdminMode ? "ВЫЙТИ ИЗ АДМИНКИ" : "АДМИН РЕЖИМ"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tech-navy via-background to-tech-navy opacity-80" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-orbitron font-black text-transparent bg-gradient-to-r from-tech-cyan via-primary to-accent bg-clip-text mb-6 animate-float">
              FUTURE IS NOW
            </h2>
            <p className="text-xl md:text-2xl font-inter text-muted-foreground mb-8">
              Исследуем границы игровых технологий и делимся инсайдерской информацией
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="text-tech-cyan border-tech-cyan font-orbitron">
                <Icon name="Zap" size={14} className="mr-1" />
                ТЕХНОЛОГИИ
              </Badge>
              <Badge variant="outline" className="text-accent border-accent font-orbitron">
                <Icon name="Gamepad2" size={14} className="mr-1" />
                ИГРЫ
              </Badge>
              <Badge variant="outline" className="text-primary border-primary font-orbitron">
                <Icon name="Cpu" size={14} className="mr-1" />
                ИИ
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-tech-cyan/30 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-16 h-16 border border-accent/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-primary/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </section>

      {/* Admin Panel */}
      {isAdminMode && (
        <section className="py-8 bg-card/30 border-y border-border">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-orbitron font-bold text-tech-cyan mb-6">
              <Icon name="Shield" size={24} className="inline mr-2" />
              АДМИН ПАНЕЛЬ
            </h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="font-orbitron bg-gradient-to-r from-tech-cyan to-primary hover:from-primary hover:to-tech-cyan transition-all duration-300">
                  <Icon name="Plus" size={16} className="mr-2" />
                  ДОБАВИТЬ СТАТЬЮ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-orbitron text-tech-cyan">НОВАЯ СТАТЬЯ</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Заголовок статьи"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                    className="font-inter"
                  />
                  <Input
                    placeholder="Автор"
                    value={newArticle.author}
                    onChange={(e) => setNewArticle({...newArticle, author: e.target.value})}
                    className="font-inter"
                  />
                  <Input
                    placeholder="Категория"
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                    className="font-inter"
                  />
                  <Textarea
                    placeholder="Содержание статьи"
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                    rows={6}
                    className="font-inter"
                  />
                  <Button onClick={handleAddArticle} className="w-full font-orbitron">
                    <Icon name="Save" size={16} className="mr-2" />
                    СОХРАНИТЬ СТАТЬЮ
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-orbitron font-bold text-center mb-12">
            ПОСЛЕДНИЕ <span className="text-tech-cyan">СТАТЬИ</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="group hover:scale-105 transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/50 hover:border-tech-cyan/50 hover:shadow-lg hover:shadow-tech-cyan/20">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="font-orbitron text-xs">
                      {article.category}
                    </Badge>
                  </div>
                  {isAdminMode && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteArticle(article.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="font-orbitron text-lg group-hover:text-tech-cyan transition-colors">
                    {article.title}
                  </CardTitle>
                  <div className="flex items-center justify-between text-sm text-muted-foreground font-inter">
                    <span className="flex items-center">
                      <Icon name="User" size={14} className="mr-1" />
                      {article.author}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Calendar" size={14} className="mr-1" />
                      {new Date(article.date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-4">
                    {article.content.slice(0, 120)}...
                  </p>
                  <Button variant="outline" className="w-full font-orbitron group-hover:bg-tech-cyan/10 group-hover:border-tech-cyan transition-colors">
                    <Icon name="ArrowRight" size={14} className="mr-2" />
                    ЧИТАТЬ ДАЛЕЕ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h4 className="text-2xl font-orbitron font-bold text-tech-cyan mb-4">TECH BLOG</h4>
            <p className="text-muted-foreground font-inter mb-6">
              Будущее игровых технологий начинается здесь
            </p>
            <div className="flex justify-center space-x-6">
              <Button variant="ghost" size="sm">
                <Icon name="Github" size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Twitter" size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="MessageCircle" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;