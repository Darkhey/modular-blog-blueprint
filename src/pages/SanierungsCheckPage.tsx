import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, ExternalLink, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { decisionSteps, calculateRecommendations, type Recommendation } from "@/data/decisionTreeData";
import { cn } from "@/lib/utils";

const SanierungsCheckPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Recommendation[] | null>(null);

  const totalSteps = decisionSteps.length;
  const progress = results ? 100 : ((currentStep) / totalSteps) * 100;
  const step = decisionSteps[currentStep];

  const handleSelect = (optionId: string) => {
    const newAnswers = { ...answers, [step.id]: optionId };
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep((s) => s + 1), 300);
    } else {
      setTimeout(() => setResults(calculateRecommendations(newAnswers)), 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Sanierungscheck – Welche Sanierung lohnt sich?",
    description: "Finden Sie in 6 Schritten heraus, welche Sanierungsmaßnahmen für Ihr Haus am sinnvollsten sind.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    url: "https://modular-blog-blueprint.lovable.app/sanierungscheck",
  };

  return (
    <>
      <Helmet>
        <title>Sanierungscheck – Welche Sanierung lohnt sich? | Sanieren & Sparen</title>
        <meta name="description" content="Finden Sie in 6 Schritten heraus, welche Sanierungsmaßnahmen für Ihr Haus am sinnvollsten sind. Personalisierte Empfehlungen mit Kosten, Förderung und Amortisation." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background">
        {/* Hero */}
        <section className="py-12 md:py-16 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
              🏠 Kostenloser Sanierungscheck
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Welche Sanierung lohnt sich für Ihr Haus?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Beantworten Sie 6 kurze Fragen und erhalten Sie eine personalisierte
              Empfehlung mit Kosten, Förderung und Einsparpotenzial.
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 pb-16">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{results ? "Ergebnis" : `Schritt ${currentStep + 1} von ${totalSteps}`}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {!results ? (
            /* Question Step */
            <div key={step.id} className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">{step.question}</h2>
                <p className="text-muted-foreground">{step.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {step.options.map((option) => {
                  const isSelected = answers[step.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      className={cn(
                        "group relative p-6 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border bg-card hover:border-primary/50"
                      )}
                    >
                      <div className="text-3xl mb-3">{option.icon}</div>
                      <div className="font-semibold text-foreground text-lg mb-1">{option.label}</div>
                      {option.description && (
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      )}
                      {isSelected && (
                        <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Zurück
                </Button>
                <span className="text-sm text-muted-foreground self-center">
                  Klicken Sie eine Option um fortzufahren
                </span>
              </div>
            </div>
          ) : (
            /* Results */
            <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">🎯</div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Ihre persönliche Sanierungsempfehlung
                </h2>
                <p className="text-muted-foreground">
                  Basierend auf Ihren Angaben empfehlen wir folgende Maßnahmen in dieser Reihenfolge:
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {results.map((rec) => (
                  <Card key={rec.id} className="overflow-hidden border-2 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4 p-6">
                        <div className="flex-shrink-0">
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold",
                            rec.priority === 1 ? "bg-primary/10" :
                            rec.priority === 2 ? "bg-accent" : "bg-muted"
                          )}>
                            {rec.icon}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={rec.priority === 1 ? "default" : "secondary"} className="text-xs">
                              Priorität {rec.priority}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2">{rec.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{rec.description}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            <div className="bg-muted/50 rounded-lg p-3 text-center">
                              <div className="text-xs text-muted-foreground">Kosten</div>
                              <div className="font-semibold text-sm text-foreground">{rec.estimatedCost}</div>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-3 text-center">
                              <div className="text-xs text-muted-foreground">Förderung</div>
                              <div className="font-semibold text-sm text-primary">{rec.fundingPercent}</div>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-3 text-center">
                              <div className="text-xs text-muted-foreground">Amortisation</div>
                              <div className="font-semibold text-sm text-foreground">{rec.paybackYears}</div>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-3 text-center">
                              <div className="text-xs text-muted-foreground">Ersparnis/Jahr</div>
                              <div className="font-semibold text-sm text-primary">{rec.savingsPerYear}</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Link to={rec.linkTo}>
                              <Button size="sm" variant="default">
                                {rec.linkLabel} <ExternalLink className="ml-1 w-3 h-3" />
                              </Button>
                            </Link>
                            {rec.calculatorLink && (
                              <Link to={rec.calculatorLink}>
                                <Button size="sm" variant="outline">
                                  <Calculator className="mr-1 w-3 h-3" /> {rec.calculatorLabel}
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center space-y-4">
                <Button onClick={handleReset} variant="outline" size="lg">
                  <RotateCcw className="mr-2 w-4 h-4" /> Erneut starten
                </Button>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Diese Empfehlung basiert auf allgemeinen Erfahrungswerten. Für eine verbindliche
                  Beratung empfehlen wir einen zertifizierten Energieberater.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SanierungsCheckPage;
