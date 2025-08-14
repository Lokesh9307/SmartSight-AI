import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: string
  changeType?: "increase" | "decrease"
}

export function StatCard({ title, value, icon: Icon, change, changeType }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
            {change} from last hour
          </p>
        )}
      </CardContent>
    </Card>
  )
}
