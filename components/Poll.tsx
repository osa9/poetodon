import React from 'react'
import {PollOption, PollResult} from "../entities/poll";

export interface PollProps {
  poll: PollResult
}

const PollValue: React.FC<{ title: string; percentage: number }> = ({
  title,
  percentage,
}) => {
  const percentageString = `${(percentage * 100).toFixed(0)}%`

  return (
    <div className="mt-2">
      <div className="flex items-center">
        <div className="font-bold mr-2" style={{width: 60}}>{percentageString}</div><div>{title}</div></div>
      <div className="bg-blue-200 mt-1 rounded-full" style={{width: percentageString, minWidth: 5, height: 7}}></div>
    </div>
  )
}

export const Poll: React.FC<PollProps> = ({ poll }) => {
  const total = poll.votesCount
  return <div>
    {poll.options.map((option, i) => <PollValue key={i} title={option.title} percentage={option.votesCount / total} />)}
  </div>
}

export default Poll