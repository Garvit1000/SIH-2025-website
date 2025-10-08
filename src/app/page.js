import Link from 'next/link';
import { Shield, FileCheck, TrendingUp, Lock, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <Book className="h-6 w-6 text-primary" />
                            <h1 className="text-xl font-bold">SAMRIDDHI</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" asChild>
                                <Link href="/auth/login">Sign In</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/auth/register">Apply Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border bg-muted/50">
                            <span className="text-sm font-medium">Ministry of Social Justice & Empowerment</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                            Direct Benefit Transfer
                            <br />
                            <span className="text-primary">Made Simple</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Digital platform for timely relief delivery under PCR Act, 1955 and PoA Act, 1989
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                            <Button size="lg" asChild>
                                <Link href="/auth/register">Apply for Relief</Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/verify">Track Application</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 border-y bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-1">100%</div>
                            <div className="text-sm text-muted-foreground">Digital</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-1">Real-Time</div>
                            <div className="text-sm text-muted-foreground">Tracking</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-1">Secure</div>
                            <div className="text-sm text-muted-foreground">Protection</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-1">24/7</div>
                            <div className="text-sm text-muted-foreground">Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3">Key Features</h2>
                        <p className="text-muted-foreground">Transparent and efficient benefit delivery</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                    <FileCheck className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle>Easy Application</CardTitle>
                                <CardDescription>
                                    Submit applications with integrated verification
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle>Real-Time Tracking</CardTitle>
                                <CardDescription>
                                    Monitor application status and fund disbursement
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                    <Lock className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle>Secure & Private</CardTitle>
                                <CardDescription>
                                    End-to-end encryption with role-based access
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                    <Book className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle>PFMS Integration</CardTitle>
                                <CardDescription>
                                    Direct benefit transfer to bank accounts
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-primary text-primary-foreground px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3">Who Can Benefit?</h2>
                        <p className="text-primary-foreground/80">Multiple stakeholders supported</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                            <CardHeader>
                                <CardTitle className="text-primary-foreground">Victims & Beneficiaries</CardTitle>
                                <CardDescription className="text-primary-foreground/70">
                                    Apply for relief, track status, receive transfers, submit grievances
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                            <CardHeader>
                                <CardTitle className="text-primary-foreground">Inter-Caste Marriage</CardTitle>
                                <CardDescription className="text-primary-foreground/70">
                                    Apply for incentives, submit documents, get timely disbursements
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                            <CardHeader>
                                <CardTitle className="text-primary-foreground">Officials</CardTitle>
                                <CardDescription className="text-primary-foreground/70">
                                    Process applications, dashboard analytics, workflow management
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3">How It Works</h2>
                        <p className="text-muted-foreground">4-step process</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { step: '1', title: 'Register', desc: 'Create account and submit application' },
                            { step: '2', title: 'Verification', desc: 'Automated verification process' },
                            { step: '3', title: 'Approval', desc: 'Digital workflow processing' },
                            { step: '4', title: 'Transfer', desc: 'Direct benefit to bank account' }
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                                    {item.step}
                                </div>
                                <h3 className="font-semibold mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
                    <p className="text-muted-foreground">
                        Join thousands receiving timely assistance through our platform
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <Button size="lg" asChild>
                            <Link href="/auth/register">Apply for Benefits</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/dashboard">View Dashboard</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Book className="h-5 w-5" />
                                <span className="font-bold">SAMRIDDHI</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Transparent benefit delivery platform
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="#" className="hover:text-foreground">About</Link></li>
                                <li><Link href="#" className="hover:text-foreground">PCR Act</Link></li>
                                <li><Link href="#" className="hover:text-foreground">PoA Act</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3 text-sm">Services</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/auth/register" className="hover:text-foreground">Apply</Link></li>
                                <li><Link href="/verify" className="hover:text-foreground">Track</Link></li>
                                <li><Link href="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3 text-sm">Contact</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>Ministry of Social Justice</li>
                                <li>support@samriddhi.gov.in</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t pt-8 text-center text-sm text-muted-foreground">
                        <p>© 2025 Ministry of Social Justice & Empowerment</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}