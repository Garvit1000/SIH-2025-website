'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {Button} from '@/components/ui/button';

const ActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  buttonText, 
  onAction, 
  disabled = false,
  variant = "primary",
  completed = false 
}) => {
  return (
    <Card className={`transition-all hover:shadow-md ${completed ? 'bg-muted/50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {Icon && (
            <div className={`p-2 rounded-lg shrink-0 ${
              completed ? 'bg-primary/20 text-primary' : 'bg-accent text-accent-foreground'
            }`}>
              <Icon className="h-4 w-4 md:h-5 md:w-5" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <CardTitle className="text-sm md:text-base leading-tight">{title}</CardTitle>
            <CardDescription className="text-xs md:text-sm mt-1 line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Button
          onClick={onAction}
          disabled={disabled || completed}
          variant={completed ? "secondary" : variant}
          className="w-full"
          size="sm"
        >
          {completed ? "Completed" : buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActionCard;