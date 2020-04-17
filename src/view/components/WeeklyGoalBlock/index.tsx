import React from 'react';

import { Slider } from 'view/components/uiKit/Slider';

import {
  WeeklyGoalBlock,
  WeeklyTitle,
  WeeklyValueWrapper,
  WeeklyValue,
  SliderBlock,
  WeeklyIntervalWrapper,
} from './styled';

interface Props {
  weeklyValue: number;
  onValueChange: (value: number) => void;
}

export const WeeklyGoal: React.FC<Props> = ({ weeklyValue, onValueChange }) => (
  <>
    <WeeklyGoalBlock>
      <WeeklyTitle>Weekly Goal</WeeklyTitle>
      <WeeklyValueWrapper>
        <WeeklyValue>{`$${Math.floor(weeklyValue)}`}</WeeklyValue>
      </WeeklyValueWrapper>
    </WeeklyGoalBlock>
    <SliderBlock>
      <Slider value={weeklyValue} onValueChange={onValueChange} />
    </SliderBlock>
    <WeeklyIntervalWrapper>
      <WeeklyTitle>$2</WeeklyTitle>
      <WeeklyTitle>$200</WeeklyTitle>
    </WeeklyIntervalWrapper>
  </>
);
