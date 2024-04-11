import Card from '@/components/common/Card/Card';
import React from 'react';
import { BsStarFill } from 'react-icons/bs';

type Props = {
  benefits: string[];
};

const JobPostBenefits = ({ benefits }: Props) => {
  return (
    <Card className="[&]:my-2 [&]:p-4">
      <p className="font-bold text-[var(--color-blue-light)]">Benefits:</p>
      <div className="grid grid-cols-2 gap-3">
        {benefits.map((benefit) => (
          <div key={benefit} className="text-lg font-semibold">
            <span>
              <BsStarFill className="mr-2 inline-block text-[var(--color-blue-light)]"></BsStarFill>
              {benefit}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default JobPostBenefits;
