
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ComingSoonCardProps {
  tintType: string;
}

const ComingSoonCard: React.FC<ComingSoonCardProps> = ({ tintType }) => {
  const getTintLabel = () => {
    switch (tintType) {
      case 'black-ceramic':
        return 'BLACK CERAMIC VLT\'S';
      case 'i3-ceramic':
        return 'I3 CERAMIC VLT\'S';
      case 'air-ceramic':
        return 'AIR CERAMIC VLT';
      default:
        return 'This tint option';
    }
  };

  return (
    <Card className="w-full h-full flex md:flex-col items-center justify-center p-2 md:p-8 text-center border-none shadow-none">
      <CardContent className="pt-6">
        <div className="mb-6 flex justify-center">
          <Clock className=" h-10 w-10 md:h-16 md:w-16 text-red-700" />
        </div>
        <h3 className="md:text-2xl font-bold md:mb-3">{getTintLabel()}</h3>
        <p className="md:text-xl font-medium md:mb-4">Coming Soon</p>

      </CardContent>
    </Card>
  );
};

export default ComingSoonCard;
