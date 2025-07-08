import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Avatar, AvatarFallback } from '@/components/ui/avatar.jsx'
import { 
  Home, 
  Calendar, 
  User, 
  MessageCircle, 
  Trophy,
  Target,
  Clock,
  MapPin,
  Star,
  Plus,
  Bell,
  Settings,
  ChevronRight,
  Activity,
  Award,
  Users,
  BookOpen
} from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [playerData, setPlayerData] = useState({
    name: 'Alex Johnson',
    age: 8,
    level: 'Young Shooters',
    sessionsAttended: 12,
    nextSession: 'Tomorrow 4:00 PM'
  })

  const upcomingSessions = [
    {
      id: 1,
      title: 'Young Shooters Training',
      date: 'Tomorrow',
      time: '4:00 PM - 5:00 PM',
      coach: 'Coach Mike',
      location: 'Court A'
    },
    {
      id: 2,
      title: 'Fundamentals Practice',
      date: 'Friday',
      time: '5:00 PM - 6:00 PM', 
      coach: 'Coach Sarah',
      location: 'Court B'
    },
    {
      id: 3,
      title: 'Skills Development',
      date: 'Saturday',
      time: '10:00 AM - 11:00 AM',
      coach: 'Coach David',
      location: 'Court A'
    }
  ]

  const achievements = [
    { title: 'Perfect Attendance', description: '10 sessions in a row', icon: Trophy, color: 'text-yellow-500' },
    { title: 'Shooting Star', description: 'Improved accuracy by 25%', icon: Target, color: 'text-blue-500' },
    { title: 'Team Player', description: 'Great teamwork skills', icon: Users, color: 'text-green-500' },
    { title: 'Quick Learner', description: 'Mastered new skills fast', icon: BookOpen, color: 'text-purple-500' }
  ]

  const recentMessages = [
    {
      id: 1,
      from: 'Coach Mike',
      message: 'Great improvement in your shooting form today!',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      from: 'Little Hoopers',
      message: 'Reminder: Session tomorrow at 4:00 PM',
      time: '1 day ago',
      unread: false
    }
  ]

  const renderHome = () => (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Welcome back, {playerData.name}!</CardTitle>
              <CardDescription className="text-orange-100">
                Ready for your next training session?
              </CardDescription>
            </div>
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarFallback className="bg-white text-orange-600 font-bold">
                {playerData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{playerData.sessionsAttended}</div>
            <div className="text-sm text-gray-600">Sessions Attended</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{playerData.level}</div>
            <div className="text-sm text-gray-600">Current Level</div>
          </CardContent>
        </Card>
      </div>

      {/* Next Session */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-600" />
            Next Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{upcomingSessions[0].title}</div>
              <div className="text-sm text-gray-600">{upcomingSessions[0].time}</div>
              <div className="text-sm text-gray-600 flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {upcomingSessions[0].location}
              </div>
            </div>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              Check In
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-orange-600" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.slice(0, 2).map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`p-2 rounded-full bg-gray-100 ${achievement.color}`}>
                  <achievement.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{achievement.title}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="h-16 flex-col space-y-1"
          onClick={() => setActiveTab('schedule')}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-sm">Book Session</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex-col space-y-1"
          onClick={() => setActiveTab('messages')}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-sm">Messages</span>
        </Button>
      </div>
    </div>
  )

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Schedule</h2>
        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Book Session
        </Button>
      </div>

      <div className="space-y-4">
        {upcomingSessions.map((session) => (
          <Card key={session.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold">{session.title}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {session.date} • {session.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <User className="w-4 h-4 mr-1" />
                    {session.coach}
                    <MapPin className="w-4 h-4 ml-3 mr-1" />
                    {session.location}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Time Slots</CardTitle>
          <CardDescription>Book your next training session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {['Mon 4PM', 'Wed 5PM', 'Fri 4PM', 'Sat 10AM'].map((slot, index) => (
              <Button key={index} variant="outline" className="h-12">
                {slot}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarFallback className="bg-orange-100 text-orange-600 text-2xl font-bold">
            {playerData.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold">{playerData.name}</h2>
        <p className="text-gray-600">Age {playerData.age} • {playerData.level}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-orange-600" />
            Progress Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Sessions Attended</span>
              <span className="font-bold">{playerData.sessionsAttended}/15</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{width: `${(playerData.sessionsAttended/15)*100}%`}}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Skill Level</span>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {playerData.level}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Attendance Rate</span>
              <span className="font-bold text-green-600">95%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2 text-orange-600" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-3 border rounded-lg">
                <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${achievement.color}`} />
                <div className="font-medium text-sm">{achievement.title}</div>
                <div className="text-xs text-gray-600 mt-1">{achievement.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <Bell className="w-5 h-5 mr-3 text-gray-600" />
                <span>Notifications</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <Settings className="w-5 h-5 mr-3 text-gray-600" />
                <span>App Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Messages</h2>
        <Button size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          New
        </Button>
      </div>

      <div className="space-y-3">
        {recentMessages.map((message) => (
          <Card key={message.id} className={message.unread ? 'border-orange-200 bg-orange-50' : ''}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-orange-100 text-orange-600">
                    {message.from.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{message.from}</div>
                    <div className="text-xs text-gray-500">{message.time}</div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{message.message}</div>
                  {message.unread && (
                    <Badge variant="secondary" className="mt-2 bg-orange-100 text-orange-800 text-xs">
                      New
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
          <CardDescription>Contact your coach or the Little Hoopers team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">To</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>Coach Mike</option>
                <option>Coach Sarah</option>
                <option>Coach David</option>
                <option>Little Hoopers Admin</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea 
                placeholder="Type your message here..."
                className="mt-1"
                rows={3}
              />
            </div>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return renderHome()
      case 'schedule': return renderSchedule()
      case 'profile': return renderProfile()
      case 'messages': return renderMessages()
      default: return renderHome()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-orange-600">Little Hoopers</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="p-2">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'schedule', icon: Calendar, label: 'Schedule' },
            { id: 'profile', icon: User, label: 'Profile' },
            { id: 'messages', icon: MessageCircle, label: 'Messages' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

