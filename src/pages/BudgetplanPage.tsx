
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BudgetplanPage = () => {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Budgetplan</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Hier können Sie Ihr Budget für die Sanierung planen und Fördermittel im Auge behalten. Diese Funktion ist in Kürze verfügbar.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetplanPage;
