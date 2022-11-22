
export interface PollOption {
  title: string
  votesCount: number
}

export interface PollResult {
  votesCount: number
  options: PollOption[]
}

export const toPoll = (poll: any): PollResult => {
  return {
    votesCount: poll.votes_count,
    options: poll.options.map((option: any) => {
      return {
        title: option.title,
        votesCount: option.votes_count
      }
    })
  }
}