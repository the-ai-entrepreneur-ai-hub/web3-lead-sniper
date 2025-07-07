import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    name: "DeFi Protocol X",
    description: "Next-generation lending protocol with cross-chain capabilities",
    website: "https://defiprotocolx.com",
    category: "DeFi",
    fundingStage: "Series A",
    employees: "50-100",
    founded: "2023",
    twitter: "@defiprotocolx",
    discord: "discord.gg/defiprotocolx",
    email: "business@defiprotocolx.com",
    lastUpdated: "2 hours ago"
  },
  {
    id: 2,
    name: "NFT Marketplace Alpha",
    description: "Creator-focused NFT platform with built-in royalty management",
    website: "https://nftmarketalpha.io",
    category: "NFT",
    fundingStage: "Seed",
    employees: "10-25",
    founded: "2023",
    twitter: "@nftmarketalpha",
    discord: "discord.gg/nftmarketalpha",
    email: "partnerships@nftmarketalpha.io",
    lastUpdated: "5 hours ago"
  },
  {
    id: 3,
    name: "GameFi Studio",
    description: "Play-to-earn game development studio building immersive Web3 experiences",
    website: "https://gamefistudio.gg",
    category: "Gaming",
    fundingStage: "Series B",
    employees: "100-250",
    founded: "2022",
    twitter: "@gamefistudio",
    discord: "discord.gg/gamefistudio",
    email: "bizdev@gamefistudio.gg",
    lastUpdated: "1 day ago"
  },
  {
    id: 4,
    name: "Infrastructure Labs",
    description: "Building scalable blockchain infrastructure for the next billion users",
    website: "https://infrastructurelabs.xyz",
    category: "Infrastructure",
    fundingStage: "Series A",
    employees: "25-50",
    founded: "2023",
    twitter: "@infralab",
    discord: "discord.gg/infralab",
    email: "hello@infrastructurelabs.xyz",
    lastUpdated: "3 hours ago"
  }
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "DeFi", "NFT", "Gaming", "Infrastructure"];
  
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Web3 Project Dashboard
              </h1>
              <p className="text-muted-foreground">
                Discover and connect with the latest Web3 projects
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline">
                Export Data
              </Button>
              <Button className="btn-web3">
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-web3">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">10,247</div>
              <div className="text-xs text-muted-foreground">+127 this week</div>
            </CardContent>
          </Card>
          <Card className="card-web3">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">New This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">127</div>
              <div className="text-xs text-muted-foreground">+23% from last week</div>
            </CardContent>
          </Card>
          <Card className="card-web3">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">With Funding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">3,891</div>
              <div className="text-xs text-muted-foreground">38% of total</div>
            </CardContent>
          </Card>
          <Card className="card-web3">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Contact Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">8,756</div>
              <div className="text-xs text-muted-foreground">85% of total</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-card border-border"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "btn-web3" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="card-web3 hover:glow-effect">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-primary mb-2">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {project.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    {project.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Funding:</span>
                    <div className="font-medium text-foreground">{project.fundingStage}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Team Size:</span>
                    <div className="font-medium text-foreground">{project.employees}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Founded:</span>
                    <div className="font-medium text-foreground">{project.founded}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Updated:</span>
                    <div className="font-medium text-foreground">{project.lastUpdated}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Website:</span>
                    <a href={project.website} target="_blank" rel="noopener noreferrer" 
                       className="ml-2 text-primary hover:underline">
                      {project.website}
                    </a>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Contact:</span>
                    <span className="ml-2 text-foreground">{project.email}</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="text-muted-foreground">Social:</span>
                    <a href="#" className="text-primary hover:underline">{project.twitter}</a>
                    <span className="text-muted-foreground">•</span>
                    <a href="#" className="text-primary hover:underline">Discord</a>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1 btn-web3">
                    Add to CRM
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            Load More Projects
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;