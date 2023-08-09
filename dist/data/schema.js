"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceSchema = exports.aboutSchema = exports.resumeSchema = exports.projectSchema = void 0;
var mongoose_1 = require("mongoose");
// Schema for project
var projectSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String },
    createdate: { type: Date },
    updatedate: { type: Date },
    description: { type: String },
    github: { type: String },
    image: { type: [{ type: Map }] },
    socials: { type: [{ type: Map }] },
    technology: { type: String },
    platform: { type: String },
});
exports.projectSchema = projectSchema;
projectSchema.pre('save', function (next) {
    // Map _id to id field
    this.id = this._id.toString();
    next();
});
var resumeSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    createdate: { type: Date },
    updatedate: { type: Date },
    image: [],
    languages: { type: [{ type: Map }] },
    experiences: { type: [{ type: Map }] },
    skills: { type: [{ type: Map }] },
});
exports.resumeSchema = resumeSchema;
resumeSchema.pre('save', function (next) {
    // Map _id to id field
    this.id = this._id.toString();
    next();
});
var aboutSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    introduction: { type: String },
    createdate: { type: Date },
    updatedate: { type: Date },
    email: { type: String },
    phone: { type: Number },
    network: { type: [{ type: Map }] },
    image: [],
    name: { type: String }
});
exports.aboutSchema = aboutSchema;
aboutSchema.pre('save', function (next) {
    // Map _id to id field
    this.id = this._id.toString();
    next();
});
var serviceSchema = new mongoose_1.Schema({
    id: { type: String, required: false, unique: true },
    title: { type: String },
    createdate: { type: Date },
    updatedate: { type: Date },
    description: { type: String },
    icon_id: { type: String },
    image: { type: [{ type: Map }] }
});
exports.serviceSchema = serviceSchema;
serviceSchema.pre('save', function (next) {
    // Map _id to id field
    this.id = this._id.toString();
    next();
});
//# sourceMappingURL=schema.js.map