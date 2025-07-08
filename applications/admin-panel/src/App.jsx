import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Avatar, AvatarFallback } from '@/components/ui/avatar.jsx'
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts'
import { 
  LayoutDashboard,
  Users,
  UserCheck,
  Target,
  Calendar,
  ClipboardList,
  MessageSquare,
  Building,
  MapPin,
  Dumbbell,
  BarChart3,
  Settings,
  Search,
  Bell,
  Plus,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
  Menu,
  X,
  Home,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  MapPinIcon,
  UserIcon,
  Award,
  BookOpen,
  Trophy,
  Loader2
} from 'lucide-react'
import apiService from './api.js'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Data states
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalPlayers: 0,
    activeSessions: 0,
    monthlyRevenue: 0,
    attendanceRate: 0,
    newRegistrations: 0
  })
  const [users, setUsers] = useState([])
  const [players, setPlayers] = useState([])
  const [coaches, setCoaches] = useState([])
  const [sessions, setSessions] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [feedbacks, setFeedbacks] = useState([])

  // Mock data for charts (would be replaced with real data in production)
  const revenueData = [
    { month: 'Jan', revenue: 6500, players: 65 },
    { month: 'Feb', revenue: 7200, players: 72 },
    { month: 'Mar', revenue: 7800, players: 78 },
    { month: 'Apr', revenue: 8100, players: 81 },
    { month: 'May', revenue: 8450, players: 89 },
    { month: 'Jun', revenue: 8900, players: 95 }
  ]

  const attendanceData = [
    { day: 'Mon', attendance: 85 },
    { day: 'Tue', attendance: 92 },
    { day: 'Wed', attendance: 78 },
    { day: 'Thu', attendance: 96 },
    { day: 'Fri', attendance: 89 },
    { day: 'Sat', attendance: 94 },
    { day: 'Sun', attendance: 87 }
  ]

  const programDistribution = [
    { name: 'Little Dribblers (4-6)', value: 35, color: '#ea580c' },
    { name: 'Young Shooters (7-10)', value: 40, color: '#3b82f6' },
    { name: 'Future Stars (11-14)', value: 25, color: '#10b981' }
  ]

  const recentActivity = [
    { id: 1, type: 'registration', message: 'New player Alex Johnson registered for Young Shooters', time: '2 hours ago' },
    { id: 2, type: 'session', message: 'Little Dribblers session completed with 8/8 attendance', time: '4 hours ago' },
    { id: 3, type: 'feedback', message: 'Positive feedback received for Coach Mike', time: '6 hours ago' },
    { id: 4, type: 'payment', message: 'Payment received from Sarah Wilson - $80', time: '1 day ago' }
  ]

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'players', label: 'Players', icon: UserCheck },
    { id: 'coaches', label: 'Coaches', icon: Target },
    { id: 'sessions', label: 'Sessions', icon: Calendar },
    { id: 'registrations', label: 'Registrations', icon: ClipboardList },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'franchises', label: 'Franchises', icon: Building },
    { id: 'facilities', label: 'Facilities', icon: MapPin },
    { id: 'equipment', label: 'Equipment', icon: Dumbbell },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  // Load data on component mount and section change
  useEffect(() => {
    loadData()
  }, [activeSection])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      switch (activeSection) {
        case 'dashboard':
          await loadDashboardData()
          break
        case 'users':
          await loadUsers()
          break
        case 'players':
          await loadPlayers()
          break
        case 'coaches':
          await loadCoaches()
          break
        case 'sessions':
          await loadSessions()
          break
        case 'registrations':
          await loadRegistrations()
          break
        case 'feedback':
          await loadFeedbacks()
          break
        default:
          break
      }
    } catch (err) {
      setError(`Failed to load ${activeSection} data: ${err.message}`)
      console.error('Data loading error:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadDashboardData = async () => {
    const stats = await apiService.getDashboardStats()
    setDashboardStats(stats)
  }

  const loadUsers = async () => {
    const usersData = await apiService.getUsers()
    setUsers(usersData)
  }

  const loadPlayers = async () => {
    const playersData = await apiService.getPlayers()
    setPlayers(playersData)
  }

  const loadCoaches = async () => {
    const coachesData = await apiService.getCoaches()
    setCoaches(coachesData)
  }

  const loadSessions = async () => {
    const sessionsData = await apiService.getTrainingSessions()
    setSessions(sessionsData)
  }

  const loadRegistrations = async () => {
    const registrationsData = await apiService.getRegistrations()
    setRegistrations(registrationsData)
  }

  const loadFeedbacks = async () => {
    const feedbacksData = await apiService.getFeedbacks()
    setFeedbacks(feedbacksData)
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold text-orange-600">{dashboardStats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Players</p>
                <p className="text-3xl font-bold text-blue-600">{dashboardStats.totalPlayers}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-3xl font-bold text-green-600">${dashboardStats.monthlyRevenue}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+15% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                <p className="text-3xl font-bold text-purple-600">{dashboardStats.attendanceRate}%</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+2% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue and player growth</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#ea580c" fill="#ea580c" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
            <CardDescription>Attendance rates by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Program Distribution</CardTitle>
            <CardDescription>Players by age group</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={programDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                >
                  {programDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'registration' ? 'bg-green-100 text-green-600' :
                    activity.type === 'session' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'feedback' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {activity.type === 'registration' && <UserCheck className="h-4 w-4" />}
                    {activity.type === 'session' && <Calendar className="h-4 w-4" />}
                    {activity.type === 'feedback' && <MessageSquare className="h-4 w-4" />}
                    {activity.type === 'payment' && <DollarSign className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage system users and their permissions</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Users ({users.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
              <span className="ml-2">Loading users...</span>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No users found</h3>
              <p className="text-muted-foreground">Get started by adding your first user</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-left p-3 font-medium">Email</th>
                    <th className="text-left p-3 font-medium">Role</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Created</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.userid} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-orange-100 text-orange-600">
                              {user.firstname?.[0]}{user.lastname?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.firstname} {user.lastname}</span>
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">{user.email}</td>
                      <td className="p-3">
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {new Date().toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderPlayers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Player Management</h2>
          <p className="text-muted-foreground">Track player progress and manage enrollments</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Player
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{players.length}</div>
            <div className="text-sm text-muted-foreground">Total Players</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">94%</div>
            <div className="text-sm text-muted-foreground">Avg Attendance</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">12.8</div>
            <div className="text-sm text-muted-foreground">Avg Sessions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.floor(players.length * 0.3)}</div>
            <div className="text-sm text-muted-foreground">New This Month</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Player Roster</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
              <span className="ml-2">Loading players...</span>
            </div>
          ) : players.length === 0 ? (
            <div className="text-center py-8">
              <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No players found</h3>
              <p className="text-muted-foreground">Get started by adding your first player</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player) => (
                <Card key={player.playerid} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-orange-100 text-orange-600 text-lg">
                          {player.firstname?.[0]}{player.lastname?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{player.firstname} {player.lastname}</h3>
                        <p className="text-sm text-muted-foreground">
                          Age {new Date().getFullYear() - new Date(player.birthdate).getFullYear()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Level:</span>
                        <Badge variant="secondary">{player.level}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Gender:</span>
                        <span className="text-muted-foreground">{player.gender === 'M' ? 'Male' : 'Female'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Parent ID:</span>
                        <span className="text-muted-foreground">{player.parentid}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderSessions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Session Management</h2>
          <p className="text-muted-foreground">Schedule and manage training sessions</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Session
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{sessions.length}</div>
            <div className="text-sm text-muted-foreground">Total Sessions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{registrations.length}</div>
            <div className="text-sm text-muted-foreground">Total Enrolled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">86%</div>
            <div className="text-sm text-muted-foreground">Capacity Utilization</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Training Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
              <span className="ml-2">Loading sessions...</span>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No sessions found</h3>
              <p className="text-muted-foreground">Get started by scheduling your first session</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <Card key={session.sessionid} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{session.sessionname}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {session.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {session.time}
                          </div>
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-1" />
                            Coach ID: {session.coachid}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary">{session.level}</Badge>
                          <span className="text-sm">
                            Duration: {session.duration} minutes
                          </span>
                          <span className="text-sm">
                            Location: {session.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    if (error) {
      return (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={loadData} className="bg-orange-600 hover:bg-orange-700">
            Try Again
          </Button>
        </div>
      )
    }

    switch(activeSection) {
      case 'dashboard': return renderDashboard()
      case 'users': return renderUsers()
      case 'players': return renderPlayers()
      case 'sessions': return renderSessions()
      case 'coaches': return (
        <div className="text-center py-12">
          <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Coach Management</h3>
          <p className="text-muted-foreground">Manage coach profiles, certifications, and schedules</p>
          <p className="text-sm text-muted-foreground mt-2">Total Coaches: {coaches.length}</p>
        </div>
      )
      case 'registrations': return (
        <div className="text-center py-12">
          <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Registration Management</h3>
          <p className="text-muted-foreground">Handle player enrollments and program registrations</p>
          <p className="text-sm text-muted-foreground mt-2">Total Registrations: {registrations.length}</p>
        </div>
      )
      case 'feedback': return (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Feedback Management</h3>
          <p className="text-muted-foreground">Review and respond to player and parent feedback</p>
          <p className="text-sm text-muted-foreground mt-2">Total Feedback: {feedbacks.length}</p>
        </div>
      )
      case 'analytics': return (
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Analytics & Reports</h3>
          <p className="text-muted-foreground">Detailed analytics and business intelligence</p>
        </div>
      )
      default: return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <span className="text-lg font-bold text-orange-600">Little Hoopers</span>}
          </div>
        </div>
        
        <nav className="mt-8">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-orange-50 transition-colors ${
                activeSection === item.id ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600' : 'text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold capitalize">{activeSection}</h1>
                <p className="text-sm text-muted-foreground">Little Hoopers Admin Panel</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-orange-100 text-orange-600">
                  AD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App

