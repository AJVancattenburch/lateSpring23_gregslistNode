import { Auth0Provider } from '@bcwdev/auth0provider'
import { jobsService } from '../services/JobsService.js'
import BaseController from '../utils/BaseController.js'

export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getJobs)
      .get('/:jobId', this.getJobById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createJob)
      .put('/:jobId', this.editJob)
      .delete('/:jobId', this.deleteJob)
  }

  async getJobs(req, res, next) {
    try {
      const jobs = await jobsService.getJobs(req.query)
      res.send(jobs)
    } catch (error) {
      next(error)
    }
  }

  async getJobById(req, res, next) {
    try {
      const jobId = req.params.jobId
      const job = await jobsService.getJobById(jobId)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async createJob(req, res, next) {
    try {
      const jobData = req.body
      jobData.creatorId = req.userInfo.id
      const newJob = await jobsService.createJob(jobData)
      res.send(newJob)
    } catch (error) {
      next(error)
    }
  }

  async editJob(req, res, next) {
    try {
      const jobData = req.body
      const jobId = req.params.jobId
      const userId = req.userInfo.id
      const editedJob = await jobsService.editJob(jobData, jobId, userId)
      res.send(editedJob)
    } catch (error) {
      next(error)
    }
  }

  async deleteJob(req, res, next) {
    try {
      const jobId = req.params.jobId
      const userId = req.userInfo.id
      await jobsService.deleteJob(jobId, userId)
      res.send({ message: 'Successfully Deleted Job' })
    } catch (error) {
      next(error)
    }
  }



}

