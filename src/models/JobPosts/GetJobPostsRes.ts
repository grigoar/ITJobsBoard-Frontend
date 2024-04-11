import { ApiGetAllGenericResponse } from '../Common/ApiGetAllGenericResponse';
import { JobPostOverviewEntity } from './JobPostOverviewEntity';

export type GetJobPostsRes = ApiGetAllGenericResponse<JobPostOverviewEntity>;
