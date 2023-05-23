import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class JobsService {

  async getJobs(query) {
    const jobs = await dbContext.Jobs.find(query)
    return jobs
  }

  async getJobById(jobId) {
    const job = await dbContext.Jobs.findById(jobId)
    if (!job) {
      throw new BadRequest("Invalid Job Id")
    }
    return job
  }

  async createJob(jobData) {
    const job = await dbContext.Jobs.create(jobData)
    return job
  }

  async editJob(jobData, jobId, userId) {
    const originalJob = await this.getJobById(jobId)

    if (originalJob.creatorId != userId) {
      throw new Forbidden("Unauthorized to edit job")
    }
      
    originalJob.company = jobData.company || originalJob.company
    originalJob.jobTitle = jobData.jobTitle || originalJob.jobTitle
    originalJob.hours = jobData.hours || originalJob.hours
    originalJob.rate = jobData.rate || originalJob.rate
    originalJob.description = jobData.description || originalJob.description

    originalJob.save()
    return originalJob
  }

  async deleteJob(jobId, userId) {
    const job = await this.getJobById(jobId)
    if (job.creatorId != userId) {
      throw new Forbidden("Unauthorized to edit that job")
    }

    await job.remove()
    return
  }












}

export const jobsService = new JobsService();