'use client';

import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import {Button} from '@/components/ui/button';
import {
  Home,
  User,
  FileText,
  Camera,
  Download,
  LogOut,
  Menu,
  X,
  Shield,
  Book
} from 'lucide-react';

const DashboardNav = ({ activeTab, onTabChange, userEmail }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home, href: '/dashboard' },
    { id: 'profile', label: 'Profile', icon: User, href: '/dashboard/profile' },
    { id: 'credentials', label: 'Credentials', icon: Shield, href: '/dashboard/credentials' },
    { id: 'capture', label: 'Capture Info', icon: Camera, href: '/dashboard/capture' },
    { id: 'generate', label: 'Generate Files', icon: Download, href: '/dashboard/generate' },
    { id: 'documents', label: 'Documents', icon: FileText, href: '/dashboard' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex items-center min-w-0">
            <Link href="/dashboard" className="flex items-center gap-2 min-w-0">
              <Book className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
              <h1 className="text-base sm:text-lg md:text-xl font-semibold text-foreground cursor-pointer truncate">
                SAMRIDDHI
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map(({ id, label, icon: Icon, href }) => (
              <Link key={id} href={href}>
                <Button
                  variant={activeTab === id ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden xl:inline">{label}</span>
                </Button>
              </Link>
            ))}
            
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border">
              <span className="text-xs text-muted-foreground hidden xl:inline max-w-[150px] truncate">{userEmail}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1.5">
              {navItems.map(({ id, label, icon: Icon, href }) => (
                <Link key={id} href={href}>
                  <Button
                    variant={activeTab === id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </Button>
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-border">
                <p className="text-xs text-muted-foreground px-3 py-2 truncate">{userEmail}</p>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashboardNav;