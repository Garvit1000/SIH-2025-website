'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Calendar, Phone, User, FileText, Banknote } from 'lucide-react';

// Renamed component for clarity based on the Problem Statement
const DBTVerificationForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    // Fields for Case/Incident Details (replacing tourist details)
    firNumber: initialData.firNumber || '',
    incidentDate: initialData.incidentDate || '',
    policeStation: initialData.policeStation || '',
    atrocityType: initialData.atrocityType || '', // e.g., 'Physical Assault', 'Social Boycott'
    // Fields for Relief/Disbursement (replacing travel details)
    reliefStage: initialData.reliefStage || '', // e.g., '1st Installment', 'Final Installment'
    victimContact: initialData.victimContact || '',
    bankAccountSeeded: initialData.bankAccountSeeded || '',
    ...initialData
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>DBT Verification & Sanction</CardTitle>
        <CardDescription>
          Verify and record crucial details for victim relief under the PCR/PoA Acts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. FIR Number (Replaces Tourist Type/Visit Purpose) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">FIR / Case Number</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="firNumber"
                  type="text"
                  placeholder="e.g., 0123/2023"
                  value={formData.firNumber}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* 2. Incident Date (Replaces Arrival Date) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date of Incident</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="incidentDate"
                  type="date"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* 3. Police Station (Replaces Departure Date) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Police Station/Jurisdiction</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="policeStation"
                  type="text"
                  placeholder="Police Station Name"
                  value={formData.policeStation}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* 4. Atrocity Type (Replaces Stay Duration) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Type of Atrocity</label>
              <select
                name="atrocityType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.atrocityType}
                onChange={handleChange}
                required
              >
                <option value="">Select Atrocity Type</option>
                <option value="murder">Murder/Death</option>
                <option value="rape">Rape/Sexual Assault</option>
                <option value="grievous_hurt">Grievous Hurt/Injury</option>
                <option value="social_boycott">Social Boycott/Harassment</option>
                <option value="other">Other Atrocity</option>
              </select>
            </div>

            {/* 5. Relief Installment Stage (Replaces Accommodation Address) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Relief Installment Stage</label>
              <div className="relative">
                <Banknote className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select
                  name="reliefStage"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pl-10"
                  value={formData.reliefStage}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Stage</option>
                  <option value="first">1st Installment (After FIR)</option>
                  <option value="second">2nd Installment (After Charge Sheet)</option>
                  <option value="final">Final Installment (After Conviction/Acquittal)</option>
                </select>
              </div>
            </div>

            {/* 6. Victim Contact (Replaces Emergency Contact) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Victim Contact Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="victimContact"
                  type="tel"
                  placeholder="Victim's mobile number"
                  value={formData.victimContact}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* 7. Bank Account Seeding Status (New Field for DBT) */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Aadhaar-Bank Seeding Status</label>
            <select
              name="bankAccountSeeded"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.bankAccountSeeded}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="seeded">Seeded (Ready for DBT)</option>
              <option value="pending">Pending Seeding</option>
              <option value="not_applicable">Not Applicable (e.g., inter-caste marriage)</option>
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Processing...' : 'Sanction/Verify & Proceed to DBT'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DBTVerificationForm;