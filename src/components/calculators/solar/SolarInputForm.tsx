import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SolarInputs } from '@/types/solarCalculator';
import { Info, Home, Zap, Battery, Car } from 'lucide-react';

interface SolarInputFormProps {
  inputs: SolarInputs;
  onInputChange: (field: keyof SolarInputs, value: any) => void;
}

const SolarInputForm = ({ inputs, onInputChange }: SolarInputFormProps) => {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grundlagen */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              Grunddaten Ihrer Immobilie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="dachflaeche">Verfügbare Dachfläche</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Nutzbare Fläche ohne Schornsteine oder Gauben. Pro kWp werden ca. 7 m² Dachfläche benötigt.</p>
                      <p className="mt-2 text-xs">
                        Quelle: <a href="/blog/solaranlage-planen-kaufen-2025" className="text-primary underline">Dachcheck</a> ·
                        <a
                          href="https://www.solarwirtschaft.de/photovoltaik/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >BSW</a>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id="dachflaeche"
                    type="number"
                    value={inputs.dachflaeche}
                    onChange={(e) => onInputChange('dachflaeche', parseFloat(e.target.value) || 0)}
                    placeholder="50"
                  />
                  <span className="text-muted-foreground">m²</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="stromverbrauch">Jahresstromverbrauch</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Durchschnittliche Haushalte verbrauchen 3.000–5.000 kWh pro Jahr.</p>
                      <p className="mt-2 text-xs">
                        Quelle: <a href="/blog/solaranlage-planen-kaufen-2025" className="text-primary underline">Verbrauch verstehen</a> ·
                        <a
                          href="https://www.stromspiegel.de/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >Stromspiegel</a>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id="stromverbrauch"
                    type="number"
                    value={inputs.stromverbrauch}
                    onChange={(e) => onInputChange('stromverbrauch', parseFloat(e.target.value) || 0)}
                    placeholder="4000"
                  />
                  <span className="text-muted-foreground">kWh</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plz">Postleitzahl</Label>
                <Input
                  id="plz"
                  type="text"
                  value={inputs.plz}
                  onChange={(e) => onInputChange('plz', e.target.value)}
                  placeholder="12345"
                  maxLength={5}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="ausrichtung">Dachausrichtung</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Süd liefert den höchsten Ertrag, Ost/West verteilt den Strom gleichmäßig über den Tag.</p>
                      <p className="mt-2 text-xs">
                        Quelle: <a href="/blog/solarenergie-zukunft-eigenheim#eignung" className="text-primary underline">Ausrichtungsratgeber</a> ·
                        <a
                          href="https://www.pv-magazine.de/lexikon/ausrichtung/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >PV Magazine</a>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select value={inputs.ausrichtung} onValueChange={(value) => onInputChange('ausrichtung', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sued">Süd (optimal)</SelectItem>
                    <SelectItem value="ost-west">Ost/West</SelectItem>
                    <SelectItem value="nord">Nord (weniger empfohlen)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Dachneigung: {inputs.dachneigung}°</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Optimal: 30–35°. Abweichungen reduzieren den Ertrag um etwa 5–15 %.</p>
                      <p className="mt-2 text-xs">
                        Quelle: <a href="/blog/solarenergie-zukunft-eigenheim#eignung" className="text-primary underline">Neigungsratgeber</a> ·
                        <a
                          href="https://www.pv-magazine.de/lexikon/neigungswinkel/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >PV Magazine</a>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Slider
                  value={[inputs.dachneigung]}
                  onValueChange={(value) => onInputChange('dachneigung', value[0])}
                  max={90}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="verschattung">Verschattung</Label>
                  <Select value={inputs.verschattung} onValueChange={(value) => onInputChange('verschattung', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keine">Keine Verschattung</SelectItem>
                      <SelectItem value="gering">Gering (7% Verlust)</SelectItem>
                      <SelectItem value="mittel">Mittel (15% Verlust)</SelectItem>
                      <SelectItem value="stark">Stark (30% Verlust)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modultyp">Modultyp</Label>
                  <Select value={inputs.modultyp} onValueChange={(value) => onInputChange('modultyp', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mono">Monokristallin (beste Effizienz)</SelectItem>
                      <SelectItem value="poly">Polykristallin (günstiger)</SelectItem>
                      <SelectItem value="duennschicht">Dünnschicht (flexibel)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Erweiterte Optionen */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Erweiterte Optionen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Batteriespeicher */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mitSpeicher"
                  checked={inputs.mitSpeicher}
                  onCheckedChange={(checked) => onInputChange('mitSpeicher', checked)}
                />
                <Label htmlFor="mitSpeicher" className="flex items-center gap-2">
                  <Battery className="h-4 w-4" />
                  Batteriespeicher hinzufügen
                </Label>
              </div>

              {inputs.mitSpeicher && (
                <div className="space-y-2 ml-6">
                  <div className="flex items-center justify-between">
                    <Label>Speicherkapazität: {inputs.speicherkapazitaet} kWh</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Faustregel: 1 kWh Speicher je 1.000 kWh Jahresverbrauch für hohe Autarkie.</p>
                        <p className="mt-2 text-xs">
                          Quelle: <a href="/blog/solaranlage-planen-kaufen-2025" className="text-primary underline">Speicherleitfaden</a> ·
                          <a
                            href="https://www.verbraucherzentrale.de/wissen/energie/photovoltaik/stromspeicher-fuer-die-photovoltaik-5953"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline"
                          >Verbraucherzentrale</a>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider
                    value={[inputs.speicherkapazitaet]}
                    onValueChange={(value) => onInputChange('speicherkapazitaet', value[0])}
                    max={20}
                    min={3}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* E-Mobilität */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mitEAuto"
                  checked={inputs.mitEAuto}
                  onCheckedChange={(checked) => onInputChange('mitEAuto', checked)}
                />
                <Label htmlFor="mitEAuto" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  E-Auto Integration
                </Label>
              </div>

              {inputs.mitEAuto && (
                <div className="space-y-4 ml-6">
                  <div className="space-y-2">
                    <Label>Jährliche Fahrleistung: {inputs.eAutoFahrleistung.toLocaleString()} km</Label>
                    <Slider
                      value={[inputs.eAutoFahrleistung]}
                      onValueChange={(value) => onInputChange('eAutoFahrleistung', value[0])}
                      max={30000}
                      min={5000}
                      step={1000}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mitWallbox"
                      checked={inputs.mitWallbox}
                      onCheckedChange={(checked) => onInputChange('mitWallbox', checked)}
                    />
                    <Label htmlFor="mitWallbox">Wallbox installieren (+1.500€)</Label>
                  </div>
                </div>
              )}
            </div>

            {/* Verbrauchsprofil */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Tagverbrauch: {inputs.tagverbrauchAnteil}%</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Anteil des Stromverbrauchs zwischen 6–18 Uhr. Hohe Tagesnutzung steigert den Eigenverbrauch.</p>
                    <p className="mt-2 text-xs">
                      Quelle: <a href="/blog/solaranlage-planen-kaufen-2025" className="text-primary underline">Verbrauchsprofil</a> ·
                      <a
                        href="https://www.stromspiegel.de/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >Stromspiegel</a>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Slider
                value={[inputs.tagverbrauchAnteil]}
                onValueChange={(value) => onInputChange('tagverbrauchAnteil', value[0])}
                max={80}
                min={20}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Wenig zu Hause</span>
                <span>Home Office / Rentner</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default SolarInputForm;