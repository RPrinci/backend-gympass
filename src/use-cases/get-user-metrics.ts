import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface GetUserMetricsRequest {
  userId: string
}

interface GetUserMetricsResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute({ 
    userId
  }: GetUserMetricsRequest) : Promise<GetUserMetricsResponse> {

    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount
    }
  }
}