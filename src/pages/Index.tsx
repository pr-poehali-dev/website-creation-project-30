import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
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

interface User {
  id: number;
  username: string;
  rank: UserRank;
  joinDate: string;
  lastActive: string;
}

type UserRank = 'GUEST' | 'MEMBER' | 'MODERATOR' | 'ADMIN' | 'OWNER' | 'HEAD_PROJECT';

interface RankPermissions {
  canCreateArticles: boolean;
  canEditArticles: boolean;
  canDeleteArticles: boolean;
  canManageUsers: boolean;
  canChangeRanks: boolean;
  canAccessAnalytics: boolean;
  canManageFactions: boolean;
  canEditInterface: boolean;
  canManageEvents: boolean;
  canGlobalEdit: boolean;
}

interface GameEvent {
  id: number;
  title: string;
  description: string;
  type: 'BATTLE' | 'TOURNAMENT' | 'RAID' | 'MEETING' | 'CELEBRATION';
  startDate: string;
  endDate: string;
  participants: string[];
  rewards: string;
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  createdBy: string;
}

interface Faction {
  id: number;
  name: string;
  description: string;
  color: string;
  leader: string;
  members: number;
  founded: string;
  status: 'ACTIVE' | 'INACTIVE' | 'WAR' | 'ALLIANCE';
}

interface EditableText {
  id: string;
  text: string;
  isEditing: boolean;
}

const RANK_PERMISSIONS: Record<UserRank, RankPermissions> = {
  GUEST: {
    canCreateArticles: false,
    canEditArticles: false,
    canDeleteArticles: false,
    canManageUsers: false,
    canChangeRanks: false,
    canAccessAnalytics: false,
    canManageFactions: false,
    canEditInterface: false,
    canManageEvents: false,
    canGlobalEdit: false
  },
  MEMBER: {
    canCreateArticles: true,
    canEditArticles: false,
    canDeleteArticles: false,
    canManageUsers: false,
    canChangeRanks: false,
    canAccessAnalytics: false,
    canManageFactions: false,
    canEditInterface: false,
    canManageEvents: false,
    canGlobalEdit: false
  },
  MODERATOR: {
    canCreateArticles: true,
    canEditArticles: true,
    canDeleteArticles: true,
    canManageUsers: false,
    canChangeRanks: false,
    canAccessAnalytics: true,
    canManageFactions: false,
    canEditInterface: false,
    canManageEvents: false,
    canGlobalEdit: false
  },
  ADMIN: {
    canCreateArticles: true,
    canEditArticles: true,
    canDeleteArticles: true,
    canManageUsers: true,
    canChangeRanks: true,
    canAccessAnalytics: true,
    canManageFactions: true,
    canEditInterface: false,
    canManageEvents: false,
    canGlobalEdit: false
  },
  OWNER: {
    canCreateArticles: true,
    canEditArticles: true,
    canDeleteArticles: true,
    canManageUsers: true,
    canChangeRanks: true,
    canAccessAnalytics: true,
    canManageFactions: true,
    canEditInterface: false,
    canManageEvents: true,
    canGlobalEdit: false
  },
  HEAD_PROJECT: {
    canCreateArticles: true,
    canEditArticles: true,
    canDeleteArticles: true,
    canManageUsers: true,
    canChangeRanks: true,
    canAccessAnalytics: true,
    canManageFactions: true,
    canEditInterface: true,
    canManageEvents: true,
    canGlobalEdit: true
  }
};

const RANK_COLORS: Record<UserRank, string> = {
  GUEST: 'text-muted-foreground',
  MEMBER: 'text-tech-cyan',
  MODERATOR: 'text-primary',
  ADMIN: 'text-accent',
  OWNER: 'text-yellow-400',
  HEAD_PROJECT: 'text-red-400'
};

