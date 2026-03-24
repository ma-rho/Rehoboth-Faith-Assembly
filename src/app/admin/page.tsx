import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Video, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { events, sermons, pastor } from '@/lib/data';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-primary">Admin Dashboard</h1>
      <p className="text-muted-foreground mt-2">Manage your church's content from one place.</p>
      
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sermons
            </CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sermons.length}</div>
            <Link href="/admin/sermons" className="text-xs text-muted-foreground hover:text-primary">
              Manage Sermons
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
             <Link href="/admin/events" className="text-xs text-muted-foreground hover:text-primary">
              Manage Events
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pastor Info
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pastor.name}</div>
            <Link href="/admin/pastor" className="text-xs text-muted-foreground hover:text-primary">
              Update Info
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
