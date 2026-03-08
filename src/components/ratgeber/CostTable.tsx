
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Euro } from 'lucide-react';

export interface CostRow {
  measure: string;
  priceRange: string;
  note?: string;
}

interface CostTableProps {
  title?: string;
  rows: CostRow[];
}

const CostTable = ({ title = 'Kostenübersicht', rows }: CostTableProps) => {
  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Euro className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
        <div className="rounded-xl border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold text-foreground">Maßnahme</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Kosten (ca.)</TableHead>
                <TableHead className="font-semibold text-foreground hidden md:table-cell">Hinweis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-foreground">{row.measure}</TableCell>
                  <TableCell className="text-right text-primary font-semibold whitespace-nowrap">{row.priceRange}</TableCell>
                  <TableCell className="text-muted-foreground text-sm hidden md:table-cell">{row.note || '–'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default CostTable;