const RANK_ICONS: Record<UserRank, string> = {
  GUEST: 'User',
  MEMBER: 'Users',
  MODERATOR: 'Shield',
  ADMIN: 'Crown',
  OWNER: 'Zap',
  HEAD_PROJECT: 'Flame'
};

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 1,
    username: "Head_Project",
    rank: "HEAD_PROJECT",
    joinDate: "2024-01-01",
    lastActive: "2024-09-21"
  });
  
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      username: "Head_Project",
      rank: "HEAD_PROJECT",
      joinDate: "2024-01-01",
      lastActive: "2024-09-21"
    },
    {
      id: 2,
      username: "TechWriter_Alex",
      rank: "ADMIN",
      joinDate: "2024-02-15",
      lastActive: "2024-09-20"
    },
    {
      id: 3,
      username: "Moderator_Maria",
      rank: "MODERATOR",
      joinDate: "2024-03-10",
      lastActive: "2024-09-19"
    },
    {
      id: 4,
      username: "Member_Igor",
      rank: "MEMBER",
      joinDate: "2024-04-05",
      lastActive: "2024-09-18"
    }
  ]);
  
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
  const [newUser, setNewUser] = useState({
    username: "",
    rank: "MEMBER" as UserRank
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const [factions, setFactions] = useState<Faction[]>([
    {
      id: 1,
      name: "Кибер-Империя",
      description: "Доминирующая фракция в мире высоких технологий",
      color: "tech-cyan",
      leader: "Emperor_Nexus",
      members: 1247,
      founded: "2024-01-15",
      status: "ACTIVE"
    },
    {
      id: 2,
      name: "Пиксельные Мятежники",
      description: "Революционеры цифрового мира",
      color: "accent",
      leader: "Rebel_Matrix",
      members: 892,
      founded: "2024-03-08",
      status: "WAR"
    },
    {
      id: 3,
      name: "Нейро-Альянс",
      description: "Объединение ИИ-разработчиков",
      color: "primary",
      leader: "AI_Mastermind",
      members: 543,
      founded: "2024-05-20",
      status: "ALLIANCE"
    }
  ]);
  
  const [newFaction, setNewFaction] = useState({
    name: "",
    description: "",
    color: "tech-cyan",
    leader: ""
  });
  
  const [editableTexts, setEditableTexts] = useState<Record<string, EditableText>>({
    heroTitle: { id: "heroTitle", text: "FUTURE IS NOW", isEditing: false },
    heroSubtitle: { id: "heroSubtitle", text: "Исследуем границы игровых технологий и делимся инсайдерской информацией", isEditing: false },
    articlesTitle: { id: "articlesTitle", text: "ПОСЛЕДНИЕ СТАТЬИ", isEditing: false },
    blogTitle: { id: "blogTitle", text: "TECH BLOG", isEditing: false },
    adminPanelTitle: { id: "adminPanelTitle", text: "АДМИН ПАНЕЛЬ", isEditing: false },
    footerTitle: { id: "footerTitle", text: "TECH BLOG", isEditing: false },
    footerSubtitle: { id: "footerSubtitle", text: "Будущее игровых технологий начинается здесь", isEditing: false }
  });
  
  const [gameEvents, setGameEvents] = useState<GameEvent[]>([
    {
      id: 1,
      title: "Кибер-турнир 2024",
      description: "Глобальное соревнование между фракциями",
      type: "TOURNAMENT",
      startDate: "2024-10-01",
      endDate: "2024-10-15",
      participants: ["Cyber_Empire", "Pixel_Rebels", "Neuro_Alliance"],
      rewards: "10000 кредитов + уникальные скины",
      status: "UPCOMING",
      createdBy: "Head_Project"
    },
    {
      id: 2,
      title: "Рейд на ИИ-базу",
      description: "Кооперативный рейд всех фракций",
      type: "RAID",
      startDate: "2024-09-25",
      endDate: "2024-09-26",
      participants: ["All_Factions"],
      rewards: "Редкие чертежи и сырье",
      status: "ACTIVE",
      createdBy: "Emperor_Nexus"
    }
  ]);
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    type: "TOURNAMENT" as GameEvent['type'],
    startDate: "",
    endDate: "",
    rewards: ""
  });
  
  const [globalEditMode, setGlobalEditMode] = useState(false);
  
  const currentPermissions = RANK_PERMISSIONS[currentUser.rank];
  
  const canPerformAction = (action: keyof RankPermissions): boolean => {
    return currentPermissions[action];
  };
  
  const handleEditText = (id: string, newText: string) => {
    if (!canPerformAction('canEditInterface') && !globalEditMode) return;
    
    setEditableTexts(prev => ({
      ...prev,
      [id]: { ...prev[id], text: newText, isEditing: false }
    }));
  };
  
  const toggleEdit = (id: string) => {
    if (!canPerformAction('canEditInterface') && !globalEditMode) return;
    
    setEditableTexts(prev => ({
      ...prev,
      [id]: { ...prev[id], isEditing: !prev[id].isEditing }
    }));
  };
  
  const toggleGlobalEditMode = () => {
    if (!canPerformAction('canGlobalEdit')) return;
    setGlobalEditMode(!globalEditMode);
  };
  
  const handleAddEvent = () => {
    if (!canPerformAction('canManageEvents')) return;
    
    if (newEvent.title && newEvent.description && newEvent.startDate && newEvent.endDate) {
      const event: GameEvent = {
        id: Date.now(),
        ...newEvent,
        participants: [],
        status: 'UPCOMING',
        createdBy: currentUser.username
      };
      setGameEvents([...gameEvents, event]);
      setNewEvent({ title: "", description: "", type: "TOURNAMENT", startDate: "", endDate: "", rewards: "" });
    }
  };
  
  const handleDeleteEvent = (id: number) => {
    if (!canPerformAction('canManageEvents')) return;
    setGameEvents(gameEvents.filter(event => event.id !== id));
  };
  
  const handleJoinEvent = (eventId: number) => {
    setGameEvents(gameEvents.map(event => 
      event.id === eventId && !event.participants.includes(currentUser.username)
        ? { ...event, participants: [...event.participants, currentUser.username] }
        : event
    ));
  };
  
  const getEventStatusColor = (status: GameEvent['status']) => {
    switch(status) {
      case 'UPCOMING': return 'bg-blue-500/20 text-blue-400 border-blue-400';
      case 'ACTIVE': return 'bg-green-500/20 text-green-400 border-green-400';
      case 'COMPLETED': return 'bg-gray-500/20 text-gray-400 border-gray-400';
      case 'CANCELLED': return 'bg-red-500/20 text-red-400 border-red-400';
    }
  };
  
  const getEventTypeIcon = (type: GameEvent['type']) => {
    switch(type) {
      case 'BATTLE': return 'Swords';
      case 'TOURNAMENT': return 'Trophy';
      case 'RAID': return 'Shield';
      case 'MEETING': return 'Users';
      case 'CELEBRATION': return 'PartyPopper';
    }
  };

  const handleAddArticle = () => {
    if (!canPerformAction('canCreateArticles')) return;
    
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
    if (!canPerformAction('canDeleteArticles')) return;
    setArticles(articles.filter(article => article.id !== id));
  };
  
  const handleAddUser = () => {
    if (!canPerformAction('canManageUsers')) return;
    
    if (newUser.username) {
      const user: User = {
        id: Date.now(),
        username: newUser.username,
        rank: newUser.rank,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, user]);
      setNewUser({ username: "", rank: "MEMBER" });
    }
  };
  
  const handleChangeUserRank = (userId: number, newRank: UserRank) => {
    if (!canPerformAction('canChangeRanks')) return;
    
    // Prevent changing head project rank or promoting to head project/owner (unless current user is head project)
    if ((newRank === 'OWNER' || newRank === 'HEAD_PROJECT') && currentUser.rank !== 'HEAD_PROJECT') return;
    
    const targetUser = users.find(u => u.id === userId);
    if ((targetUser?.rank === 'OWNER' || targetUser?.rank === 'HEAD_PROJECT') && currentUser.rank !== 'HEAD_PROJECT') return;
    
    setUsers(users.map(user => 
      user.id === userId ? { ...user, rank: newRank } : user
    ));
  };
  
  const handleDeleteUser = (userId: number) => {
    if (!canPerformAction('canManageUsers')) return;
    
    const targetUser = users.find(u => u.id === userId);
    if (targetUser?.rank === 'OWNER' || targetUser?.rank === 'HEAD_PROJECT') return; // Can't delete owner or head project
    if (userId === currentUser.id) return; // Can't delete self
    
    setUsers(users.filter(user => user.id !== userId));
  };
  
  const getRankBadgeColor = (rank: UserRank) => {
    switch(rank) {
      case 'HEAD_PROJECT': return 'bg-red-400/20 text-red-400 border-red-400 animate-glow';
      case 'OWNER': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400';
      case 'ADMIN': return 'bg-accent/20 text-accent border-accent';
      case 'MODERATOR': return 'bg-primary/20 text-primary border-primary';
      case 'MEMBER': return 'bg-tech-cyan/20 text-tech-cyan border-tech-cyan';
      default: return 'bg-muted text-muted-foreground border-muted-foreground';
    }
  };
  
  const getFactionStatusColor = (status: Faction['status']) => {
    switch(status) {
      case 'ACTIVE': return 'bg-green-500/20 text-green-400 border-green-400';
      case 'WAR': return 'bg-red-500/20 text-red-400 border-red-400';
      case 'ALLIANCE': return 'bg-blue-500/20 text-blue-400 border-blue-400';
      case 'INACTIVE': return 'bg-gray-500/20 text-gray-400 border-gray-400';
    }
  };
  
  const handleAddFaction = () => {
    if (!canPerformAction('canManageFactions')) return;
    
    if (newFaction.name && newFaction.description && newFaction.leader) {
      const faction: Faction = {
        id: Date.now(),
        ...newFaction,
        members: 0,
        founded: new Date().toISOString().split('T')[0],
        status: 'ACTIVE'
      };
      setFactions([...factions, faction]);
      setNewFaction({ name: "", description: "", color: "tech-cyan", leader: "" });
    }
  };
  
  const handleDeleteFaction = (id: number) => {
    if (!canPerformAction('canManageFactions')) return;
    setFactions(factions.filter(faction => faction.id !== id));
  };
  
  const EditableText = ({ id, className = "", placeholder = "" }: { id: string; className?: string; placeholder?: string }) => {
    const textData = editableTexts[id];
    const canEdit = canPerformAction('canEditInterface') || globalEditMode;
    
    if (!textData) return null;
    
    if (textData.isEditing && canEdit) {
      return (
        <Input
          value={textData.text}
          onChange={(e) => setEditableTexts(prev => ({ ...prev, [id]: { ...prev[id], text: e.target.value } }))}
          onBlur={() => handleEditText(id, textData.text)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEditText(id, textData.text);
            if (e.key === 'Escape') toggleEdit(id);
          }}
          className={`${className} bg-transparent border-tech-cyan/50`}
          placeholder={placeholder}
          autoFocus
        />
      );
    }
    
    return (
      <span
        className={`${className} ${canEdit ? 'cursor-pointer hover:bg-tech-cyan/10 hover:outline hover:outline-1 hover:outline-tech-cyan/50 rounded px-1 transition-all' : ''} ${globalEditMode ? 'animate-pulse ring-1 ring-red-400/50' : ''}`}
        onClick={() => canEdit && toggleEdit(id)}
        title={canEdit ? 'Нажмите для редактирования' : ''}
      >
        {textData.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-orbitron font-bold text-tech-cyan animate-glow">
              <EditableText id="blogTitle" className="text-3xl font-orbitron font-bold text-tech-cyan animate-glow" />
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge className={`font-orbitron text-xs ${getRankBadgeColor(currentUser.rank)}`}>
                  <Icon name={RANK_ICONS[currentUser.rank]} size={12} className="mr-1" />
                  {currentUser.rank}
                </Badge>
                <span className="text-sm font-inter text-muted-foreground">
                  {currentUser.username}
                </span>
              </div>
              <div className="flex gap-2">
                {canPerformAction('canGlobalEdit') && (
                  <Button
                    variant={globalEditMode ? "destructive" : "secondary"}
                    onClick={toggleGlobalEditMode}
                    className={`font-orbitron transition-all duration-300 ${globalEditMode ? 'animate-pulse' : ''}`}
                  >
                    <Icon name={globalEditMode ? "Eye" : "Edit"} size={16} className="mr-2" />
                    {globalEditMode ? "ВЫКЛ РЕЖИМ" : "МОД РЕДАКТОРА"}
                  </Button>
                )}
                <Button
                  variant={isAdminMode ? "default" : "outline"}
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className="font-orbitron"
                  disabled={!canPerformAction('canManageUsers') && !canPerformAction('canCreateArticles')}
                >
                  <Icon name="Settings" size={16} className="mr-2" />
                  {isAdminMode ? "ВЫЙТИ ИЗ АДМИНКИ" : "АДМИН РЕЖИМ"}
                </Button>
              </div>
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
              <EditableText id="heroTitle" className="text-5xl md:text-7xl font-orbitron font-black text-transparent bg-gradient-to-r from-tech-cyan via-primary to-accent bg-clip-text" />
            </h2>
            <p className="text-xl md:text-2xl font-inter text-muted-foreground mb-8">
              <EditableText id="heroSubtitle" className="text-xl md:text-2xl font-inter text-muted-foreground" />
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-orbitron font-bold text-tech-cyan">
                <Icon name="Shield" size={24} className="inline mr-2" />
                <EditableText id="adminPanelTitle" className="text-2xl font-orbitron font-bold text-tech-cyan" />
              </h3>
              <div className="flex items-center gap-2">
                <Badge className={`font-orbitron ${getRankBadgeColor(currentUser.rank)}`}>
                  <Icon name={RANK_ICONS[currentUser.rank]} size={14} className="mr-1" />
                  УРОВЕНЬ ДОСТУПА: {currentUser.rank}
                </Badge>
                {globalEditMode && (
                  <Badge className="bg-red-400/20 text-red-400 border-red-400 font-orbitron animate-pulse">
                    <Icon name="Zap" size={14} className="mr-1" />
                    ГЛОБАЛЬНЫЙ РЕДАКТОР
                  </Badge>
                )}
              </div>
            </div>
            
            <Tabs defaultValue="articles" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="articles" className="font-orbitron" disabled={!canPerformAction('canCreateArticles')}>
                  <Icon name="FileText" size={16} className="mr-2" />
                  СТАТЬИ
                </TabsTrigger>
                <TabsTrigger value="users" className="font-orbitron" disabled={!canPerformAction('canManageUsers')}>
                  <Icon name="Users" size={16} className="mr-2" />
                  ПОЛЬЗОВАТЕЛИ
                </TabsTrigger>
                <TabsTrigger value="factions" className="font-orbitron" disabled={!canPerformAction('canManageFactions')}>
                  <Icon name="Swords" size={16} className="mr-2" />
                  ФРАКЦИИ
                </TabsTrigger>
                <TabsTrigger value="events" className="font-orbitron" disabled={!canPerformAction('canManageEvents')}>
                  <Icon name="Calendar" size={16} className="mr-2" />
                  СОБЫТИЯ
                </TabsTrigger>
                <TabsTrigger value="analytics" className="font-orbitron" disabled={!canPerformAction('canAccessAnalytics')}>
                  <Icon name="BarChart3" size={16} className="mr-2" />
                  АНАЛИТИКА
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="articles" className="space-y-4">
                <div className="flex gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="font-orbitron bg-gradient-to-r from-tech-cyan to-primary hover:from-primary hover:to-tech-cyan transition-all duration-300"
                        disabled={!canPerformAction('canCreateArticles')}
                      >
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
              </TabsContent>
              
              <TabsContent value="users" className="space-y-4">
                <div className="flex gap-4 mb-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="font-orbitron"
                        disabled={!canPerformAction('canManageUsers')}
                      >
                        <Icon name="UserPlus" size={16} className="mr-2" />
                        ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="font-orbitron text-tech-cyan">НОВЫЙ ПОЛЬЗОВАТЕЛЬ</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Имя пользователя"
                          value={newUser.username}
                          onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                          className="font-inter"
                        />
                        <Select value={newUser.rank} onValueChange={(value: UserRank) => setNewUser({...newUser, rank: value})}>
                          <SelectTrigger className="font-inter">
                            <SelectValue placeholder="Выберите ранг" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MEMBER">MEMBER</SelectItem>
                            <SelectItem value="MODERATOR">MODERATOR</SelectItem>
                            {canPerformAction('canChangeRanks') && <SelectItem value="ADMIN">ADMIN</SelectItem>}
                            {currentUser.rank === 'HEAD_PROJECT' && <SelectItem value="OWNER">OWNER</SelectItem>}
                            {currentUser.rank === 'HEAD_PROJECT' && <SelectItem value="HEAD_PROJECT">HEAD PROJECT</SelectItem>}
                          </SelectContent>
                        </Select>
                        <Button onClick={handleAddUser} className="w-full font-orbitron">
                          <Icon name="UserPlus" size={16} className="mr-2" />
                          ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="grid gap-4">
                  {users.map((user) => (
                    <Card key={user.id} className="bg-card/80">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon name={RANK_ICONS[user.rank]} size={20} className={RANK_COLORS[user.rank]} />
                            <div>
                              <CardTitle className="font-orbitron text-lg">{user.username}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={`text-xs ${getRankBadgeColor(user.rank)}`}>
                                  {user.rank}
                                </Badge>
                                <span className="text-xs text-muted-foreground font-inter">
                                  Присоединился: {new Date(user.joinDate).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {canPerformAction('canChangeRanks') && user.id !== currentUser.id && (
                              <Select 
                                value={user.rank} 
                                onValueChange={(value: UserRank) => handleChangeUserRank(user.id, value)}
                              >
                                <SelectTrigger className="w-32 font-inter text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="GUEST">GUEST</SelectItem>
                                  <SelectItem value="MEMBER">MEMBER</SelectItem>
                                  <SelectItem value="MODERATOR">MODERATOR</SelectItem>
                                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                                  {currentUser.rank === 'HEAD_PROJECT' && <SelectItem value="OWNER">OWNER</SelectItem>}
                                  {currentUser.rank === 'HEAD_PROJECT' && <SelectItem value="HEAD_PROJECT">HEAD PROJECT</SelectItem>}
                                </SelectContent>
                              </Select>
                            )}
                            {canPerformAction('canManageUsers') && user.id !== currentUser.id && user.rank !== 'OWNER' && user.rank !== 'HEAD_PROJECT' && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="font-orbitron">Удалить пользователя?</AlertDialogTitle>
                                    <AlertDialogDescription className="font-inter">
                                      Это действие нельзя отменить. Пользователь {user.username} будет удален навсегда.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="font-inter">Отмена</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteUser(user.id)}
                                      className="font-orbitron"
                                    >
                                      Удалить
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground font-inter">Создание статей:</span>
                            <p className="font-orbitron">{RANK_PERMISSIONS[user.rank].canCreateArticles ? '✅' : '❌'}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-inter">Редактирование:</span>
                            <p className="font-orbitron">{RANK_PERMISSIONS[user.rank].canEditArticles ? '✅' : '❌'}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-inter">Удаление:</span>
                            <p className="font-orbitron">{RANK_PERMISSIONS[user.rank].canDeleteArticles ? '✅' : '❌'}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-inter">Управление:</span>
                            <p className="font-orbitron">{RANK_PERMISSIONS[user.rank].canManageUsers ? '✅' : '❌'}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="factions" className="space-y-4">
                <div className="flex gap-4 mb-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="font-orbitron"
                        disabled={!canPerformAction('canManageFactions')}
                      >
                        <Icon name="Plus" size={16} className="mr-2" />
                        СОЗДАТЬ ФРАКЦИЮ
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="font-orbitron text-tech-cyan">НОВАЯ ФРАКЦИЯ</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Название фракции"
                          value={newFaction.name}
                          onChange={(e) => setNewFaction({...newFaction, name: e.target.value})}
                          className="font-inter"
                        />
                        <Input
                          placeholder="Лидер фракции"
                          value={newFaction.leader}
                          onChange={(e) => setNewFaction({...newFaction, leader: e.target.value})}
                          className="font-inter"
                        />
                        <Textarea
                          placeholder="Описание фракции"
                          value={newFaction.description}
                          onChange={(e) => setNewFaction({...newFaction, description: e.target.value})}
                          rows={3}
                          className="font-inter"
                        />
                        <Select value={newFaction.color} onValueChange={(value) => setNewFaction({...newFaction, color: value})}>
                          <SelectTrigger className="font-inter">
                            <SelectValue placeholder="Выберите цвет фракции" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech-cyan">Cyan</SelectItem>
                            <SelectItem value="accent">Red</SelectItem>
                            <SelectItem value="primary">Blue</SelectItem>
                            <SelectItem value="yellow-400">Yellow</SelectItem>
                            <SelectItem value="green-400">Green</SelectItem>
                            <SelectItem value="purple-400">Purple</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button onClick={handleAddFaction} className="w-full font-orbitron">
                          <Icon name="Swords" size={16} className="mr-2" />
                          СОЗДАТЬ ФРАКЦИЮ
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {(canPerformAction('canEditInterface') || globalEditMode) && (
                    <Badge className={`font-orbitron animate-pulse ${globalEditMode ? 'bg-red-400/30 text-red-300 border-red-300' : 'bg-red-400/20 text-red-400 border-red-400'}`}>
                      <Icon name="Edit" size={14} className="mr-1" />
                      {globalEditMode ? "ГЛОБАЛЬНЫЙ РЕДАКТОР АКТИВЕН" : "РЕЖИМ РЕДАКТИРОВАНИЯ"}
                    </Badge>
                  )}
                </div>
                
                <div className="grid gap-4">
                  {factions.map((faction) => (
                    <Card key={faction.id} className="bg-card/80 border border-border/50 hover:border-tech-cyan/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon name="Swords" size={24} className={`text-${faction.color}`} />
                            <div>
                              <CardTitle className="font-orbitron text-xl">{faction.name}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={`text-xs ${getFactionStatusColor(faction.status)}`}>
                                  {faction.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground font-inter">
                                  Основана: {new Date(faction.founded).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {canPerformAction('canManageFactions') && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="font-orbitron">Удалить фракцию?</AlertDialogTitle>
                                    <AlertDialogDescription className="font-inter">
                                      Это действие нельзя отменить. Фракция {faction.name} будет удалена навсегда.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="font-inter">Отмена</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteFaction(faction.id)}
                                      className="font-orbitron"
                                    >
                                      Удалить
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground font-inter mb-4">{faction.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground font-inter">Лидер:</span>
                            <p className="font-orbitron text-tech-cyan">{faction.leader}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-inter">Участников:</span>
                            <p className="font-orbitron">{faction.members.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-inter">Статус:</span>
                            <p className={`font-orbitron text-${faction.color}`}>{faction.status}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="events" className="space-y-4">
                <div className="flex gap-4 mb-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="font-orbitron"
                        disabled={!canPerformAction('canManageEvents')}
                      >
                        <Icon name="Plus" size={16} className="mr-2" />
                        СОЗДАТЬ СОБЫТИЕ
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="font-orbitron text-tech-cyan">НОВОЕ СОБЫТИЕ</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Название события"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                          className="font-inter"
                        />
                        <Textarea
                          placeholder="Описание события"
                          value={newEvent.description}
                          onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                          rows={3}
                          className="font-inter"
                        />
                        <Select value={newEvent.type} onValueChange={(value: GameEvent['type']) => setNewEvent({...newEvent, type: value})}>
                          <SelectTrigger className="font-inter">
                            <SelectValue placeholder="Тип события" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BATTLE">БИТВА</SelectItem>
                            <SelectItem value="TOURNAMENT">ТУРНИР</SelectItem>
                            <SelectItem value="RAID">РЕЙД</SelectItem>
                            <SelectItem value="MEETING">СОБРАНИЕ</SelectItem>
                            <SelectItem value="CELEBRATION">ПРАЗДНИК</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-inter text-muted-foreground">Начало</label>
                            <Input
                              type="date"
                              value={newEvent.startDate}
                              onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                              className="font-inter"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-inter text-muted-foreground">Окончание</label>
                            <Input
                              type="date"
                              value={newEvent.endDate}
                              onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                              className="font-inter"
                            />
                          </div>
                        </div>
                        <Input
                          placeholder="Награды и призы"
                          value={newEvent.rewards}
                          onChange={(e) => setNewEvent({...newEvent, rewards: e.target.value})}
                          className="font-inter"
                        />
                        <Button onClick={handleAddEvent} className="w-full font-orbitron">
                          <Icon name="Calendar" size={16} className="mr-2" />
                          СОЗДАТЬ СОБЫТИЕ
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="grid gap-6">
                  {gameEvents.map((event) => (
                    <Card key={event.id} className="bg-card/80 border border-border/50 hover:border-tech-cyan/50 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon name={getEventTypeIcon(event.type)} size={28} className="text-tech-cyan" />
                            <div>
                              <CardTitle className="font-orbitron text-xl">{event.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={`text-xs ${getEventStatusColor(event.status)}`}>
                                  {event.status}
                                </Badge>
                                <Badge variant="outline" className="text-xs font-orbitron">
                                  {event.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground font-inter">
                                  Организатор: {event.createdBy}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!event.participants.includes(currentUser.username) && event.status === 'UPCOMING' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleJoinEvent(event.id)}
                                className="font-orbitron"
                              >
                                <Icon name="UserPlus" size={14} className="mr-1" />
                                УЧАСТВОВАТЬ
                              </Button>
                            )}
                            {event.participants.includes(currentUser.username) && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-400 font-orbitron">
                                <Icon name="Check" size={12} className="mr-1" />
                                УЧАСТНИК
                              </Badge>
                            )}
                            {canPerformAction('canManageEvents') && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="font-orbitron">Удалить событие?</AlertDialogTitle>
                                    <AlertDialogDescription className="font-inter">
                                      Это действие нельзя отменить. Событие {event.title} будет удалено навсегда.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="font-inter">Отмена</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteEvent(event.id)}
                                      className="font-orbitron"
                                    >
                                      Удалить
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground font-inter mb-4">{event.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-muted-foreground font-inter">Начало:</span>
                            <p className="font-orbitron text-tech-cyan">{new Date(event.startDate).toLocaleDateString('ru-RU')}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-inter">Окончание:</span>
                            <p className="font-orbitron">{new Date(event.endDate).toLocaleDateString('ru-RU')}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-inter">Участников:</span>
                            <p className="font-orbitron">{event.participants.length}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-inter">Награды:</span>
                            <p className="font-orbitron text-accent">{event.rewards || 'Не указаны'}</p>
                          </div>
                        </div>
                        {event.participants.length > 0 && (
                          <div>
                            <span className="text-sm text-muted-foreground font-inter mb-2 block">Участники:</span>
                            <div className="flex flex-wrap gap-1">
                              {event.participants.map((participant, index) => (
                                <Badge key={index} variant="secondary" className="text-xs font-inter">
                                  {participant}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-card/80">
                    <CardHeader>
                      <CardTitle className="font-orbitron text-tech-cyan flex items-center">
                        <Icon name="FileText" size={20} className="mr-2" />
                        СТАТЬИ
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-orbitron font-bold text-primary">{articles.length}</div>
                      <p className="text-sm text-muted-foreground font-inter">Всего опубликовано</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/80">
                    <CardHeader>
                      <CardTitle className="font-orbitron text-tech-cyan flex items-center">
                        <Icon name="Users" size={20} className="mr-2" />
                        ПОЛЬЗОВАТЕЛИ
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-orbitron font-bold text-primary">{users.length}</div>
                      <p className="text-sm text-muted-foreground font-inter">Зарегистрировано</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/80">
                    <CardHeader>
                      <CardTitle className="font-orbitron text-tech-cyan flex items-center">
                        <Icon name="Crown" size={20} className="mr-2" />
                        АДМИНЫ
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-orbitron font-bold text-primary">
                        {users.filter(u => u.rank === 'ADMIN' || u.rank === 'OWNER' || u.rank === 'HEAD_PROJECT').length}
                      </div>
                      <p className="text-sm text-muted-foreground font-inter">Администраторов</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-orbitron font-bold text-center mb-12">
            <EditableText id="articlesTitle" className="text-3xl font-orbitron font-bold" /> <span className="text-tech-cyan">СТАТЬИ</span>
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
                  {isAdminMode && canPerformAction('canDeleteArticles') && (
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
            <h4 className="text-2xl font-orbitron font-bold text-tech-cyan mb-4">
              <EditableText id="footerTitle" className="text-2xl font-orbitron font-bold text-tech-cyan" />
            </h4>
            <p className="text-muted-foreground font-inter mb-6">
              <EditableText id="footerSubtitle" className="text-muted-foreground font-inter" />
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