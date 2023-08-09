import { model } from "mongoose";
import { About, Project, Resume, Service } from "./interfaces";
import {projectSchema, resumeSchema, serviceSchema, aboutSchema} from "./schema";

// Get reference of collections, 
const projectCollection = model<Project>('Projects', projectSchema);
const resumeCollection = model<Resume>('Resume', resumeSchema);
const serviceCollection = model<Service>('Service', serviceSchema);
const aboutCollection = model<About>('About', aboutSchema);

export { projectCollection, resumeCollection, serviceCollection, aboutCollection }