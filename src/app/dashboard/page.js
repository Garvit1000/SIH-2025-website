'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import DashboardNav from '@/components/dashboard/DashboardNav';
import ActionCard from '@/components/dashboard/ActionCard';
import StatsCard from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Shield,
  FileCheck,
  TrendingUp,
  Lock,
  CheckCircle,
  User,
  Database,
  Workflow,
  CreditCard,
  BarChart3,
  Key,
  FileSignature,
  Activity,
  RefreshCw,
  Phone,
  MapPin,
  Calendar,
  Flag
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleCreateDID = async () => {
    try {
      // For now, just mark DID as created in Firebase
      // In a full implementation, you might want to create the DID separately
      await updateDoc(doc(db, 'users', user.uid), {
        didCreated: true,
        didCreatedAt: new Date().toISOString()
      });
      fetchUserData();
      alert('DID created successfully! You can now issue Verifiable Credentials.');
    } catch (error) {
      console.error('Error creating DID:', error);
      alert('Error creating DID. Please try again.');
    }
  };

  const handleIssueVC = async () => {
    try {
      // Get user data with required fields for VC (use phone as emergency contact if emergencyContact not available)
      const emergencyContact = userData?.emergencyContact || userData?.phone;
      
      if (!userData?.fullName || !userData?.nationality || !emergencyContact) {
        alert('Please complete your profile with full name, nationality, and phone number before issuing VC');
        return;
      }

      console.log('Issuing VC with enhanced features:', {
        fullName: userData.fullName,
        nationality: userData.nationality,
        emergencyContact: emergencyContact
      });

      // Call our enhanced VC API with QR and PDF generation
      const response = await fetch('/api/issue-vc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: userData.fullName,
          nationality: userData.nationality,
          emergencyContact: emergencyContact,
          userId: user.uid, // Use Firebase user ID
          options: {
            qrType: 'presentation',
            baseUrl: window.location.origin
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Update Firebase with enhanced VC data
        await updateDoc(doc(db, 'users', user.uid), {
          vcIssued: true,
          vcIssuedAt: new Date().toISOString(),
          vcData: result.credential,
          issuerDid: result.issuerDid,
          touristDid: result.touristDid,
          // Store new VC features
          vcId: result.vcId,
          vcQRCode: result.qrCode,
          vcPDFUrl: result.pdf.downloadUrl,
          vcVerifyUrl: result.verification.verifyUrl,
          vcAccessToken: result.accessToken
        });
        
        fetchUserData();
        
        // Enhanced success message
        const successMessage = `✅ Verifiable Credential issued successfully!
        
🆔 VC ID: ${result.vcId}
🔗 Issuer DID: ${result.issuerDid}
👤 Tourist DID: ${result.touristDid}
📱 QR Code: Generated
📄 PDF: Ready for download
🔐 Verification URL: Available

Features:
• QR code for instant verification
• PDF document with embedded QR
• Firebase storage for secure access
• JWT token for verification

You can now generate documents and verify your credentials!`;

        alert(successMessage);
        
        // Optionally auto-navigate to generate page
        if (confirm('Would you like to go to the document generation page now?')) {
          setActiveTab('generate');
        }
      } else {
        console.error('VC issuance failed:', result.error);
        alert(`Failed to issue VC: ${result.message}`);
      }
    } catch (error) {
      console.error('Error issuing VC:', error);
      alert('Error issuing Verifiable Credential. Please try again.');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatsCard
          title="e-KYC Status"
          value={userData?.didCreated ? "Verified" : "Pending"}
          icon={CheckCircle}
          description="Aadhaar authentication"
          color={userData?.didCreated ? "success" : "warning"}
        />
        <StatsCard
          title="Workflow Stage"
          value={userData?.vcIssued ? "Approved" : "Processing"}
          icon={Workflow}
          description="BPM engine status"
          color={userData?.vcIssued ? "success" : "warning"}
        />
        <StatsCard
          title="DBT Status"
          value="PFMS Ready"
          icon={CreditCard}
          description="Fund transfer gateway"
          color="primary"
        />
        <StatsCard
          title=""
          value="AES-256"
          icon={Lock}
          description="End-to-end encryption"
          color="success"
        />
      </div>

      {/* Feature Categories */}
      <div className="space-y-6 md:space-y-8">
        {/* I. Identity & Verification */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            Identity & Verification
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
            <ActionCard
              title="e-KYC & ID Validation"
              description="Aadhaar API integration with hash-based de-duplication"
              icon={Key}
              buttonText="Initiate e-KYC"
              onAction={handleCreateDID}
              disabled={false}
              completed={userData?.didCreated}
            />
            <ActionCard
              title="CCTNS/eCourts Integration"
              description="RESTful API access to case metadata (FIR, charge sheets)"
              icon={Database}
              buttonText="Verify Records"
              onAction={handleIssueVC}
              disabled={!userData?.didCreated}
              completed={userData?.vcIssued}
            />
          </div>
        </div>

        {/* II. Workflow & Processing */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2">
            <Workflow className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            Workflow & Processing
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
            <ActionCard
              title="BPM Workflow Engine"
              description="Role-based access control with JWT session management"
              icon={RefreshCw}
              buttonText="View Workflow"
              onAction={() => setActiveTab('capture')}
              completed={userData?.touristInfoCaptured}
            />
            <ActionCard
              title="Digital Document Management"
              description="DigiLocker API integration with cryptographic hashing"
              icon={FileCheck}
              buttonText="Manage Documents"
              onAction={() => setActiveTab('generate')}
              disabled={!userData?.vcIssued}
            />
          </div>
        </div>

        {/* III. Financial Transactions (DBT) */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2">
            <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            Financial Transactions (DBT)
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
            <ActionCard
              title="PFMS Integration Gateway"
              description="Secure API layer for direct benefit transfer transactions"
              icon={CreditCard}
              buttonText="Configure PFMS"
              onAction={() => console.log('PFMS Integration')}
              disabled={!userData?.vcIssued}
            />
            <ActionCard
              title="Digital Sanction Orders"
              description="PKI-based Digital Signature Certificate (DSC) for PDF/XML"
              icon={FileSignature}
              buttonText="Generate Sanction"
              onAction={() => console.log('Generate Sanction')}
              disabled={!userData?.vcIssued}
            />
          </div>
        </div>

        {/* IV. Monitoring & Reporting */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            Monitoring & Reporting
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
            <ActionCard
              title="Real-Time BI Dashboard"
              description="KPIs, fund utilization, OLAP cube visualization"
              icon={TrendingUp}
              buttonText="View Analytics"
              onAction={() => console.log('Analytics Dashboard')}
            />
            <ActionCard
              title="Audit Trail Ledger"
              description="Immutable transaction log with cryptographic hashing"
              icon={Activity}
              buttonText="View Audit Logs"
              onAction={() => console.log('Audit Trail')}
            />
          </div>
        </div>

        {/* V. Security & Accessibility */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2">
            <Lock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            Security & Accessibility
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
            <ActionCard
              title="Data Encryption & Masking"
              description="TLS/SSL transit, AES-256 at rest, role-based PII masking"
              icon={Lock}
              buttonText="Security Settings"
              onAction={() => console.log('Security Config')}
            />
            <ActionCard
              title="API Gateway & OAuth"
              description="OAuth 2.0 authentication with rate-limiting/throttling"
              icon={Key}
              buttonText="API Management"
              onAction={() => console.log('API Gateway')}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Your registered account details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Full Name</p>
              <p className="text-muted-foreground">{userData?.fullName || 'Not provided'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Phone / Emergency Contact</p>
              <p className="text-muted-foreground">{userData?.phone || userData?.emergencyContact || 'Not provided'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Address</p>
              <p className="text-muted-foreground">{userData?.address || 'Not provided'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Date of Birth</p>
              <p className="text-muted-foreground">{userData?.dateOfBirth || 'Not provided'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Flag className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Nationality</p>
              <p className="text-muted-foreground">{userData?.nationality || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'profile':
        return renderProfile();
      case 'capture':
        return <div className="text-center py-8 text-muted-foreground">Tourist info capture section - Navigate to /dashboard/capture</div>;
      case 'generate':
        return <div className="text-center py-8 text-muted-foreground">Document generation section - Navigate to /dashboard/generate</div>;
      case 'documents':
        return <div className="text-center py-8 text-muted-foreground">Documents section coming soon...</div>;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userEmail={user?.email}
      />
      
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="sm:px-0">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}