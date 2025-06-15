
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

export default function InsulationComparisonTable() {
  return (
    <div className="overflow-x-auto mb-6">
      <Table className="min-w-[650px] text-xs md:text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>Material</TableHead>
            <TableHead>λ-Wert* (W/(mK))</TableHead>
            <TableHead>Brandschutz</TableHead>
            <TableHead>Öko</TableHead>
            <TableHead>Preis</TableHead>
            <TableHead>Hitzeschutz</TableHead>
            <TableHead>Einsatz</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Mineralwolle</TableCell>
            <TableCell>0,032–0,040</TableCell>
            <TableCell>nicht brennbar (A1)</TableCell>
            <TableCell>teils</TableCell>
            <TableCell>günstig</TableCell>
            <TableCell>mittel</TableCell>
            <TableCell>Fassade, Dach, Keller</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>EPS (Styropor)</TableCell>
            <TableCell>0,031–0,040</TableCell>
            <TableCell>brennbar (B1)</TableCell>
            <TableCell>nein</TableCell>
            <TableCell>sehr günstig</TableCell>
            <TableCell>gering</TableCell>
            <TableCell>Fassade, Boden</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Holzfaser</TableCell>
            <TableCell>0,036–0,050</TableCell>
            <TableCell>normal entflammbar (B2)</TableCell>
            <TableCell>ja</TableCell>
            <TableCell>hoch</TableCell>
            <TableCell>sehr gut</TableCell>
            <TableCell>Dach, Fassade</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Hanf/Schafwolle</TableCell>
            <TableCell>0,038–0,045</TableCell>
            <TableCell>B2/B1</TableCell>
            <TableCell>ja</TableCell>
            <TableCell>hoch</TableCell>
            <TableCell>gut</TableCell>
            <TableCell>Innen, Dach</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Zellulose</TableCell>
            <TableCell>0,039–0,045</TableCell>
            <TableCell>B2</TableCell>
            <TableCell>ja</TableCell>
            <TableCell>mittel</TableCell>
            <TableCell>sehr gut</TableCell>
            <TableCell>Dach, Gefache</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>PUR/PIR</TableCell>
            <TableCell>0,022–0,028</TableCell>
            <TableCell>B2</TableCell>
            <TableCell>nein</TableCell>
            <TableCell>hoch</TableCell>
            <TableCell>mittel</TableCell>
            <TableCell>Dach, Boden, Fassade</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Perlite</TableCell>
            <TableCell>0,055</TableCell>
            <TableCell>A1</TableCell>
            <TableCell>ja</TableCell>
            <TableCell>mittel</TableCell>
            <TableCell>mittel</TableCell>
            <TableCell>Hohlraum, Dachboden</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="text-xs text-gray-500 mt-2">*Je niedriger der λ-Wert, desto besser die Dämmwirkung.</div>
    </div>
  );
}
