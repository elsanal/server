import { Schema } from "mongoose";
import { Project, About, Service, Resume } from "./interfaces";

// Schema for project
const projectSchema = new Schema<Project>({
    id: {type: String, required: true, unique: true},
    title: {type: String},
    createdate: {type: Date},
    updatedate: {type: Date},
    description : {type: String},
    github: {type: String},
    image: {type: [{type: Map}]},
    socials: {type: [{type:Map}]},
    technology: {type: String},
    platform: {type: String},

})
projectSchema.pre('save', function (next) {
    // Map _id to id field
    this.id = this._id.toString();
    next();
  });

  const resumeSchema = new Schema<Resume>({
    id: {type: String, required: true, unique: true},
    createdate: {type: Date},
    updatedate: {type: Date},
    image: [],
    languages: {type: [{type:Map}]},
    experiences: {type: [{type:Map}]},
    skills: {type: [{type:Map}]},
})
resumeSchema.pre('save', function (next) {
    // Map _id to id field
    this.id = this._id.toString();
    next();
  });

  const aboutSchema = new Schema<About>({
    id: {type: String, required: true, unique: true},
    introduction: {type: String},
    createdate: {type: Date},
    updatedate: {type: Date},
    email: {type: String},
    phone: {type: Number},
    network: {type: [{type:Map}]},
    image: [],
    name:{type: String}

})
aboutSchema.pre('save', function (next) {
    // Map _id to id field
    this.id = this._id.toString();
    next();
  });  

  const serviceSchema = new Schema<Service>({
    id: {type: String, required: false, unique: true},
    title: {type: String},
    createdate: {type: Date},
    updatedate: {type: Date},
    description : {type: String},
    icon_id: {type: String},
    image: {type: [{type: Map}]}
})
serviceSchema.pre('save', function (next) {
    // Map _id to id field
    this.id = this._id.toString();
    next();
  });


export {projectSchema, resumeSchema, aboutSchema, serviceSchema}