import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      title: "24/7 Automated Discovery",
      description: "Our AI continuously scans blockchain networks, social media, and news sources to identify new Web3 projects as they launch.",
      icon: "🚀"
    },
    {
      title: "Complete Contact Database",
      description: "Automatically extract email addresses, social media profiles, and key personnel information for immediate outreach.",
      icon: "📊"
    },
    {
      title: "Real-time Data Updates",
      description: "Stay ahead of the competition with continuously updated project information and funding announcements.",
      icon: "⚡"
    },
    {
      title: "Advanced Filtering",
      description: "Find exactly what you're looking for with powerful search and filtering options by industry, funding stage, and more.",
      icon: "🔍"
    },
    {
      title: "Export & Integration",
      description: "Export data to CSV or integrate directly with your existing CRM and outreach tools.",
      icon: "📈"
    },
    {
      title: "Quality Verification",
      description: "All data is verified and cleaned to ensure you're reaching out to legitimate projects with accurate information.",
      icon: "✅"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            Everything You Need to
            <span className="block text-primary">Scale Your Outreach</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stop wasting time on manual prospecting. Let our platform do the heavy lifting 
            while you focus on building relationships and closing deals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-web3 border-glow hover:glow-effect">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl text-primary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;