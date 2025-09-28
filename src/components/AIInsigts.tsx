import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, AlertTriangle, Target, Lightbulb, BarChart3 } from "lucide-react";

const AIInsights = () => {
  const predictions = [
    {
      title: "Budget Optimization",
      prediction: "Rural Development sector showing 23% efficiency gain potential",
      confidence: 92,
      impact: "High",
      timeframe: "Next Quarter",
      description: "AI analysis suggests reallocating ₹15.2 Cr from underutilized infrastructure projects to rural development initiatives."
    },
    {
      title: "Scheme Completion Forecast",
      prediction: "78% schemes likely to complete on time with current pace",
      confidence: 87,
      impact: "Medium",
      timeframe: "Next 6 Months",
      description: "Machine learning models predict completion rates based on historical data and current progress patterns."
    },
    {
      title: "Resource Allocation Alert",
      prediction: "Nashik district requires additional 15% resource allocation",
      confidence: 84,
      impact: "High",
      timeframe: "Immediate",
      description: "Predictive analytics indicate resource shortage in Nashik based on population density and ongoing projects."
    }
  ];

  const recommendations = [
    {
      icon: Target,
      title: "Digitization Priority",
      description: "Focus on digitizing 156 remaining offline Panchayats in rural areas",
      priority: "High"
    },
    {
      icon: BarChart3,
      title: "Performance Monitoring",
      description: "Implement real-time dashboards for 12 underperforming districts",
      priority: "Medium"
    },
    {
      icon: Lightbulb,
      title: "Training Initiative",
      description: "Launch AI-powered training modules for 2,400+ Panchayat officials",
      priority: "High"
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-100 text-green-800";
    if (confidence >= 80) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-orange-100 text-orange-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <section id="insights" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-orange-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">AI-Powered Insights & Predictions</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced machine learning algorithms analyze Maharashtra's Panchayati Raj data to provide 
            predictive insights and actionable recommendations
          </p>
        </div>

        {/* AI Predictions */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 text-orange-600 mr-2" />
            Predictive Analytics
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {predictions.map((prediction, index) => (
              <Card key={index} className="border-orange-100 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-gray-900">{prediction.title}</CardTitle>
                    <div className="flex space-x-2">
                      <Badge className={getConfidenceColor(prediction.confidence)}>
                        {prediction.confidence}% confident
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-base font-medium text-gray-700">
                    {prediction.prediction}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Impact Level</span>
                      <Badge className={getImpactColor(prediction.impact)}>
                        {prediction.impact}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Timeframe</span>
                      <span className="text-sm font-medium text-gray-900">{prediction.timeframe}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mt-3">
                      {prediction.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 text-orange-600 mr-2" />
            Smart Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <Card key={index} className="border-orange-100 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <rec.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                        <Badge variant={rec.priority === "High" ? "destructive" : "secondary"}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{rec.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Capabilities */}
        <Card className="bg-gradient-to-r from-orange-500 to-green-600 text-white">
          <CardContent className="p-8">
            <div className="text-center">
              <Brain className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Advanced AI Capabilities</h3>
              <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
                Our AI system processes over 50,000 data points daily from across Maharashtra's 27,906 Panchayats, 
                providing real-time insights, predictive analytics, and automated recommendations for better governance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                  View Detailed Reports
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Configure AI Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIInsights;